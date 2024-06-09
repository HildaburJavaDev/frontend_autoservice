import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const CustomModal = ({ show, onHide, onSave }) => {
  const [services, setServices] = useState([]); // Состояние для списка услуг
  const [selectedServices, setSelectedServices] = useState([]); // Состояние для хранения выбранных услуг

  // Функция для загрузки списка услуг
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://95.214.62.79:8080/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Функция для обработки изменений в выбранных услугах
  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedServices(selectedOptions);
  };

  // Функция для обработки сохранения выбранных услуг
  const handleSave = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение кнопки
    console.log(selectedServices); // Вывод выбранных услуг в консоль
    onSave(selectedServices); // Вызов переданной функции onSave с выбранными услугами в качестве аргумента
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Выберите услуги</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Раскрывающийся список услуг */}
        <select multiple value={selectedServices} onChange={handleSelectChange}>
          {services.map(service => (
            <option key={service.id} value={service.id}>{service.title} ({service.price} руб.)</option>
          ))}
        </select>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Закрыть</Button>
        <Button variant="primary" onClick={handleSave}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;
