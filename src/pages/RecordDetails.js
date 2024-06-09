import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';

const RecordDetails = () => {
  const { recordId } = useParams();
  const [record, setRecord] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const fetchRecord = async () => {
    try {
      const response = await axios.get(`http://95.214.62.79:8080/api/records/${recordId}`);
      setRecord(response.data[0]);
    } catch (error) {
      console.error('Error fetching record details:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://95.214.62.79:8080/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [recordId]);

  const handleModalShow = () => {
    fetchServices();
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://95.214.62.79:8080/api/records/${recordId}/add-services`, { services: selectedServices });
      setShowModal(false);
    } catch (error) {
      console.error('Error saving selected services:', error);
    }
  };

  if (!record) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="record-details">
      <h1>Детали записи</h1>
      <p><strong>ID:</strong> {record.id}</p>
      <p><strong>Дата:</strong> {record.date}</p>
      <p><strong>Время начала:</strong> {record.start_time}</p>
      <p><strong>Время окончания:</strong> {record.end_time}</p>
      <p><strong>Сумма:</strong> {record.total_price}</p>
      <p><strong>Номер бокса:</strong> {record.box_number}</p>
      <p><strong>Имя:</strong> {record.firstname}</p>
      <p><strong>Номер телефона:</strong> {record.phoneNumber}</p>
      <p><strong>Услуги:</strong> {record.service_ids}</p>
      
      <Button variant="primary" onClick={handleModalShow}>Добавить услуги</Button>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Выберите услуги</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select multiple value={selectedServices} onChange={(e) => setSelectedServices(Array.from(e.target.selectedOptions, option => option.value))}>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.title} ({service.price} руб.)</option>
            ))}
          </select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Закрыть</Button>
          <Button variant="primary" onClick={handleSave}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RecordDetails;
