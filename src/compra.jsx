import React, { useEffect, useState } from "react";

const Compra = ({ handleProductoAgregadoExterno }) => {
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);

  function obtenerProductosSeleccionados() {
    const productosEnLocalStorage =
      JSON.parse(localStorage.getItem("productos")) || [];
    console.log(productosEnLocalStorage);
    return productosEnLocalStorage.filter((producto) => producto.seleccionado);
  }

  function handleCantidadInputChange(event) {
    const cantidad = parseInt(event.target.value, 10);
    const productoId = event.target.getAttribute("data-id");

    setProductosSeleccionados((productos) =>
      productos.map((producto) =>
        producto.id === productoId ? { ...producto, cantidad } : producto
      )
    );

    actualizarCantidadEnLocalStorage(productoId, cantidad);
  }

  function actualizarCantidadEnLocalStorage(productoId, cantidad) {
    const productosEnLocalStorage =
      JSON.parse(localStorage.getItem("productos")) || [];

    const productosActualizados = productosEnLocalStorage.map((producto) => {
      if (producto.id === productoId) {
        return { ...producto, cantidad: cantidad };
      }
      return producto;
    });

    localStorage.setItem("productos", JSON.stringify(productosActualizados));
  }

  useEffect(() => {
    const productosLocalStorage = obtenerProductosSeleccionados();
    setProductosSeleccionados(productosLocalStorage);
  }, []);

  useEffect(() => {
    const cantidadInputs = document.querySelectorAll(".cantidad-input");

    const handleCantidadInputChange = (event) => {
      const cantidad = parseInt(event.target.value, 10);
      const productoId = event.target.getAttribute("data-id");
      actualizarCantidadEnLocalStorage(productoId, cantidad);
    };

    cantidadInputs.forEach((input) => {
      input.addEventListener("input", handleCantidadInputChange);

      return () => {
        input.removeEventListener("input", handleCantidadInputChange);
      };
    });
  }, [productosSeleccionados]);

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
                    data-id={producto.id}
                    value={producto.cantidad}
                    onChange={handleCantidadInputChange}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Compra;
