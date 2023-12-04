import React, { useState, useEffect } from "react";
import axios from "axios";

const Encabezado = () => {
  const [empresa, setEmpresa] = useState({});
  const [clientes, setClientes] = useState([]);
  const [fechaActual, setFechaActual] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  useEffect(() => {
    // Obtener datos de la empresa
    axios
      .get("http://localhost:3001/empresa")
      .then((response) => setEmpresa(response.data[0])); // Asumo que solo necesitas un registro

    // Obtener datos de los clientes
    axios.get("http://localhost:3001/clientes").then((response) => {
      setClientes(response.data);
      // Seleccionar el primer cliente por defecto
      if (response.data.length > 0) {
        setSelectedClient(response.data[0]);
      }
    });
    // Obtener fecha actual
    const fecha = new Date();
    setFechaActual(
      `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`
    );
  }, []); // Se ejecuta solo una vez al cargar el componente

  console.log(clientes);
  console.log(selectedClient);
  return (
    <div>
      <h1>Encabezado</h1>
      <div>
        <h2>Datos de la Empresa</h2>
        <p>Nombre: {empresa.nombre}</p>
        <p>NIT: {empresa.nit}</p>
        <p>Dirección: {empresa.direccion}</p>
        <p>Celular: {empresa.telefono}</p>
        <p>Email {empresa.email}</p>
        <img src={empresa.imagen} alt="Defrescura" />
      </div>
      <div>
        <h2>Clientes</h2>
        {/* <ul>
          {selectedClient.map((cliente) => (
            <li key={cliente.nombre}>
              <li>{cliente.telefono}</li>
              <li>{cliente.correo}</li>
              {cliente.direccion} - {cliente.sucursal}
            </li>
          ))}
        </ul> */}
      </div>
      <div>
        <h2>Fecha Actual</h2>
        <p>{fechaActual}</p>
      </div>
    </div>
  );
};

export default Encabezado;
