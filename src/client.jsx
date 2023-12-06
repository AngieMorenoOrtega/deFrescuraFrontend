import { createContext, useContext, useState, useEffect } from "react";

const ClienteContext = createContext();

export const useClienteContext = () => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error("useClienteContext must be used within a ClienteProvider");
  }
  return context;
};

export const ClienteProvider = ({ children }) => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const cargarClientes = async () => {
      try {
        const response = await fetch("http://localhost:3001/clientes");
        const data = await response.json();
        setClientes(data);

        // Establecer el primer cliente como seleccionado por defecto
        if (data.length > 0) {
          setClienteSeleccionado(data[0]);
        }
      } catch (error) {
        console.error("Error al cargar la lista de clientes", error);
      }
    };

    cargarClientes();
  }, []);

  return (
    <ClienteContext.Provider
      value={{ clienteSeleccionado, setClienteSeleccionado, clientes }}
    >
      {children}
    </ClienteContext.Provider>
  );
};
