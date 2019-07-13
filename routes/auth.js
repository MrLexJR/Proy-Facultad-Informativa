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
      if (results[0][0]) {
          bcrypt.compare(password, results[0][0].password).then(function(response) {
            if (response == true) {
              req.session.loggedin = true
              req.session.email = email
              req.session.name = results[0][0].name
              return res.json(req.session)
            } else {
              return res.json({message: 'Incorrect Password!'})
            }
          })
      } else {
        return res.json({message: 'User not found'})
      }
    } else {
      return res.json({message: 'Please enter email and Password!'})
    }
  })

  async function getUser(email) {
    try {
      const results = await pool.query(`SELECT * FROM users WHERE email='${email}';`)
      return results
    }catch(e){
      console.error(e)
    }
  }
  
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

  server.get('/auth/profile', async (req, res) => {
    if (req.session && req.session.loggedin) {
      const results = await getUser(req.session.email)
      if (results[0][0]) {
        return res.json({
          name: results[0][0].name || '',
          lastname: results[0][0].lastname || ''
        })
      } else {
        return res.status(500)
      }
    } else {
      return res.status(403)
    }
  })

  server.post('/auth/update', async (req, res) => {
    if (req.session && req.session.loggedin) {
      const results = await updateUser(req.body, req.session.email)
      if (results && results.length > 0) {
        return res.json({ok: true})
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
    }catch(e){
      console.error(e)
    }
  }

}