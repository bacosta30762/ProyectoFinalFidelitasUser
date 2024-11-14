import React from 'react';
import { Carousel } from 'react-bootstrap';
import { FaOilCan, FaBalanceScale, FaCarCrash, FaWrench, FaDiagnoses } from 'react-icons/fa';
import './Home.css';
import Moto from '../../assets/Motocicleta_1280.jpg';
import Motor from '../../assets/Motor_1280.jpg';
import Taller from '../../assets/Taller_1280.jpg';

const Home = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={Moto} 
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={Motor} 
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src={Taller} 
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <section className="services-section">
        <h2 className="services-title">Servicios que Ofrecemos</h2>
        <div className="services-container">
          <div className="service-item">
            <FaOilCan className="service-icon" />
            <h3>Cambio de aceite</h3>
          </div>
          <div className="service-item">
            <FaBalanceScale className="service-icon" />
            <h3>Balanceo de llantas</h3>
          </div>
          <div className="service-item">
            <FaCarCrash className="service-icon" />
            <h3>Chequeo de Frenos</h3>
          </div>
          <div className="service-item">
            <FaDiagnoses className="service-icon" />
            <h3>Diagnóstico vehicular</h3>
          </div>
          <div className="service-item">
            <FaWrench className="service-icon" />
            <h3>Mantenimiento</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
