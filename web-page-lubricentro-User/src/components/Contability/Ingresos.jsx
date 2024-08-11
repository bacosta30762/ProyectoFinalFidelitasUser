import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import './IngresosPage.css';

const IngresosPage = () => {
    const ingresos = [
        {
            id: 1,
            fecha: '2023-08-01',
            descripcion: 'Venta de lubricante',
            tipo: 'Venta',
            cantidad: 10,
            precioUnitario: 15.00,
            total: 150.00,
            metodoPago: 'Efectivo',
            cliente: 'Juan Pérez',
            factura: 'F12345',
            comentarios: 'Ninguno',
        },
        {
            id: 2,
            fecha: '2023-08-02',
            descripcion: 'Servicio de cambio de aceite',
            tipo: 'Servicio',
            cantidad: 1,
            precioUnitario: 50.00,
            total: 50.00,
            metodoPago: 'Tarjeta',
            cliente: 'María López',
            factura: 'F12346',
            comentarios: 'Ninguno',
        },
        // Agrega más ingresos según sea necesario
    ];

    return (
        <div className="ingresos-container">
            <h1>Ingresos</h1>
            <button className="add-button">Agregar</button>
            <table className="ingresos-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Descripción</th>
                        <th>Tipo de Ingreso</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                        <th>Método de Pago</th>
                        <th>Cliente</th>
                        <th>Factura/Número de Recibo</th>
                        <th>Notas/Comentarios</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ingresos.map((ingreso) => (
                        <tr key={ingreso.id}>
                            <td>{ingreso.fecha}</td>
                            <td>{ingreso.descripcion}</td>
                            <td>{ingreso.tipo}</td>
                            <td>{ingreso.cantidad}</td>
                            <td>{ingreso.precioUnitario.toFixed(2)}</td>
                            <td>{ingreso.total.toFixed(2)}</td>
                            <td>{ingreso.metodoPago}</td>
                            <td>{ingreso.cliente}</td>
                            <td>{ingreso.factura}</td>
                            <td>{ingreso.comentarios}</td>
                            <td className="icon-group">
                                <FaEdit className="edit-icon" />
                                <FaTrashAlt className="delete-icon" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IngresosPage;