import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Factura from "./factura";
import Pagina from "./pagina2";
import Encabezado from "./encabezado";

const App = () => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productosExternosSeleccionados, setProductosExternosSeleccionados] =
    useState([]);

  const handleRedireccionCompra = (productos) => {
    setProductosSeleccionados(productos);
  };

  const handleRedireccionAgregados = (productos) => {
    setProductosExternosSeleccionados(productos);
  };

  return (
    <Router>
      <Routes>
        {/* Ruta por defecto redirige a "/compra" */}
        <Route path="/" element={<Navigate to="/compra" />} />

        <Route
          path="/compra"
          element={<Factura onRedireccionCompra={handleRedireccionCompra} />}
        />

        <Route
          path="/pagina"
          element={<Pagina onRedireccionAgregar={handleRedireccionAgregados} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
