import React, { useState, useEffect } from "react";
import axios from "axios";

const AgregarProducto = ({
  onProductoAgregado,
  productosSeleccionados,
  setProductosSeleccionados,
  actualizarTotal,
}) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [productos, setProductos] = useState("");

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

  const handleNombreChange = (event) => {
    const nuevoNombre = event.target.value;
    setNombre(nuevoNombre);

    const productoEncontrado = productos.find(
      (producto) => producto.nombre === nuevoNombre
    );

    if (productoEncontrado) {
      setPrecio(productoEncontrado.precio.toFixed(2));
    } else {
      setPrecio("");
    }
  };

  const handleProductoAgregado = () => {
    const nuevoProducto = {
      nombre: nombre,
      precio: parseFloat(precio),
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

    setNombre("");
    setPrecio("");
  };

  return (
    <div>
      <h2>Agregar Nuevo Producto</h2>
      <div>
        <label htmlFor="nombre">Nombre del Producto:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={handleNombreChange}
          placeholder="Ingrese el nombre del producto"
        />
      </div>
      <div>
        <label>Precio:</label>
        <input type="text" id="precio" value={precio} readOnly />
      </div>
      <div>
        <button onClick={handleProductoAgregado}>Agregar Producto</button>
      </div>
    </div>
  );
};

export default AgregarProducto;
