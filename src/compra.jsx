import React, { useEffect, useState } from "react";

const Compra = ({ handleProductoAgregadoExterno }) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  function obtenerProductosSeleccionados() {
    const productosEnLocalStorage =
      JSON.parse(localStorage.getItem("productos")) || [];
    return productosEnLocalStorage.filter((producto) => producto.seleccionado);
  }

  function handleCantidadInputChange(event, productoId) {
    const cantidad = parseInt(event.target.value, 10);

    if (!isNaN(cantidad)) {
      setProductosSeleccionados((productos) =>
        productos.map((producto) =>
          producto.id === productoId ? { ...producto, cantidad } : producto
        )
      );
    }
  }

  useEffect(() => {
    const productosLocalStorage = obtenerProductosSeleccionados();
    setProductosSeleccionados(productosLocalStorage);
  }, []);

  console.log(productosSeleccionados);

  return (
    <div id="productos-comprados">
      {productosSeleccionados.length === 0 ? (
        <p>No hay productos seleccionados.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio por KG</th>
              <th>Cantidad</th>
              <th>Total</th> {/* Agregamos una columna para el total */}
            </tr>
          </thead>
          <tbody>
            {productosSeleccionados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.nombre}</td>
                <td>{producto.precio.toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    className="form-control cantidad-input"
                    value={producto.cantidad}
                    onChange={(e) => handleCantidadInputChange(e, producto.id)}
                  />
                </td>
                <td>{(producto.cantidad * producto.precio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Compra;
