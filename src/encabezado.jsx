// Importa las librerías necesarias (puedes necesitar otras dependiendo de tu configuración)
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

// Import statements in other files
import { useClienteContext } from "./client";
import { useDateContext } from "../src/date";

// Estilos de Styled Components
const DeFrescuraContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: ${(props) =>
    props.tamanioPantalla === "grande" ? "x-small" : "small"};
`;

const Columna = styled.div`
  flex: 1;
  margin: 10px;
  text-align: center;
`;

// Componente principal
const Encabezado = () => {
  const { clienteSeleccionado } = useClienteContext();
  const [empresa, setEmpresa] = useState({});
  const { fechaFormateada, fechaVigencia } = useDateContext();
  const [tamanioPantalla, setTamanioPantalla] = useState("pequena");
  const [clientes, setClientes] = useState([]); // Para almacenar la lista de clientes

  // Efecto al cargar el componente
  useEffect(() => {
    // Obtener datos de la empresa
    axios.get("http://localhost:3001/empresa").then((response) => {
      setEmpresa(response.data[0]); // Asumo que solo necesitas un registro
    });

    // Suscribirse al evento de cambio de tamaño de la pantalla
    const handleResize = () => {
      if (window.innerWidth > 545 && window.innerHeight > 693) {
        setTamanioPantalla("grande");
      } else {
        setTamanioPantalla("pequena");
      }
    };

    window.addEventListener("resize", handleResize);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Se ejecuta solo una vez al cargar el componente

  // Renderización del componente
  return (
    <div>
      <DeFrescuraContainer tamanioPantalla={tamanioPantalla}>
        <Columna>
          <img src={empresa.imagen} alt="Defrescura" />
        </Columna>
        <Columna>
          <p>{empresa.telefono}</p>
          <p>{empresa.email}</p>
          <p>
            <strong>{empresa.nombre}</strong>
          </p>
          <p>{empresa.nit}</p>
          <p>{empresa.direccion}</p>
        </Columna>{" "}
        <div className="tabla-roja" id="vigencia">
          <div>
            <Columna>
              <strong>Vigencia:</strong>
            </Columna>
            <Columna>
              <p>{`Fecha Actual ${fechaFormateada}`}</p>
              <p>{`Fecha Final ${fechaVigencia}`}</p>
            </Columna>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Nit</th>
                <th>Nombre</th>
                <th>Telefono</th>
                <th>Direccion</th>
              </tr>
            </thead>
            <tbody>
              {clienteSeleccionado && (
                <tr key={clienteSeleccionado.id}>
                  <td>{`${clienteSeleccionado.nit} `}</td>
                  <td>{`${clienteSeleccionado.nombre} `}</td>
                  <td>{`${clienteSeleccionado.telefono}`}</td>
                  <td>{`${clienteSeleccionado.direccion} - ${clienteSeleccionado.sucursal}`}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </DeFrescuraContainer>
    </div>
  );
};

export default Encabezado;
