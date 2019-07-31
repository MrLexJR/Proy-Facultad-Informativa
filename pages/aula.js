import React from 'react'
import Router from 'next/router'
import Layout from '../comp/MyLayout'
import Session from '../utils/session'
import AulaImp from '../pages/aula_imp'
import AulaHor from '../pages/aula_hor'
import classnames from 'classnames'
import { InputGroup, InputGroupText, InputGroupAddon, Row, Col, Table, Form, FormGroup, Label, Input, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    let props = {
      session: ''
    }

    if (req && req.session) { props.session = req.session }
    else { props.session = await Session.getSession() }

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
      message: null,
      activeTab: '1',                                      // Variable del navTab en la info del aula
      row_aula: [], row_aula_tipo: [], row_respons:[],
      ambiente: 0, IDdesc: '', IDambc: '', IDresp: 0, IDtipo: 0, IDl: '', IDa: '', IDpiso: '', IDcap: ''
    }
    this.handleAmb = this.handleAmb.bind(this)
    this.handleProcessData = this.handleProcessData.bind(this)
  }

  tab_toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  handleProcessData(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  handleAmb(e) {
    var index = e.nativeEvent.target.selectedIndex;
    let data = {
      aula: e.target.value
    }
    fetch('/auth/getAulaDetalles', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        if (!response) return
        this.setState({
          row_aula: response.results,
          IDresp: '', IDtipo: '', IDl: '', IDa: '', IDcap: ''
        })
      })
    this.setState({
      ambiente: e.target.value, IDambc: e.target.value,
      IDdesc: e.nativeEvent.target[index].text,
      IDpiso: e.nativeEvent.target[index].dataset.piso
    });
  }

  getAula() {
    fetch('/auth/getAula', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(response => {
        if (!response) return
        this.setState({
          row_aula: response.results
        })
      })
  }

  getTipoAula() {
    fetch('/auth/getTipoAula', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(response => {
        if (!response) return
        this.setState({
          row_aula_tipo: response.results
        })
      })
  }
  getResponsable() {
    fetch('/auth/getResponsable', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(response => {
        if (!response) return
        this.setState({
          row_respons: response.results
        })
      })
  }

//Opciones del Tipo del Aula  
  renderOptTipoA() {
    return this.state.row_aula_tipo.map((row) => {
      const { id_tipo_aula, nombre } = row
      return (
        <option key={id_tipo_aula} value={id_tipo_aula} >{nombre}</option>
      )
    })
  }
//Opciones del Aula 
  renderOptAula() {
    return this.state.row_aula.map((row) => {
      const { id_aula, nombre, piso } = row
      return (
        <option data-piso={piso} key={id_aula} value={id_aula} >{nombre}</option>
      )
    })
  }
  //Opciones del Responsable 
  renderOptResp(){
    return this.state.row_respons.map((row) => {
      const { id_personal, nombres, apellidos } = row
      return (
        <option key={id_personal} value={id_personal} >{nombres+' '+apellidos}</option>
      )
    })
  }

  componentDidMount() {
    this.getAula();
    this.getResponsable();
    this.getTipoAula();
  }

  render() {
    const type_cap = (this.state.IDtipo === 0) ? <span></span> : (this.state.IDtipo === '1') ? <span className="icon ion-ios-desktop"></span> : <span className="icon ion-ios-people"></span>
    return (
      <Layout  {...this.props}>
        <Row >
          <Col>
            <h5 className="text-center display-4">Aula</h5> <br />
            <Form>
              <Row>
                <Col md="12"><FormGroup row>
                  <Label sm={1} for="ambiente">Ambiente:</Label>
                  <Col sm={4}>
                    <Input type="select" name="ambiente" id="ambiente" value={this.state.ambiente} onChange={this.handleAmb} >
                      <option value={0} disabled>Escojer...</option>
                      {this.renderOptAula()}
                    </Input>
                  </Col>
                  <Label md={1} for="IDdesc">Descripción:</Label>
                  <Col md={4}>
                    <Input type="text" name="IDdesc" id="IDdesc" value={this.state.IDdesc} onChange={this.handleProcessData} />
                  </Col>
                  <Col className='text-center' md={2}>
                    <Button className='btn-block' color="primary" type="submit" >Guardar <span className="icon ion-md-checkmark-circle-outline" /></Button>
                  </Col>
                </FormGroup></Col>
                <Col md="5">
                  <FormGroup row>
                    <Label md={3} for="IDambc">Codigo</Label>
                    <Col md={9}>
                      <Input type="text" disabled name="IDambc" id="IDambc" value={this.state.IDambc} onChange={this.handleProcessData} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md={3} for="IDresp">Respons.</Label>
                    <Col md={9}>
                      <Input type="select" name="IDresp" id="IDresp" value={this.state.IDresp} onChange={this.handleProcessData} >
                        <option value={0} disabled>Escojer...</option>
                        {this.renderOptResp()}
                      </Input>
                    </Col>
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup row>
                    <Label md={3} for="IDtipo">Tipo</Label>
                    <Col md={9}>
                      <Input type="select" name="IDtipo" id="IDtipo" value={this.state.IDtipo} onChange={this.handleProcessData} >
                        <option value={0} disabled>Escojer...</option>
                        {this.renderOptTipoA()}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md={1} for="IDl">L.</Label>
                    <Col md={4}>
                      <Input type="number" name="IDl" id="IDl" step={0.01} value={this.state.IDl} onChange={this.handleProcessData} />
                    </Col>
                    <Label md={1} for="IDa">A.</Label>
                    <Col md={4}>
                      <Input type="number" name="IDa" id="IDa" step={0.01} value={this.state.IDa} onChange={this.handleProcessData} />
                    </Col>
                    <Label md={2}>mts</Label>
                  </FormGroup>
                </Col>
                <Col md="3">
                  <FormGroup row>
                    <Label md={3} for="IDpiso">Piso</Label>
                    <Col md={9}>
                      <Input disabled type="text" name="IDpiso" id="IDpiso" value={this.state.IDpiso} onChange={this.handleProcessData} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label md={3} for="IDcap">Capac.</Label>
                    <Col md={9}>
                      <InputGroup>
                        <Input type="number" step="any" name="IDcap" id="IDcap" value={this.state.IDcap} onChange={this.handleProcessData} />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>{type_cap}</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
            <div id='tabs'>
              <Row>
                <Col md="12">
                  <Nav tabs fill>
                    <NavItem>
                      <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.tab_toggle('1'); }}>Implementos</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.tab_toggle('2'); }}>Horario</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.tab_toggle('3'); }}>Imagen 360°</NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
            </div>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col md="12">
                    <AulaImp />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col md="12">
                    <AulaHor />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <p>Hola 3</p>
              </TabPane>

            </TabContent>
          </Col>
        </Row>
      </Layout>
    )
  }
}