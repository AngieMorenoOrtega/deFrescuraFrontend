import { createContext, useContext, useState } from "react";

const DateContext = createContext();

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
};

export const DateProvider = ({ children }) => {
  const fecha = new Date();

  // Format current date
  const fechaActualFormateada = `${fecha.getDate()}/${
    fecha.getMonth() + 1
  }/${fecha.getFullYear()}`;

  // Calculate expiration date (two days later)
  const fechaVigenciaCalculada = new Date(fecha);
  fechaVigenciaCalculada.setDate(fechaVigenciaCalculada.getDate() + 2);
  const fechaVigenciaFormateada = `${fechaVigenciaCalculada.getDate()}/${
    fechaVigenciaCalculada.getMonth() + 1
  }/${fechaVigenciaCalculada.getFullYear()}`;

  const [fechaActual, setFechaActual] = useState(fechaActualFormateada);
  const [fechaVigencia, setFechaVigencia] = useState(fechaVigenciaFormateada);

  return (
    <DateContext.Provider
      value={{ fechaActual, setFechaActual, fechaVigencia, setFechaVigencia }}
    >
      {children}
    </DateContext.Provider>
  );
};
