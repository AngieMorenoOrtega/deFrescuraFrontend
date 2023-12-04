import React, { useState } from "react";
import Encabezado from "./encabezado";
import Compra from "./compra";
import AgregarProducto from "./agregarProducto";
import "../src/styles/paginaPrincipal.css";
import { useClienteContext } from "../src/client";
import { useDateContext } from "../src/date";
const Pagina = () => {
  const { clienteSeleccionado } = useClienteContext();
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [nuevoTotal, setTotal] = useState(0);

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
  const recargarTabla = () => {
    // Obtener productos actualizados desde localStorage
    const productosEnLocalStorage =
      JSON.parse(localStorage.getItem("productos")) || [];

    // Actualizar el estado de productosSeleccionados en Compra.jsx
    setProductosSeleccionados(productosEnLocalStorage);
  };

  const limpiarProductosSeleccionados = () => {
    setProductosSeleccionados([]);
    setTotal(0);
  };

  // Función para actualizar el total
  const actualizarTotal = () => {
    let nuevoTotal = 0;

    if (productosSeleccionados.length > 0) {
      nuevoTotal = productosSeleccionados.reduce(
        (total, producto) => total + producto.cantidad * producto.precio,
        0
      );
    }

    setTotal(nuevoTotal);
  };

  return (
    <div id="pagina-padding">
      <Encabezado titulo="Mi Página" />
      <Compra
        clienteSeleccionado={clienteSeleccionado}
        productosSeleccionados={productosSeleccionados}
        setProductosSeleccionados={setProductosSeleccionados}
        setTotal={setTotal}
      />
      <AgregarProducto
        onProductoAgregado={handleProductoAgregado}
        productosSeleccionados={productosSeleccionados}
        setProductosSeleccionados={setProductosSeleccionados}
        actualizarTotal={actualizarTotal}
      />
    </div>
  );
};

export default Pagina;
