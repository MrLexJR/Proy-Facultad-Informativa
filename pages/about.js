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
		}
	}


	render() {
		return (
			<Layout  {...this.props}>
				<Row >
					<Col>
						<h1 className="text-center display-4 m-2 ">Desarrolladores</h1>
						<Row className="m-4">
							<Col md={3}>
								<Col className='d-flex align-items-center justify-content-center'>
									<img className="rounded-circle" src="/static/about/Rivera.jpg" alt="Jonathan Rivera" width="140" height="140"></img>
								</Col>
								<h2 className="text-center">Jonathan Rivera</h2>
								<p className="text-center">Analista de Sistemas <br />Programador <br />Diseñador <br/>
								<a target="_blank" href="https://github.com/MrLexJR" className="text-muted font-weight-bold" > @MrLexJR</a> </p>
							</Col>
							<Col md={3}>
								<Col className='d-flex align-items-center justify-content-center'>
									<img className="rounded-circle" src="/static/about/Sumba.jpg" alt="Jonathan Rivera" width="140" height="140"></img>
								</Col>
								<h2 className="text-center">Angel Sumba</h2>
								<p className="text-center">Desarrollador 3D <br />Programador <br />Diseñador</p>
							</Col>
							<Col md={3}>
								<Col className='d-flex align-items-center justify-content-center'>
									<img className="rounded-circle" src="/static/about/Melina.jpg" alt="Jonathan Rivera" width="140" height="140"></img>
								</Col>
								<h2 className="text-center">Melina Vasquez</h2>
								<p className="text-center">Documentadora<br />Diseñadora <br/>
								<a target="_blank" href="https://github.com/melinavl97" className="text-muted font-weight-bold" > @melinavl97</a>  </p>
							</Col>
							<Col md={3}>
								<Col className='d-flex align-items-center justify-content-center'>
									<img className="rounded-circle" src="/static/about/Chilan.jpg" alt="Jonathan Rivera" width="140" height="140"></img>
								</Col>
								<h2 className="text-center">Cristhian Loor</h2>
								<p className="text-center">Analista de Sistemas<br/> Tester </p>
							</Col>
						</Row>
						<p className="text-center text-muted"> El proyecto se encuentra almacenado en <a target="_blank" href="https://github.com/MrLexJR/Proy-Facultad-Informativa" className="text-muted font-weight-bold" > github</a> </p>
					</Col>
				</Row>
			</Layout>
		)
	}
}



