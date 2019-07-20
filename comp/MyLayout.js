import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import classnames from 'classnames'
import Styles from '../styles/styles.scss'
import Package from '../package'
import $ from 'jquery'
import {
  Container, Input, Navbar, NavbarBrand, Nav, NavItem, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
  Modal, ModalHeader, ModalBody, ModalFooter, Col, FormGroup, Label, Row, Table, NavbarToggler, Form,
  TabContent, TabPane, NavLink, Collapse, Card, CardBody, CardImg
} from 'reactstrap'


export default class extends React.Component {
  static propTypes() {
    return {
      children: React.PropTypes.object.isRequired,
      fluid: React.PropTypes.boolean
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      name: ''
    }
  }

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>{this.props.name || 'FCI - 3D'}</title>
          {/* <script src="https://aframe.io/releases/0.9.1/aframe.min.js"></script> */}
          <style dangerouslySetInnerHTML={{ __html: Styles }} />
          <link rel="stylesheet" href="https://cdn.pannellum.org/2.4/pannellum.css" />
          <script type="text/javascript" src="https://cdn.pannellum.org/2.4/pannellum.js"></script>
        </Head>
        <BarraNav1 {...this.props} />
      </React.Fragment>
    )
  }
}

export class MainBody extends React.Component {
  render() {
    return (
      <Container fluid={this.props.fluid} style={{ marginTop: '1em' }}>
        {this.props.children}
      </Container>
    )
  }
}

export class BarraNav1 extends React.Component {
  componentDidMount() {
    // Jquery here $(...)...
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  constructor(props) {
    super(props)
    this.state = {
      modal: false, selectAmb: '', selectPer: '', nestedModal: false, closeAll: false,                        // variables del Modal y de la info del docente y aula 
      activeTab: '1',                                      // Variable del navTab en la info del aula
      collapse: false, collapse1: false, collapse2: false, collapse3: false,
      isOpen: false
    }
    this.nav_toggle = this.nav_toggle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.acc_toggle = this.acc_toggle.bind(this);
    this.acc_m_toggle = this.acc_m_toggle.bind(this);
    this.tab_toggle = this.tab_toggle.bind(this);
  }

  nav_toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  acc_m_toggle() {
    this.setState(state => ({ collapse: !state.collapse, collapse1: false, collapse2: false, collapse3: false }));
  }

  acc_toggle(event) {
    if (event.target.id == 'menusub1') {
      this.setState(state => ({
        collapse1: !state.collapse1, collapse2: false, collapse3: false
      }));
    } else if (event.target.id == 'menusub2') {
      this.setState(state => ({
        collapse2: !state.collapse2, collapse1: false, collapse3: false
      }));
    } else if (event.target.id == 'menusub3') {
      this.setState(state => ({
        collapse3: !state.collapse3, collapse2: false, collapse1: false
      }));
    }
  }

  toggle(e) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      selectAmb: event.target.text
    }));
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      selectPer: event.target.text,
      closeAll: false
    });
  }

  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
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
      <div className="d-flex toggled" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading">Facultad</div>
          <div className="list-group list-group-flush ">
            <Link prefetch href="/">
              <a href="#" className="list-group-item list-group-item-action bg-light">Inicio</a>
            </Link>
            <a href="#" onClick={this.toggle}
              className="list-group-item list-group-item-action bg-light">Personal</a>
            <a href="#" id="menu" onClick={this.acc_m_toggle}
              className="list-group-item list-group-item-action bg-light">Ambiente<span style={{ pointerEvents: "none" }}
                className="icon ion-md-arrow-dropdown float-right" />
            </a>
            <Collapse isOpen={this.state.collapse}>
              <a href="#" id="menusub1" onClick={this.acc_toggle} className="list-group-item list-group-item-action">Piso 1</a>
              <Collapse isOpen={this.state.collapse1}>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 101</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 102</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 103</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 104</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 105</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 106</a>
              </Collapse>
              <a href="#" id="menusub2" onClick={this.acc_toggle} className="list-group-item list-group-item-action">Piso 2</a>
              <Collapse isOpen={this.state.collapse2}>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 101</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 102</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 103</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 104</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 105</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 106</a>
              </Collapse>
              <a href="#" id="menusub3" onClick={this.acc_toggle} className="list-group-item list-group-item-action ">Piso 3</a>
              <Collapse isOpen={this.state.collapse3}>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 101</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 102</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 103</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 104</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 105</a>
                <a href="#" onClick={this.toggle} className="list-group-item list-group-item-action">Aula 106</a>
              </Collapse>
            </Collapse>

            <Link prefetch href="/about">
              <a href="#" className="list-group-item list-group-item-action bg-light">Acerca</a>
            </Link>
          </div>
        </div>

        {/*<!-- Page Content -->*/}
        <div id="page-content-wrapper">
          <Navbar color="light" light expand="lg">
            <a id="menu-toggle" style={{ fontSize: '25px' }}><span className="icon ion-md-menu"></span></a>
            <NavbarBrand href="/"><span className='mr-2'></span> FCI</NavbarBrand>
            <NavbarToggler onClick={this.nav_toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <SignOutButton {...this.props} />
            </Collapse>
          </Navbar>
          <div className="container-fluid">
            <MainBody fluid={this.props.fluid}>
              {this.props.children}
              <Container>
                <hr className="mt-3" />
                <p className="text-muted small">
                  <Link href="#"><a className="text-muted font-weight-bold"><span className="icon ion-logo-buffer" />{' '}{Package.name} {Package.version}</a></Link>
                  {' '}<span>construido con</span>{' '}
                  <Link href="https://github.com/zeit/next.js"><a className="text-muted font-weight-bold">Next.js {Package.dependencies.next.replace('^', '')}</a></Link>
                  {' '}<span>&amp;</span>{' '}
                  <Link href="https://github.com/facebook/react"><a className="text-muted font-weight-bold">React {Package.dependencies.react.replace('^', '')}</a></Link>.
                  {' '}<span className="ml-2">&copy;{new Date().getYear() + 1900}.</span>
                </p>
              </Container>
            </MainBody>
            <HdModal state={this.state} toggle={this.toggle} tab_toggle={this.tab_toggle} toggleAll={this.toggleAll} toggleNested={this.toggleNested} />
          </div>
        </div>
      </div>
    )
  }
}

