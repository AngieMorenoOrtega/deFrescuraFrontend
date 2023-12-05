import React, { useState, useEffect } from "react";
import axios from "axios";

const AgregarProducto = ({
  onProductoAgregado,
  productosSeleccionados,
  setProductosSeleccionados,
  actualizarTotal,
}) => {
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/productos")
      .then((response) => {
        const productos = response.data;
        setProductos(productos);
      })
      .catch((error) => {
        console.error("Error al obtener productos:", error.message);
      });
  }, []);

  const handleProductoChange = (event) => {
    const nombreProducto = event.target.value;
    setProductoSeleccionado(nombreProducto);

    const productoEncontrado = productos.find(
      (producto) => producto.nombre === nombreProducto
    );

    if (productoEncontrado) {
      setCantidad(""); // Limpiar la cantidad al cambiar el producto
    }
  };

  const handleCantidadChange = (event) => {
    const nuevaCantidad = event.target.value;
    setCantidad(nuevaCantidad);
  };

  const handleProductoAgregado = () => {
    const productoEncontrado = productos.find(
      (producto) => producto.nombre === productoSeleccionado
    );

    if (productoEncontrado) {
      const nuevoProducto = {
        idProducto: productoEncontrado.id,
        nombre: productoSeleccionado,
        precio: parseFloat(productoEncontrado.precio.toFixed(2)),
        cantidad: parseInt(cantidad, 10) || 1, // Por defecto 1 si la cantidad está vacía o no es un número
      };

      // Verificar si el producto ya está en la lista
      const productoExistente = productosSeleccionados.find(
        (producto) => producto.nombre === nuevoProducto.nombre
      );

      if (!productoExistente) {
        // Si no existe, agregar el nuevo producto
        setProductosSeleccionados([...productosSeleccionados, nuevoProducto]);

        // Actualizar el total cuando se agrega un nuevo producto
        actualizarTotal();
      }
    }

    setProductoSeleccionado("");
    setCantidad("");
  };

  return (
    <div>
      <h2>Agregar Nuevo Producto</h2>
      <div>
        <label htmlFor="producto">Producto:</label>
        <select
          id="producto"
          value={productoSeleccionado}
          onChange={handleProductoChange}
        >
          <option value="" disabled>
            Seleccione un producto
          </option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.nombre}>
              {producto.nombre}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cantidad">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          value={cantidad}
          onChange={handleCantidadChange}
          placeholder="Ingrese la cantidad"
        />
      </div>
      <div>
        <button onClick={handleProductoAgregado}>Agregar Producto</button>
      </div>
    </div>
  );
};

export default AgregarProducto;
