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
            det: '',
            marca: '',
            cant: '',
            rows_ac: [],
            rows: [
                { id: 1, descrip: 'Computador', cant: 12, marca: 'Dell' },
                { id: 2, descrip: 'Proyector', cant: 2, marca: 'Samsung' },
                { id: 3, descrip: 'Aire Acondicionado', cant: 2, marca: 'LG' },
                { id: 4, descrip: 'Router', cant: 1, marca: 'Tp-Link' },
                { id: 5, descrip: 'Regulador', cant: 6, marca: 'forza' },
                { id: 6, descrip: 'Camara', cant: 2, marca: 'Cannon' }
            ],
            message: null,
        }
        this.handleDetChange = this.handleDetChange.bind(this)
        this.handleMarChange = this.handleMarChange.bind(this)
        this.handleCanChange = this.handleCanChange.bind(this)
        this.handleRowAdd = this.handleRowAdd.bind(this)
        this.handleRowDel = this.handleRowDel.bind(this)
        this.handleRowUpd = this.handleRowUpd.bind(this)
        this.Rows_act = this.Rows_act.bind(this)
        this.Clean = this.Clean.bind(this)
    }
    Clean = () => {
        document.getElementById("IDdeta").value = ''; document.getElementById("IDmarca").value = ''; document.getElementById("IDcant").value = '';
        this.setState({ det: '' }); this.setState({ marca: '' }); this.setState({ cant: '' }); this.setState({ message: null })
    }

    handleCanChange(event) { this.setState({ cant: event.target.value.trim() }) }
    handleMarChange(event) { this.setState({ marca: event.target.value.trim() }) }
    handleDetChange(event) { this.setState({ det: event.target.value.trim() }) }
    Rows_act = (idx) => () => { this.setState({ rows_ac: idx }) }

    handleRowDel = (idx) => () => {
        var index = this.state.rows.indexOf(idx);
        this.state.rows.splice(index, 1);
        this.setState(this.state.rows);
    };

    handleRowUpd = (idx) => () => {
        this.setState({ rows_ac: idx })
        this.setState({ det: idx.descrip }); this.setState({ marca: idx.marca }); this.setState({ cant: idx.cant });
        document.getElementById("IDdeta").value = idx.descrip;
        document.getElementById("IDmarca").value = idx.marca;
        document.getElementById("IDcant").value = idx.cant;
    }

    handleRowAdd(event) {
        event.preventDefault()
        this.setState({ message: null })
        if (!this.state.det || !this.state.marca || !this.state.cant) {
            this.setState({ message: 'Debe ingresar todos los datos' })
            return
        }
        if (this.state.rows_ac.length !== 0) {
            var index = this.state.rows.indexOf(this.state.rows_ac);
            const item = {
                id: this.state.rows_ac.id,
                descrip: this.state.det,
                cant: this.state.cant,
                marca: this.state.marca
            };
            this.setState({ rows_ac: [] });
            this.state.rows.splice(index, 1, item);
            this.setState(this.state.rows);
        } else {
            const id_1 = this.state.rows.map((row) => { return row.id })  // get all id of array
            if (id_1.length !== 0) {
                var id = id_1.slice(-1)[0] + 1                                 // get last id and + 1
            } else {
                var id = 1
            }
            const item = {
                id: id,
                descrip: this.state.det,
                cant: this.state.cant,
                marca: this.state.marca
            };
            this.setState({ rows: [...this.state.rows, item] });
        }
        this.Clean();
        this.setState({ det: '' }); this.setState({ marca: '' }); this.setState({ cant: '' });
    }

    renderTableData() {
        return this.state.rows.map((row, index) => {
            const { id, descrip, cant, marca } = row //destructuring
            return (
                <tr key={id} id={id}>
                    <th className='t_i_desc'>{descrip}</th>
                    <td className='t_i_mar_cant' >{marca}</td>
                    <td className='t_i_mar_cant' >{cant}</td>
                    <td className='t_i_opc' ><span className="table-remove ">
                        <button type="submit" onClick={this.handleRowUpd(row)} className="btn btn-primary btn-rounded btn-sm my-0"><span className="icon ion-md-create" /></button> {' '}
                        <button type="button" onClick={this.handleRowDel(row)} className="btn btn-danger btn-rounded btn-sm my-0"><span className="icon ion-md-trash" /></button>
                    </span></td>
                </tr>
            )
        })
    }

    render() {
        const alert = (this.state.message === null) ? <div /> : <div className={`alert alert-danger`} role="alert">{this.state.message}</div>
        return (
            <Row >
                <Col><br />
                    <Row className="text-center" >
                        <Col md="4">
                            <FormGroup row>
                                <Label md={3} for="IDdeta">Detalle</Label>
                                <Col md={9}><Input onChange={this.handleDetChange} bsSize="sm" type="text" name="deta" id="IDdeta" /></Col>
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup row>
                                <Label md={3} for="IDmarca">Marca</Label>
                                <Col md={9}><Input onChange={this.handleMarChange} bsSize="sm" type="text" name="marca" id="IDmarca" /></Col>
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup row>
                                <Label md={4} for="IDcant">Cantidad</Label>
                                <Col md={5}><Input onChange={this.handleCanChange} bsSize="sm" type="text" name="cant" id="IDcant" /></Col>
                                <Col md={3} className='text-center'>
                                    <Button onClick={this.handleRowAdd} id='addrow' color="success" type="submit" size="sm"><span id='ic_m_a' className="icon ion-md-add" /></Button> {' '}
                                    <Button onClick={this.Clean} id='clean' color="secondary" type="submit" size="sm"><span className="icon ion-md-close" /></Button>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Row>
                    {alert}
                    <Table hover id='myt' className='TbIm_Admin' >
                        <thead>
                            <tr>
                                <th className='t_i_desc' >Detalles</th>
                                <th className='t_i_mar_cant'>Marca</th>
                                <th className='t_i_mar_cant'>Cantidad.</th>
                                <th className='t_i_opc'>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTableData()}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        )
    }
}



