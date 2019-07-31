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
        bcrypt.compare(password, results.contrasena).then(function (response) {
          if (response == true) {
            req.session.loggedin = true
            req.session.email = email
            req.session.name = results.nombres
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

  server.post('/auth/savePers', async (req, res) => {
    if (req.session && req.session.loggedin) {
      const results = await addUser(req.body)
      if (results == true) {
        return res.json({ message: null, messageStyle: null, staus: 200 })
      }
      else {
        return res.json({ message: 'Error: ' + results, messageStyle: 'alert-danger', staus: 500 })
      }
    } 
  })

  server.post('/auth/updatePers', async (req, res) => {
    if (req.session && req.session.loggedin) {
      const results = await updatePers(req.body, req.body.cedula)
      if (results == true) {
        return res.json({ message: null, messageStyle: null, staus: 200 })
      }
      else {
        return res.json({ message: 'Error: ' + results, messageStyle: 'alert-danger', staus: 500 })
      }
    } 
  })


  server.get('/auth/getFuncionPers', async (req, res) => {
    const results = await getFuncionPers()
    if (results) {
      return res.json({ results })
    } else {
      return res.status(500)
    }
  })

  server.get('/auth/getPersonal', async (req, res) => {
    const results = await getPersonal()
    if (results) {
      return res.json({ results })
    } else {
      return res.status(500)
    }
  })

  server.get('/auth/getAula', async (req, res) => {
    const results = await getAula()
    if (results) {
      return res.json({ results })
    } else {
      return res.status(500)
    }
  })

  server.get('/auth/getTipoAula', async (req, res) => {
    const results = await getTipoAula()
    if (results) {
      return res.json({ results })
    } else {
      return res.status(500)
    }
  })
  
  server.get('/auth/getResponsable', async (req, res) => {
    const results = await getResponsable()
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
    }
  })

  server.post('/auth/deletePers', async (req, res) => {
    if (req.session && req.session.loggedin) {
      const results = await deletePers(parseInt(req.body.cedula))
      if(results){
        return res.json({ staus: 200 })
      }else {
        return res.json({ message: '<b>Error:</b>\n ', staus: 500 })
      }
    }
  })

  async function deletePers(cedula){
    try {
      await pool.query('UPDATE personal SET estado = false WHERE id_personal = $1', [cedula])
      return true
    } catch (e) {
      console.log(e)
    }    
  }

  async function getUser(email) {
    try {
      const q = await pool.query('SELECT * FROM view_pers_admin WHERE correo=$1', [email])
      return q.rows[0]
    } catch (e) {
      console.error(e)
    }
  }

  async function getPersonal() {
    try {
      const q = await pool.query('SELECT * FROM "view_pers_fun_aula"')
      return q.rows
    } catch (e) {
      console.error(e)
    }
  }

  async function addUser(body) {
    const text = 'INSERT INTO personal(id_funcion,nombres,apellidos,correo,id_personal) VALUES ($1, $2, $3, $4, $5)'
    const values = [body.cargo, body.nombres, body.apellidos, body.correo, body.cedula] 
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

  async function getAula() {
    try {
      const q = await pool.query('SELECT * FROM aula')
      return q.rows
    } catch (e) {
      console.error(e)
    }
  }

  async function getTipoAula() {
    try {
      const q = await pool.query('SELECT * FROM tipo_aula')
      return q.rows
    } catch (e) {
      console.error(e)
    }
  }
  
  async function getResponsable() {
    try {
      const q = await pool.query('SELECT * FROM view_pers_resp')
      return q.rows
    } catch (e) {
      console.error(e)
    }
  }

  async function updatePers(body, cedula) {
    const text = 'UPDATE personal SET id_funcion = $1, nombres= $2, apellidos=$3, correo=$4 WHERE id_personal= $5'
    const values = [body.cargo, body.nombres, body.apellidos, body.correo, cedula] 
    try {
      const results = await pool.query(text, values)
      return true
    } catch (e) {
      console.error(e)
      return results = e.detail
    }
  }
}