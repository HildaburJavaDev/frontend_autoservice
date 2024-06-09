import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useLocation, useHistory } from "react-router-dom";
import { APPLICATION_ROUTE, LOGIN_ROUTE, RECORD_ROUTE } from "../utils/consts";
import { login } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Login = observer(() => {
	const { user } = useContext(Context)
	const location = useLocation()
	const history = useHistory()
	const isLogin = location.pathname === LOGIN_ROUTE
	const [phoneNumber, setPhoneNumber] = useState('')
	const [firstname, setFirstname] = useState('')

	const click = async () => {
		try {
			const response = await login(phoneNumber, firstname);
			console.log(firstname, phoneNumber)
			user.setUser(response);
			console.log(user._user.role)
			user.setIsAuth(true);
			history.push(RECORD_ROUTE);
		} catch (e) {
			alert(e.response.data.message)
		}
	};



	return (
		<Container
			className="d-flex justify-content-center align-items-center"
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className="p-5">
				<h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
				<Form className="d-flex flex-column">
					<Form.Control
						className="mt-3"
						placeholder="Введите ваш номер телефона..."
						value={phoneNumber}
						onChange={e => setPhoneNumber(e.target.value)}
					/>
					<Form.Control
						className="mt-3"
						placeholder="Введите ваше имя..."
						value={firstname}
						onChange={e => setFirstname(e.target.value)}
						type="password"
					/>
					<Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
						<Button
							variant={"outline-success"}
							onClick={click}
						>
							{'Войти'}
						</Button>
					</Row>

				</Form>
			</Card>
		</Container>
	);
});

export default Login;