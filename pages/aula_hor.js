import React from 'react'
import Session from '../utils/session'
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
            horas: [
                { id: 1, desde: '07h00', hasta: '08h00' }, { id: 2, desde: '08h00', hasta: '09h00' },
                { id: 3, desde: '09h00', hasta: '10h00' }, { id: 4, desde: '10h00', hasta: '11h00' },
                { id: 5, desde: '11h00', hasta: '12h00' }, { id: 6, desde: '12h00', hasta: '13h00' },
                { id: 7, desde: '13h00', hasta: '14h00' }, { id: 8, desde: '14h00', hasta: '15h00' },
                { id: 9, desde: '15h00', hasta: '16h00' }, { id: 10, desde: '16h00', hasta: '17h00' },
                { id: 11, desde: '17h00', hasta: '18h00' }, { id: 12, desde: '18h00', hasta: '19h00' }
            ],
            dias: [
                { id: 1, dia: 'Lunes' }, { id: 2, dia: 'Martes' }, { id: 3, dia: 'Miercoles' },
                { id: 4, dia: 'Jueves' }, { id: 5, dia: 'Viernes' }
            ],
            mat_pro: [
                { id_h: 3, id_d: 2, mat: 'Base de Datos', prof: 'Wilmer Cuenca' },
                { id_h: 4, id_d: 2, mat: 'Base de Datos', prof: 'Wilmer Cuenca' },
                { id_h: 11, id_d: 5, mat: 'Aplicaciones de Datos', prof: 'Walter Cedeño' },
                { id_h: 12, id_d: 5, mat: 'Aplicaciones de Datos', prof: 'Walter Cedeño' }
            ],
            dias_a: '', docente: '', materia: '', hora_a: '',
            message: null
        }
        this.handleDocChange = this.handleDocChange.bind(this)
        this.handleMatChange = this.handleMatChange.bind(this)
        this.handleRowUpd = this.handleRowUpd.bind(this)
        this.handleRowAdd = this.handleRowAdd.bind(this)
        this.Clean = this.Clean.bind(this)
    }

    handleDocChange(event) { this.setState({ docente: event.target.value.trim() }) }
    handleMatChange(event) { this.setState({ materia: event.target.value.trim() }) }

    Clean = () => {
        document.getElementById("IDdia").value = ''; document.getElementById("IDmate").value = '';
        document.getElementById("IDhora").value = ''; document.getElementById("IDdoc").value = '';
        this.setState({ dias_a: '' }); this.setState({ docente: '' }); this.setState({ materia: '' });
    }

    handleRowUpd = (idx, idx1,idx2) => () => {
        const f = this.state.dias.find(x => x.id === parseInt(idx1.id))
        if(idx2.length !== 0 ){
            document.getElementById("IDdoc").value = idx2.prof;
            document.getElementById("IDmate").value = idx2.mat;
            this.setState({ docente: idx2.prof }); this.setState({ materia: idx2.mat });
        }
        document.getElementById("IDdia").value = f.dia;
        document.getElementById("IDhora").value = idx.desde + ' a ' + idx.hasta;
        this.setState({ dias_a: f.id }); this.setState({ hora_a: idx.id });
    }

    handleRowAdd(event) {
        event.preventDefault()
        this.setState({ message: null })
        if (!this.state.docente || !this.state.materia) {
            this.setState({ message: 'Debe ingresar el Docente y Materia' })
            return
        }
        // const f = this.state.horas.find(x => x.id === this.state.hora_a)

        const item = {
            id_h: this.state.hora_a,
            id_d: this.state.dias_a,
            mat: this.state.materia,
            prof: this.state.docente
        };
        this.setState({ mat_pro: [...this.state.mat_pro, item] });

        this.Clean();
    }

    renderTableData() {
        
        return this.state.horas.map((row) => {
            const { id, desde, hasta } = row

            return (
                <tr key={id} id={id}>
                    <th>{desde}{' '}{hasta} </th>
                    {this.state.dias.map((row1) => {
                        const { id, dia } = row1
                        if (this.state.mat_pro.find(x => x.id_h === row.id && x.id_d === row1.id)) {
                            const dia_m = this.state.mat_pro.find(x => x.id_h === row.id && x.id_d === row1.id)
                            return (
                                <td onClick={this.handleRowUpd(row, row1,dia_m)} key={id} id={id}>{dia_m.mat}<br />{dia_m.prof}</td>
                            )
                        } else {
                            const dia_m = []
                            return (
                                <td onClick={this.handleRowUpd(row, row1,dia_m)} key={id} id={id}></td>
                            )
                        }
                    })}
                </tr>
            )

        })
    }

    render() {
        const alert = (this.state.message === null) ? <div /> : <div className={`alert alert-danger`} role="alert">{this.state.message}</div>
        return (
            <Row className="text-center"> <Col><br />
                <Row>
                    <Col md="4">
                        <FormGroup row>
                            <Label md={3} for="IDdoc">Docente</Label>
                            <Col md={9}><Input bsSize="sm" onChange={this.handleDocChange} type="text" name="doc" id="IDdoc" /></Col>
                        </FormGroup>
                    </Col>
                    <Col md="3">
                        <FormGroup row>
                            <Label md={3} for="IDmate">Materia</Label>
                            <Col md={9}><Input bsSize="sm" onChange={this.handleMatChange} type="text" name="mate" id="IDmate" /></Col>
                        </FormGroup>
                    </Col>
                    <Col md="2">
                        <FormGroup row>
                            <Label md={3} for="IDdia">Dia</Label>
                            <Col md={9}><Input bsSize="sm" disabled type="text" name="dia" id="IDdia" /></Col>
                        </FormGroup>
                    </Col>
                    <Col md="2">
                        <FormGroup row>
                            <Label md={3} for="IDhora">Hora</Label>
                            <Col md={9}><Input bsSize="sm" disabled type="text" name="hora" id="IDhora" /></Col>
                        </FormGroup>
                    </Col>
                    <Col md="1" className='text-center'>
                        <Button onClick={this.handleRowAdd} id='addrow' color="success" type="submit" size="sm"><span className="icon ion-md-add" /></Button>
                    </Col>
                </Row>
                {alert}
                <Table id='hor_adm' responsive striped size="sm">
                    <thead>
                        <tr>
                            <th style={{ width: '50px' }} >Hora</th>
                            <th>Lunes</th>
                            <th>Martes</th>
                            <th>Miercoles</th>
                            <th>Jueves</th>
                            <th>Viernes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </Table>
            </Col></Row>
        )
    }
}