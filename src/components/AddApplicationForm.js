import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { create } from '../http/ApplicationAPI';

const MyModal = ({ show, handleClose }) => {
	const [formData, setFormData] = useState({
		modelView: '',
		modelTitle: '',
		modelDescription: '',
		modelFormula: '',
		modelFigures: '',
		modelAbstract: '',
		concentToIndicateInfo: false,
		openPublicConclusion: false,
		tesisDescription: 'fddf'
	});

	const [formError, setFormError] = useState('');

	const handleChange = (e) => {
		const { id, value, type, checked } = e.target;
		setFormData(prevState => ({
			...prevState,
			[id]: type === 'checkbox' ? checked : value
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const requiredFields = ['modelView', 'modelTitle', 'modelDescription'];
		const emptyFields = requiredFields.filter(field => !formData[field]);
		if (emptyFields.length === 0) {
			console.log(formData);
			try {
				const data = await create(formData);
				alert("Успешно");
				setFormError('');
			} catch (error) {
				setFormError('Ошибка при отправке данных');
			}
		} else {
			setFormError('Заполните все обязательные поля');
		}
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Создание новой заявки</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{formError && <div className="alert alert-danger">{formError}</div>}
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="modelView">
						<Form.Label>Тип</Form.Label>
						<Form.Control type="text" placeholder="Введите тип" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="modelTitle">
						<Form.Label>Название</Form.Label>
						<Form.Control type="text" placeholder="Введите название" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="modelDescription">
						<Form.Label>Описание</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Введите описание" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="modelFormula">
						<Form.Label>Формула</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Введите формулу" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="modelFigures">
						<Form.Label>Фигуры</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Введите фигуры" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="modelAbstract">
						<Form.Label>Реферат</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Введите реферат" onChange={handleChange} />
					</Form.Group>
					<Form.Group controlId="concentToIndicateInfo">
						<Form.Check
							type="checkbox"
							label="Согласие на публикацию информации"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="openPublicConclusion">
						<Form.Check
							type="checkbox"
							label="Согласие на открытую публикацию"
							onChange={handleChange}
						/>
					</Form.Group>
					<Form.Group controlId="tesisDescription">
						<Form.Label>Тезисное описание</Form.Label>
						<Form.Control as="textarea" rows={3} placeholder="Введите тезисное описание" onChange={handleChange} />
					</Form.Group>
					<Button variant="primary" type="submit">
						Создать
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default MyModal;
