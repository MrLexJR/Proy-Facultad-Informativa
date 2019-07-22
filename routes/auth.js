const pool = require('../dbconfig/config')
const bcrypt = require('bcrypt');

module.exports = (server) => {

  if (server === null) {
    throw new Error('server should be an express instance')
  }

  server.post('/auth/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (email && password) {
      const results = await getUser(email)
      if (results) {
        bcrypt.compare(password, results.password).then(function (response) {
          if (response == true) {
            req.session.loggedin = true
            req.session.email = email
            req.session.name = results.names
            return res.json(req.session)
          } else {
            return res.json({ message: 'Incorrect Password!' })
          }
        })
      } else {
        return res.json({ message: 'User not found' })
      }
    } else {
      return res.json({ message: 'Please enter email and Password!' })
    }
  })

  async function getUser(email) {
    try {
      const q = await pool.query('SELECT * FROM "users" WHERE "email"=$1', [email])
      return q.rows[0]
    } catch (e) {
      console.error(e)
    }
  }

  async function getPersonal() {
    try {
      const q = await pool.query('SELECT * FROM "view_pers_fun"')
      return q.rows
    } catch (e) {
      console.error(e)
    }
  }

  async function addUser(body) {
    const text = 'INSERT INTO personal(id_funcion,nombres,apellidos,correo,horario_atencion,id_personal) VALUES ($1, $2, $3, $4, $5, $6)'
    const values = [body.cargo, body.nombres, body.apellidos, body.correo, body.horario, body.cedula]
    try {
      const results = await pool.query(text, values)
      return true
    } catch (e) {
      return results = e.detail
    }
  }

  async function getFuncionPers() {
    try {
      const q = await pool.query('SELECT * FROM funcion_pers')
      return q.rows
    } catch (e) {
      console.error(e)
    }
  }

  server.post('/auth/savePers', async (req, res) => {
    if (req.session && req.session.loggedin) {
      const results = await addUser(req.body)
      if (results == true) {
        return res.json({ message: 'Personal Almacenado Correctamente!', messageStyle: 'alert-success', staus: 200 })
      } 
      else {
        return res.json({ message: '<strong>Error:</strong>', results, messageStyle: 'alert-danger',staus: 500 })
      }
    } else {
      return res.status(403)
    }
  })

  server.get('/auth/funcion_pers', async (req, res) => {
    const results = await getFuncionPers()
    if (results) {
      return res.json({ results })
    } else {
      return res.status(500)
    }
  })

  server.get('/auth/personal', async (req, res) => {
    const results = await getPersonal()
    if (results) {
      return res.json({ results })
    } else {
      return res.status(500)
    }
  })

  server.get('/auth/signout', (req, res) => {
    if (req.session && req.session.loggedin) {
      req.session.destroy()
      res.redirect(`/`)
    } else {
      res.redirect(`/`)
    }
  })

  server.get('/auth/session', (req, res) => {
    if (req.session) {
      return res.json(req.session)
    } else {
      return res.status(403)
    }
  })

  server.post('/auth/update', async (req, res) => {
    if (req.session && req.session.loggedin) {
      const results = await updateUser(req.body, req.session.email)
      if (results && results.length > 0) {
        return res.json({ ok: true })
      } else {
        return res.status(500)
      }
    } else {
      return res.status(403)
    }
  })

  async function updateUser(body, email) {
    try {
      const results = await pool.query(`UPDATE users SET name='${body.name}', lastname='${body.lastname}' WHERE email='${email}';`)
      return results
    } catch (e) {
      console.error(e)
    }
  }
}