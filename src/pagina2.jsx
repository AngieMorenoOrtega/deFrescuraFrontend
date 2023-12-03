import React from "react";
import Encabezado from "./encabezado";
import Compra from "./compra";
import AgregarProducto from "./agregarProducto";
const Pagina = () => {
  return (
    <div>
      <Encabezado titulo="Mi Página" />
      <Compra contenido="Este es el contenido de mi página." />
      <AgregarProducto></AgregarProducto>
    </div>
  );
};

export default Pagina;
