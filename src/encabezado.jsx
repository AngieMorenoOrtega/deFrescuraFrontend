// Importa las librerías necesarias (puedes necesitar otras dependiendo de tu configuración)
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

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
  // Estados
  const [empresa, setEmpresa] = useState({});
  const [fechaActual, setFechaActual] = useState("");
  const [fechaVigencia, setFechaVigencia] = useState("");
  const [tamanioPantalla, setTamanioPantalla] = useState("pequena");

  // Efecto al cargar el componente
  useEffect(() => {
    // Obtener datos de la empresa
    axios.get("http://localhost:3001/empresa").then((response) => {
      setEmpresa(response.data[0]); // Asumo que solo necesitas un registro
    });

    // Obtener fecha actual
    const fecha = new Date();
    const fechaActualFormateada = `${fecha.getDate()}/${
      fecha.getMonth() + 1
    }/${fecha.getFullYear()}`;
    setFechaActual(fechaActualFormateada);

    // Calcular fecha de vigencia (dos días después)
    const fechaVigenciaCalculada = new Date(fecha);
    fechaVigenciaCalculada.setDate(fechaVigenciaCalculada.getDate() + 2);
    const fechaVigenciaFormateada = `${fechaVigenciaCalculada.getDate()}/${
      fechaVigenciaCalculada.getMonth() + 1
    }/${fechaVigenciaCalculada.getFullYear()}`;
    setFechaVigencia(fechaVigenciaFormateada);

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
        <Columna>
          <strong>Vigencia:</strong>
        </Columna>
        <Columna>
          <p>{`Fecha Actual ${fechaActual}`}</p>
        </Columna>
        <Columna>
          <p>{`Fecha Final ${fechaVigencia}`}</p>
        </Columna>
      </DeFrescuraContainer>
    </div>
  );
};

export default Encabezado;