export class HdModal extends React.Component {
  render() {
    if (this.props.state.selectAmb !== 'Personal') {
      return (
        <Modal isOpen={this.props.state.modal} toggle={this.props.toggle} className='modal-lg'>
          <ModalHeader toggle={this.props.toggle}><span className='mr-2'>{this.props.state.selectAmb}</span></ModalHeader>
          <ModalBody>
            <Row>
              <Col md="5">
                <FormGroup row>
                  <Label md={3} for="IDambc">Codigo</Label>
                  <Col md={9}>
                    <Input disabled type="text" name="ambc" id="IDambc" placeholder="FCI-01-59-04-204" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} for="IDresp">Respons.</Label>
                  <Col md={9}>
                    <Input disabled type="text" name="resp" id="IDresp" placeholder="Ing. Cristhian Torres" />
                  </Col>
                </FormGroup>
              </Col>
              <Col md="4">
                <FormGroup row>
                  <Label md={3} for="IDtipo">Tipo</Label>
                  <Col md={9}>
                    <Input disabled type="text" name="tipo" id="IDtipo" placeholder="Laboratorio" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} for="IDdim">Dimen.</Label>
                  <Col md={9}>
                    <Input disabled type="text" name="dim" id="IDdim" placeholder="8.10 x 3.00 m" />
                  </Col>
                </FormGroup>
              </Col>
              <Col md="3">
                <FormGroup row>
                  <Label md={3} for="IDpiso">Piso</Label>
                  <Col md={9}>
                    <Input disabled type="text" name="piso" id="IDpiso" placeholder="2" />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label md={3} for="IDtipo">Capac.</Label>
                  <Col md={9}>
                    <Input disabled type="text" name="tipo" id="IDtipo" placeholder="30" />
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            <div id='tabs'>
              <Row>
                <Col md="12">
                  <Nav fill tabs>
                    <NavItem>
                      <NavLink className={classnames({ active: this.props.state.activeTab === '1' })} onClick={() => { this.props.tab_toggle('1'); }}>Implementos</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({ active: this.props.state.activeTab === '2' })} onClick={() => { this.props.tab_toggle('2'); }}>Horario</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink className={classnames({ active: this.props.state.activeTab === '3' })} onClick={() => { this.props.tab_toggle('3'); }}>Imagen 360°</NavLink>
                    </NavItem>
                  </Nav>
                </Col>
              </Row>
            </div>
            <TabContent activeTab={this.props.state.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col md="12">
                    <Modal_Amb_Implem />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col md="12">
                    <Modal_Amb_Horario />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Modal_Amb_Img Amb={this.props.state.selectAmb} />
              </TabPane>
            </TabContent>
          </ModalBody>
          <Modal_Footer {...this.props} />
        </Modal >
      )
    } else if (this.props.state.selectAmb == 'Personal') {
      return (
        <Modal isOpen={this.props.state.modal} toggle={this.props.toggle} className='modal-lg'>
          <ModalHeader toggle={this.props.toggle}><span className='mr-2'>Buscar {this.props.state.selectAmb}</span></ModalHeader>
          <ModalBody>
            <Row>
              <Col md="12">
                <Modal_Pers_Table {...this.props} toggle={this.props.toggle} toggleNested={this.props.toggleNested} state={this.props.state} toggleAll={this.props.toggleAll} />
              </Col>
            </Row>
          </ModalBody>
          <Modal_Footer {...this.props} />
        </Modal>
      )
    }
  }
}

