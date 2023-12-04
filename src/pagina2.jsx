import React from "react";
import Encabezado from "./encabezado";
import Compra from "./compra";
import AgregarProducto from "./agregarProducto";
const Pagina = () => {
  const handleProductoAgregado = (nuevoProducto) => {
    console.log("Producto agregado en el componente padre", nuevoProducto);

    // Retrieve existing products from localStorage
    const productosEnLocalStorage =
      JSON.parse(localStorage.getItem("productos")) || [];

    // Add the new product to the array
    const productosActualizados = [...productosEnLocalStorage, nuevoProducto];

    // Update localStorage with the updated array
    localStorage.setItem("productos", JSON.stringify(productosActualizados));
  };

  return (
    <div>
      <Encabezado titulo="Mi Página" />
      <Compra handleProductoAgregadoExterno={handleProductoAgregado} />
      <AgregarProducto onProductoAgregado={handleProductoAgregado} />
    </div>
  );
};

export default Pagina;
