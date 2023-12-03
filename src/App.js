import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Factura from "./factura"; // Asegúrate de tener la ruta correcta
import Compra from "./compra"; // Asegúrate de tener la ruta correcta
import Pagina from "./pagina2";
const App = () => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  const handleRedireccionCompra = (productos) => {
    setProductosSeleccionados(productos);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/compra"
          element={<Factura onRedireccionCompra={handleRedireccionCompra} />}
        />
        <Route
          path="/factura"
          element={<Compra productosSeleccionados={productosSeleccionados} />}
        />
        <Route path="pagina" element={<Pagina></Pagina>}></Route>
      </Routes>
    </Router>
  );
};

export default App;