export class Modal_Amb_Implem extends React.Component {
  render() {
    return (
      <Table hover className='fixed_header'>
        <thead>
          <tr>
            <th style={{ width: '110px' }}>#</th>
            <th style={{ width: '220px' }}>Detalles</th>
            <th style={{ width: '220px' }}>Marca</th>
            <th style={{ width: '220px' }}>Cantidad.</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <td>Proyector</td>
            <td>Samsung</td>
            <td>1</td>
          </tr>
          <tr>
            <th>2</th>
            <td>Computador de Escritorio</td>
            <td>Dell</td>
            <td>15</td>
          </tr>
          <tr>
            <th>3</th>
            <td>Pizarra electronica</td>
            <td>Bansion</td>
            <td>1</td>
          </tr>
          <tr>
            <th>4</th>
            <td>Pizarra electronica</td>
            <td>Bansion</td>
            <td>1</td>
          </tr>
          <tr>
            <th>5</th>
            <td>Aire Acondicionado</td>
            <td>Toshiba</td>
            <td>1</td>
          </tr>
          <tr>
            <th>5</th>
            <td>Aire Acondicionado</td>
            <td>Toshiba</td>
            <td>1</td>
          </tr>
          <tr>
            <th>5</th>
            <td>Aire Acondicionado</td>
            <td>Toshiba</td>
            <td>1</td>
          </tr>
          <tr>
            <th>5</th>
            <td>Aire Acondicionado</td>
            <td>Toshiba</td>
            <td>1</td>
          </tr>
          <tr>
            <th>5</th>
            <td>Aire Acondicionado</td>
            <td>Toshiba</td>
            <td>1</td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export class Modal_Amb_Img extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");
    pannellum.viewer('panorama', {
      "type": "equirectangular",
      "panorama": "/static/FCI-1.2.jpg",
      "title": this.props.Amb,
      "author": "FCI ® 2019",
      "autoRotate": -2,
      // "autoLoad": true,
      "pitch": 2.3,
      "yaw": -135.4,
      "hfov": 120,
      "hotSpots": [{
        "pitch": 2.5,
        "yaw": -154,
        "type": "info",
        "text": "Aula 104",
        "URL": "/Login"
      }],
    });
    document.body.appendChild(script);
  }
  render() {
    return (
      <div id="panorama" ></div>
    )
  }
}

export class Modal_Amb_Horario extends React.Component {
  render() {
    return (
      <Table responsive striped size="sm" className='text-center Tab_f'>
        <thead>
          <tr>
            <th style={{ width: '50px' }}>Hora</th>
            <th style={{ width: '140px' }}>Lunes</th>
            <th style={{ width: '140px' }}>Martes</th>
            <th style={{ width: '140px' }}>Miercoles</th>
            <th style={{ width: '140px' }}>Jueves</th>
            <th style={{ width: '155px' }}>Viernes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">07h00<br />08h00</th>
            <td>Ofimatica y Recursos Tic<br />Joseph Rodriguez</td>
            <td></td>
            <td>Ofimatica y Recursos Tic<br />Joseph Rodriguez</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">08h00<br />09h00</th>
            <td>Ofimatica y Recursos Tic<br />Joseph Rodriguez</td>
            <td></td>
            <td>Ofimatica y Recursos Tic<br />Joseph Rodriguez</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">09h00<br />10h00</th>
            <td></td>
            <td>Abstraccion de Datos<br />Jaime Meza</td>
            <td>Aplic. de SO<br />David Zambrano</td>
            <td>Aplic. de SO<br />David Zambrano</td>
            <td></td>
          </tr>
          <tr>
            <th scope="row">10h00<br />11h00</th>
            <td>Sistemas Distribuidos<br />Hernán Vargas</td>
            <td>Abstraccion de Datos<br />Jaime Meza</td>
            <td>Aplic. de SO<br />David Zambrano</td>
            <td>Aplic. de SO<br />David Zambrano</td>
            <td>Inteligencia Artificial I<br />Hernán Vargas</td>
          </tr>
          <tr>
            <th scope="row">11h00<br />12h00</th>
            <td>Sistemas Distribuidos<br />Hernán Vargas</td>
            <td>Interacción Computador<br />Carlos Pinargote</td>
            <td>Sistemas para Auditores<br />Emilio Cedeño</td>
            <td>Sistemas Operativos<br />Leticia Vaca</td>
            <td>Inteligencia Artificial I<br />Hernán Vargas</td>
          </tr>
          <tr>
            <th scope="row">12h00<br />13h00</th>
            <td>Sistemas Distribuidos<br />Hernán Vargas</td>
            <td>Interacción Computador<br />Carlos Pinargote</td>
            <td>Sistemas para Auditores<br />Emilio Cedeño</td>
            <td>Sistemas Operativos<br />Leticia Vaca</td>
            <td>Inteligencia Artificial I<br />Hernán Vargas</td>
          </tr>
          <tr>
            <th scope="row">13h00<br />14h00</th>
            <td><br /></td>
            <td><br /></td>
            <td><br /></td>
            <td><br /></td>
            <td><br /></td>
          </tr>
          <tr>
            <th scope="row">14h00<br />15h00</th>
            <td><br /></td>
            <td><br /></td>
            <td><br /></td>
            <td><br /></td>
            <td><br /></td>
          </tr>
          <tr>
            <th scope="row">15h00<br />16h00</th>
            <td>Aplic. Informaticas<br />Francisco Gavilanes</td>
            <td>Inteligencia Artificial I<br />Hernán Vargas</td>
            <td>Interacción Computador<br />Carlos Pinargote</td>
            <td>Arq. del Computador<br />Rodolfo Garcia</td>
            <td><br /></td>
          </tr>
          <tr>
            <th scope="row">16h00<br />17h00</th>
            <td>Aplic. Informaticas<br />Francisco Gavilanes</td>
            <td>Inteligencia Artificial I<br />Hernán Vargas</td>
            <td>Interacción Computador<br />Carlos Pinargote</td>
            <td>Arq. del Computador<br />Rodolfo Garcia</td>
            <td><br /></td>
          </tr>
          <tr>
            <th scope="row">17h00<br />18h00</th>
            <td>Recursos Tecnologias<br />Wilmer Cuenca</td>
            <td>Inteligencia Artificial I<br />Hernán Vargas</td>
            <td>Recursos Tecnologias<br />Wilmer Cuenca</td>
            <td><br /></td>
            <td><br /></td>
          </tr>
          <tr>
            <th scope="row">17h00<br />18h00</th>
            <td>Recursos Tecnologias<br />Wilmer Cuenca</td>
            <td><br /></td>
            <td>Recursos Tecnologias<br />Wilmer Cuenca</td>
            <td><br /></td>
            <td><br /></td>
          </tr>
        </tbody>
      </Table>
    )
  }
}

export class Modal_Pers_Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data_row: [],
    }
    this.selec_per = this.selec_per.bind(this);
  }

  selec_per(e) {
    console.log(event)
  }


  componentDidMount() {
    // Jquery here $(...)...
    $(document).ready(function () {
      $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
      $("#r1, #r2, #r3, #r4").click(function () {
        var row = $(this).closest("tr");    // Find the row
        console.log(row[0].innerText);
      });
    });

  }
  render() {
    return (
      <div>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          {/* <Input id="myInput" type="text" placeholder="Search.." />{''} */}
          <Input id="myInput" type="search" name="search" placeholder="search placeholder" />
        </FormGroup>
        <br />
        <Table hover className='Tab_Doc' >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Cargo</th>
            </tr>
          </thead>
          <tbody id="myTable">
            <tr onClick={this.selec_per} id='r1' >
              <td><a onClick={this.props.toggleNested}>John</a></td>
              <td>Doe</td>
              <td>john@example.com</td>
              <td>Docente</td>
            </tr>
            <tr id='r2'>
              <td>Mary</td>
              <td>Moe</td>
              <td>mary@mail.com</td>
              <td>Secretaria</td>
            </tr>
            <tr id='r3'>
              <td>July</td>
              <td>Dooley</td>
              <td>july@greatstuff.com</td>
              <td>Asist. Limpieza</td>
            </tr>
            <tr id='r4'>
              <td>Anja</td>
              <td>Ravendale</td>
              <td>a_r@test.com</td>
              <td>Decano/Docente</td>
            </tr>
          </tbody>
        </Table>
        <Modal_Pers_Info {...this.props} state={this.props.state} toggle={this.props.toggle} toggleNested={this.props.toggleNested} toggleAll={this.props.toggleAll} />
      </div>
    )
  }
}

