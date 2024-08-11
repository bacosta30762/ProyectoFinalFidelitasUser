import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import OrdenForm from "../components/orden/OrdenForm";
import OrdenDetail from "../components/orden/OrdenDetail";
import OrdenSearch from "../components/orden/OrdenSearch";
import FakeOrdenList from "../components/orden/FakeOrdenList";

const OrdenPage = () => {
  return (
    <div>
      <h1>Orden</h1>
      <nav>
        <ul>
          <li>
            <Link to="crear">Crear Orden</Link>
          </li>
          <li>
            <Link to="buscar">Buscar Órdenes</Link>
          </li>
          <li>
            <Link to="lista">Lista de Órdenes</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route
          path="crear"
          element={
            <OrdenForm
              onSubmit={(data) => {
                axios
                  .post("/api/ordenes", data)
                  .then((response) =>
                    console.log("Orden creada:", response.data)
                  )
                  .catch((error) =>
                    console.error("Error creating order:", error)
                  );
              }}
            />
          }
        />
        <Route path="buscar" element={<OrdenSearch />} />
        <Route path="lista" element={<FakeOrdenList />} />
        <Route path=":id" element={<OrdenDetail />} />
      </Routes>
    </div>
  );
};

export default OrdenPage;
