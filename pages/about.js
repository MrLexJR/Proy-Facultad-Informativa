import React from 'react'
import Layout from '../comp/MyLayout'
import Session from '../utils/session'
import AulaImp from '../pages/aula_imp'
import AulaHor from '../pages/aula_hor'
import classnames from 'classnames'
import { Row, Col, Table, FormGroup, Label, Input, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'


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
            message: null,
            activeTab: '1',                                      // Variable del navTab en la info del aula
        }
    }

    tab_toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }


    render() {
        const alert = (this.state.message === null) ? <div /> : <div className={`alert alert-danger`} role="alert">{this.state.message}</div>
        return (
            <Layout  {...this.props}>
                <Row >
                    <Col>
                        <h3 className="text-center ">Aula[...]</h3> <br />
                        <Row>
                            <Col md="12"><FormGroup row>
                                <Label md={2} for="IDdesc">Descripción</Label>
                                <Col md={8}>
                                    <Input type="text" name="desc" id="IDdesc" defaultValue="Aula 204" />
                                </Col>
                                <Col className='text-center' md={2}>
                                    <Button id='clean' color="primary" type="submit" >Guardar{' '}<span className="icon ion-md-checkmark-circle-outline" /></Button>
                                </Col>
                            </FormGroup></Col>
                            <Col md="5">
                                <FormGroup row>
                                    <Label md={3} for="IDambc">Codigo</Label>
                                    <Col md={9}>
                                        <Input type="text" disabled name="ambc" id="IDambc" defaultValue="FCI-01-59-04-204" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md={3} for="IDresp">Respons.</Label>
                                    <Col md={9}>
                                        <Input type="text" name="resp" id="IDresp" defaultValue="Ing. Cristhian Torres" />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup row>
                                    <Label md={3} for="IDtipo">Tipo</Label>
                                    <Col md={9}>
                                        <Input type="text" name="tipo" id="IDtipo" defaultValue="Laboratorio" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md={3} for="IDdim">Dimen.</Label>
                                    <Col md={9}>
                                        <Input type="text" name="dim" id="IDdim" defaultValue="8.10 x 3.00 m" />
                                    </Col>
                                </FormGroup>
                            </Col>
                            <Col md="3">
                                <FormGroup row>
                                    <Label md={3} for="IDpiso">Piso</Label>
                                    <Col md={9}>
                                        <Input disabled type="text" name="piso" id="IDpiso" defaultValue="2" />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md={3} for="IDtipo">Capac.</Label>
                                    <Col md={9}>
                                        <Input type="text" name="tipo" id="IDtipo" defaultValue="30" />
                                    </Col>
                                </FormGroup>
                            </Col>
                        </Row>
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



