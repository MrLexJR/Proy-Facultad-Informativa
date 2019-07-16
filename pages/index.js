import React from 'react'
import Session from '../utils/session'
import Layout, {HdModal} from '../comp/MyLayout'
import { Row, Col } from 'reactstrap'
import  RenderScene from "./aframe"

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
    return props
  }

  constructor(props) {
    super(props)
    this.state = {
      modal: false, selectAmb: '',                         // variables del Modal y de la info del docente y aula 
      activeTab: '1', isOpen: false                                      // Variable del navTab en la info del aula
    }
    this.toggle = this.toggle.bind(this);
    this.tab_toggle = this.tab_toggle.bind(this);
  }
 
  toggle(e) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      selectAmb: event.target.text
    }));
  }

  tab_toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    return (
      <Layout {...this.props}>
        <HdModal state={this.state} toggle={this.toggle} tab_toggle={this.tab_toggle} />
        <Row><Col>
            <div id='container-360'>
              <RenderScene/>
            </div>
        </Col></Row>
      </Layout >
    );
  }
}