import React, { useState, useEffect } from "react";
import axios from "axios";

const Encabezado = () => {
  const [empresa, setEmpresa] = useState({});
  const [clientes, setClientes] = useState([]);
  const [fechaActual, setFechaActual] = useState("");

  useEffect(() => {
    // Obtener datos de la empresa
    axios
      .get("http://localhost:3001/empresa")
      .then((response) => setEmpresa(response.data[0])); // Asumo que solo necesitas un registro

    // Obtener datos de los clientes
    axios
      .get("http://localhost:3001/clientes")
      .then((response) => setClientes(response.data));

    // Obtener fecha actual
    const fecha = new Date();
    setFechaActual(
      `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
    );
  }, []); // Se ejecuta solo una vez al cargar el componente

  console.log(clientes);
  console.log(empresa);
  return (
    <div>
      <h1>Encabezado</h1>
      <div>
        <h2>Datos de la Empresa</h2>
        <p>NIT: {empresa.NitEmpresa}</p>
        <p>Dirección: {empresa.Direccion}</p>
        <p>Celular: {empresa.Celular}</p>
        <p>Locación: {empresa.Locacion}</p>
        <p>Empresa: {empresa.Empresa}</p>
        <img src={empresa.Imagen} alt="Logo de la empresa" />
      </div>
      <div>
        <h2>Clientes</h2>
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.Cliente}>
              {cliente.Cliente} - {cliente.Sucursal}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Fecha Actual</h2>
        <p>{fechaActual}</p>
      </div>
    </div>
  );
};

export default Encabezado;
