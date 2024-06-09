import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link из react-router-dom
import axios from 'axios';

const Records = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get('http://95.214.62.79:8080/api/records');
        setRecords(response.data);
      } catch (error) {
        console.error('Error fetching records:', error);
      }
    };

    fetchRecords();
  }, []);

  return (
    <div>
      <h1>Records</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Дата</th>
            <th>Начало</th>
            <th>Окончание</th>
            <th>Сумма</th>
            <th>Номер бокса</th>
            <th>Имя</th>
            <th>Номер телефона</th>
            <th>Список услуг</th>
            <th>Действия</th> {/* Новая колонка для ссылки редактирования */}
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.date}</td>
              <td>{record.start_time}</td>
              <td>{record.end_time}</td>
              <td>{record.total_price}</td>
              <td>{record.box_number}</td>
              <td>{record.firstname}</td>
              <td>{record.phoneNumber}</td>
              <td>{record.service_ids ? record.service_ids : 'Нет услуг'}</td>
              <td>
                {/* Создаем ссылку для редактирования */}
                <Link to={`/records/${record.id}`}>Редактировать</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Records;
