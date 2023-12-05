import { createContext, useContext, useState, useEffect } from "react";

const DateContext = createContext();

export const useDateContext = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDateContext must be used within a DateProvider");
  }
  return context;
};
const padZero = (value) => {
  return value.toString().padStart(2, "0");
};

export const DateProvider = ({ children }) => {
  const fechaActual = new Date();

  // Calculate expiration date (two days later)
  const fechaVigenciaCalculada = new Date(fechaActual);
  fechaVigenciaCalculada.setDate(fechaVigenciaCalculada.getDate() + 2);
  const fechaVigenciaFormateada = `${fechaVigenciaCalculada.getDate()}/${
    fechaVigenciaCalculada.getMonth() + 1
  }/${fechaVigenciaCalculada.getFullYear()}`;

  const [fechaVigencia, setFechaVigencia] = useState(fechaVigenciaFormateada);

  const fechaFormateada = `${fechaActual.getFullYear()}-${padZero(
    fechaActual.getMonth() + 1
  )}-${padZero(fechaActual.getDate())}`;

  // Helper function to pad single-digit days and months with a leading zero

  useEffect(() => {
    console.log("fechaFormateada:", fechaFormateada);
    console.log("fechaVigencia:", fechaVigencia);
  }, [fechaFormateada, fechaVigencia]);
  return (
    <DateContext.Provider
      value={{
        fechaFormateada,
        fechaVigencia,
        setFechaVigencia,
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
