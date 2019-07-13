import React from 'react'
import Layout from '../comp/MyLayout'
import Session from '../utils/session'

export default class extends React.Component {
  static async getInitialProps({ req, res }) {

    let props = {
      session: ''
    }

    if (req && req.session) {
      props.session = req.session
    } else {
      props.session = await Session.getSession()
    }

    if (!props.session || !props.session.loggedin) {
      if (req) {
        res.redirect('/Login')
      } else {
        Router.push('/Login')
      }
    }
    return props
  }

  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    return (
      <Layout  {...this.props}>
        <p>Aun nada </p>
      </Layout>
    )
  }
}