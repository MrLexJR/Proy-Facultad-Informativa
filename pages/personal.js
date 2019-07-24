import React from 'react'
import Layout from '../comp/MyLayout'
import Router from 'next/router'
import Session from '../utils/session'
import { Row, Col, Card, Input, Label, CardImg, Container, FormGroup } from 'reactstrap'
import { Table, Button, Form } from 'reactstrap'
import $ from 'jquery'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
      data_pers_row: [], rows_pers: [], row_fun_per: [],
      ced_pers: '', nom_pers: '', ape_pers: '', car_pers: 0, ema_pers: '', hor_pers: null,
      message: null, messageStyle: null
    }
    this.handleProcessData = this.handleProcessData.bind(this);
    this.handleSavePersonal = this.handleSavePersonal.bind(this);
    this.handleRowDel = this.handleRowDel.bind(this);
    this.handleRowUpd = this.handleRowUpd.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.selec_per = this.selec_per.bind(this);
  }

  Clean = () => {
    document.getElementById("pers-data").reset();
    this.setState({ data_pers_row: [], rows_pers: [], 
      ced_pers: '', nom_pers: '', ape_pers: '', car_pers: 0, ema_pers: '', hor_pers: null  });
  }


  handleSavePersonal(event) {
    event.preventDefault();
    this.setState({
      message: null, messageStyle: null
    })
    if (!this.state.ced_pers || !this.state.nom_pers || !this.state.ape_pers || !this.state.ema_pers || !this.state.car_pers) {
      this.setState({
        message: 'Se debe llenar todos lo campos obligatorios: *',
        messageStyle: 'alert-danger'
      })
      return
    }
    let data = {
      cedula: parseInt(this.state.ced_pers), nombres: this.state.nom_pers, apellidos: this.state.ape_pers,
      correo: this.state.ema_pers, horario: this.state.hor_pers, cargo: parseInt(this.state.car_pers)
    }
    fetch('auth/savePers', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          this.setState({
            message: res.message,
            messageStyle: res.messageStyle
          })
          if (res.staus == 200) {
            Swal.fire('Genial!', 'Personal agregado excitosamente!', 'success')
            this.Clean();
            this.getPersonal();
          }
        } else {
          this.setState({
            message: 'Error al intentar guardar',
            messageStyle: 'alert-danger'
          })
        }
      })
      .catch(error => {
        console.error('Error:', error)
        this.setState({
          message: 'Request Failed!',
          messageStyle: 'alert-danger'
        })
      })
  }

  handleRowDel = (idx) => () => {
    let data = {
      cedula: idx.id_personal
    }
    MySwal.fire({
      title: <p>¿Estas seguro?</p>,
      text: "¡No podrás revertir esto!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimarlo!',
    }).then((result) => {
      if (result.value) {
        fetch('auth/deletePers', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
          .then(res => {
            if (res.staus) {
              this.getPersonal();
              if (res.staus == 200) {
                Swal.fire('Listo!', 'El personal ' + idx.nombres + ' ha sido eliminado', 'success')
              } else {
                Swal.fire('Error', 'Hubon un error!: ' + res.message, 'error')
              }
            }
          })
      }
    })
  }

  handleRowUpd = (idx) => () => {
    var c =  this.state.row_fun_per.find(x => x.descripcion === idx.descripcion)
    console.log([c.id_funcion],[c])
    this.setState({ced_pers: parseInt(idx.id_personal), nom_pers: idx.nombres, ape_pers: idx.apellidos,
      car_pers: parseInt(c.id_funcion), ema_pers: idx.correo, hor_pers: idx.horario_atencion});
  }

  handleSearch(e) {
    // console.log(e.target.value)
  }

  handleProcessData(e) {
    const name = e.target.name;
    const value = e.target.value.trim();
    this.setState({ [name]: value });
  }

  selec_per = (idx) => () => {
    this.setState({ data_pers_row: idx })
  }

  getPersonal() {
    fetch('/auth/getPersonal', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(response => {
        if (!response) return
        this.setState({
          rows_pers: response.results
        })
      })
  }

  getCargo() {
    fetch('/auth/getFuncionPers', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(response => {
        if (!response) return
        this.setState({
          row_fun_per: response.results
        })
      })
  }

  renderOptCargo() {
    return this.state.row_fun_per.map((row) => {
      const { id_funcion, descripcion } = row
      return (
        <option key={id_funcion} value={id_funcion} >{descripcion}</option>
      )
    })
  }

  renderTableData() {
    return this.state.rows_pers.map((row) => {
      const { id_personal, nombres, apellidos, correo, descripcion } = row
      return (
        <tr key={id_personal} id={id_personal}>
          <td className='t_i_desc'>{nombres}{' '}{apellidos}</td>
          <td className='t_i_mar_cant' >{correo}</td>
          <td className='t_i_mar_cant' >{descripcion}</td>
          <td className='t_i_opc' ><span className="table-remove ">
            <button type="submit" onClick={this.handleRowUpd(row)} className="btn btn-primary btn-rounded btn-sm my-0"><span className="icon ion-md-create" /></button> {' '}
            <button type="button" onClick={this.handleRowDel(row)} className="btn btn-danger btn-rounded btn-sm my-0"><span className="icon ion-md-trash" /></button>
          </span></td>
        </tr>
      )
    })
  }

  componentDidMount() {
    this.getPersonal();
    this.getCargo();
    document.getElementById('car_pers').onchange = function () {
      if (this.value == 2) {
        document.getElementById("hor_pers").disabled = false;
      } else {
        document.getElementById("hor_pers").disabled = true;
        document.getElementById("hor_pers").value = null;
      }
    }

    $(document).ready(function () {
      $("#myInput").on("keyup click", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }

  render() {
    const alert = (this.state.message === null) ? <div /> : <div id="success-alert" className={`text-center alert ${this.state.messageStyle}`} role="alert"> {this.state.message}</div>
    return (
      <Layout  {...this.props}>
        <h5 className="text-center display-4">Personal</h5> <br />
        <Row>
          <Col xs="12" sm={{ size: 10, offset: 1 }}>
            <Container >
              <Form id="pers-data" onSubmit={this.handleSavePersonal} >
                <Row>
                  <Col md={3}>
                    <Card className='my-1'>
                      <CardImg src="/static/user-img.jpg" />
                    </Card>
                    <FormGroup>
                      <Input type="file" name="file" id="File" />
                    </FormGroup>
                  </Col>
                  <Col md={9} > <Row>
                    <Col md={6} >
                      <FormGroup row>
                        <Label md={3} for="ced_pers">Cedula:</Label>
                        <Col md={9}>
                          <Input maxLength="10" pattern="[0-9]*" type="text" name="ced_pers" id="ced_pers" value={this.state.ced_pers} onChange={this.handleProcessData} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label md={3} for="nom_pers">Nombres:</Label>
                        <Col md={9}>
                          <Input type="text" name="nom_pers" id="nom_pers" value={this.state.nom_pers} onChange={this.handleProcessData} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label md={3} for="ema_pers">Correo:</Label>
                        <Col md={9}>
                          <Input type="email" name="ema_pers" id="ema_pers" value={this.state.ema_pers} onChange={this.handleProcessData} />
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup row>
                        <Col md={6} sm={{ size: 8, offset: 4 }}>
                          <Button className='btn-block' color="primary" type="submit" >Guardar <span className="icon ion-md-checkmark-circle-outline" /></Button>
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label md={3} for="ape_pers">Apellidos:</Label>
                        <Col md={9}>
                          <Input type="text" name="ape_pers" id="ape_pers" value={this.state.ape_pers} onChange={this.handleProcessData} />
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Label md={3} for="car_pers">Cargo:</Label>
                        <Col md={9}>
                          <Input type="select" name="car_pers" id="car_pers" defaultValue={this.state.car_pers} onChange={this.handleProcessData} >
                            <option value={0} disabled>Escojer...</option>
                            {this.renderOptCargo()}
                          </Input>
                        </Col>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup row>
                        <Label sm={3} for="hor_pers">Horario de Atencion:</Label>
                        <Col sm={9}>
                          <Input disabled type="textarea" name="hor_pers" id="hor_pers" onChange={this.handleProcessData} />
                        </Col>
                      </FormGroup>
                    </Col>
                  </Row></Col>
                </Row>
              </Form>
              {alert}
            </Container>
            <hr className="mt-3" />
            <div>
              <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input id="myInput" type="search" name="search" onClick={this.handleSearch} placeholder="Buscar Personal" />
              </FormGroup>
              <br />
              <Table hover >
                <thead>
                  <tr>
                    <th>Nombres</th>
                    <th>Correo</th>
                    <th>Cargo</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody id="myTable">
                  {this.renderTableData()}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Layout>
    )
  }
}