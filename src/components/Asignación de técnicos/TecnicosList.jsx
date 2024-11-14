import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ComentariosValoraciones.css";

function TecnicosList() {
  const [items, setItems] = useState(["Luis Alvarado", "Felipe Perez", "Gustavo Rojas"]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <h1>Lista de Técnicos</h1>
      <input
        type="text"
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredItems.length === 0 && <p>No se encontró ningún técnico con este nombre</p>}
      <ul className="list-group">
        {filteredItems.map((item, index) => (
          <li className="list-group-item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default TecnicosList;