export class Modal_Pers_Info extends React.Component {
  render() {
    return (
      <Modal isOpen={this.props.state.nestedModal} toggle={this.props.nestedModal} className='modal-md'>
        <ModalHeader toggle={this.props.nestedModal} > <span className='mr-2'>{this.props.state.selectPer}</span></ModalHeader>
        <ModalBody>
          <Row>
            <Col  md={6}>
              <Card>
                <CardImg width="100%" src="/static/user-img.jpg" />
              </Card>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label style={{display: 'initial'}} className="font-weight-bold" for="nom_pers">Nombres:</Label>
                <Input plaintext defaultValue='Pedro Macias' />

                <Label style={{display: 'initial'}} className="font-weight-bold" for="car_pers">Cargo:</Label>
                <Input plaintext defaultValue='Docente' />
              
                <Label style={{display: 'initial'}} className="font-weight-bold" for="ema_pers">Correo:</Label>
                <Input plaintext defaultValue='pedro@hotmail.com' />

                <Label style={{display: 'initial'}} className="font-weight-bold" for="ema_pers">Horario de Atencion:</Label>
                <Input plaintext defaultValue='Lunes: 9:00 a 10:00' />
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button size="sm" color="primary" onClick={this.props.toggleNested}>Regresar</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

export class Modal_Footer extends React.Component {
  render() {
    return (
      <ModalFooter>
        <p className="text-muted small">
          <span>Datos recolectados de: </span>
          <a target="_blank" href="http://fci.utm.edu.ec" className="text-muted font-weight-bold"><span className="icon ion-md-desktop mr-1" />Facultad de Ciencias Informaticas</a>
          <span> | </span>
          <a target="_blank" href="https://utm.edu.ec" className="text-muted font-weight-bold">UTM</a>
          .<span className="ml-2">&copy;{new Date().getYear() + 1900}.</span>
        </p>
      </ModalFooter>
    )
  }
}

export class SignOutButton extends React.Component {
  render() {
    if (this.props.session && this.props.session.loggedin) {
      return (
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              <span className="icon ion-md-person mr-2"></span>{this.props.session.name}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem prefetch='true' href="/aula">
                Opcion 1
              </DropdownItem>
              <DropdownItem prefetch='true' href="/docente">
                Opcion 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem prefetch='true' href="/auth/signout">
                <span className="icon ion-md-log-out mr-1 "></span>Salir
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      )
    } else {
      return (
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/Login"><span className="icon ion-md-log-in mr-1"></span>Login</NavLink>
          </NavItem>
        </Nav>
      )
    }
  }
}

