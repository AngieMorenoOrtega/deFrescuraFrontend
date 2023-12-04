import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Factura from "./factura"; // Asegúrate de tener la ruta correcta
import Compra from "./compra"; // Asegúrate de tener la ruta correcta
import Pagina from "./pagina2";
import Encabezado from "./encabezado";
const App = () => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productosExternosSeleccionados, setProductosExternosSeleccionados] = useState([]);

  const handleRedireccionCompra = (productos) => {
    setProductosSeleccionados(productos);
  };

  const handleRedireccionAgregados = (productos) => {
    setProductosExternosSeleccionados(productos);
  };
  return (
    <Router>
      <Routes>
        <Route
          path="/compra"
          element={<Factura onRedireccionCompra={handleRedireccionCompra} />}
        />

        <Route path="/pagina" element={<Pagina onRedireccionAgregar={handleRedireccionAgregados}></Pagina>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
