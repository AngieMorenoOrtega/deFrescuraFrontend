import React, { useEffect, useState } from "react";
import axios from "axios";
import "../src/styles/paginaPrincipal.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDateContext } from "../src/date";
import { useClienteContext } from "../src/client";

const Compra = ({
  productosSeleccionados,
  setProductosSeleccionados,
  setTotal,
}) => {
  const [nuevoTotal, setNuevoTotal] = useState(0);
  const navigate = useNavigate();
  const { fechaFormateada } = useDateContext();
  const { clienteSeleccionado, setClienteSeleccionado } = useClienteContext();
  console.log(fechaFormateada);
  const cargarProductosDesdeLocalStorage = () => {
    const productosLocalStorage =
      JSON.parse(localStorage.getItem("productos")) || [];

    // Asegurarse de que la cantidad sea al menos 1 y calcular el total
    const productosConCantidadValida = productosLocalStorage.map(
      (producto) => ({
        ...producto,
        cantidad: Math.max(1, producto.cantidad || 1),
        total: producto.precio * Math.max(1, producto.cantidad || 1),
      })
    );

    setProductosSeleccionados(productosConCantidadValida);
  };

  const actualizarTotal = () => {
    let nuevoTotal = 0;

    if (productosSeleccionados.length > 0) {
      nuevoTotal = productosSeleccionados.reduce(
        (total, producto) => total + producto.total,
        0
      );
    }

    setNuevoTotal(nuevoTotal);
  };

  useEffect(() => {
    cargarProductosDesdeLocalStorage();
    actualizarTotal();
  }, [clienteSeleccionado]);

  const handleCantidadInputChange = (event, productoId) => {
    const cantidad = parseInt(event.target.value, 10);

    if (!isNaN(cantidad) && cantidad >= 0) {
      setProductosSeleccionados((productos) =>
        productos.map((producto) =>
          producto.id === productoId
            ? {
                ...producto,
                cantidad,
                total: producto.precio * cantidad, // Calculate total based on new quantity
              }
            : producto
        )
      );

      // No need to call actualizarTotal() here, as we're updating the total for each product
    }
  };
  console.log(nuevoTotal);
  const subirOrden = async () => {
    // Solo incluir las propiedades necesarias de cada producto
    const productosSinSeleccionado = productosSeleccionados.map(
      ({ productoId, cantidad, nombre, precio }) => ({
        productoId,
        cantidad,
        nombre,
        precio,
      })
    );
    console.log(productosSinSeleccionado);

    try {
      const response = await fetch("http://localhost:3001/ordenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clienteId: clienteSeleccionado.clienteId,
          sucursal: clienteSeleccionado.sucursal,
          fechaPedido: fechaFormateada,
          productosSeleccionados: productosSinSeleccionado,
          total: nuevoTotal,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Orden subida exitosamente",
          showConfirmButton: false,
          timer: 1500,
        });

        setProductosSeleccionados([]);
      } else {
        const errorResponse = await response.json();

        alert(
          `Error al subir la orden: ${
            errorResponse.error || "Hubo un problema al procesar la solicitud."
          }`
        );
      }
    } catch (error) {
      console.error("Error al subir la orden", error);

      alert(`Error al subir la orden: ${error.message}`);
    }
  };

  return (
    <div id="productos-comprados" className="tabla-roja">
      {productosSeleccionados.length === 0 ? (
        <p>No hay productos seleccionados.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio por KG</th>
              <th>Cantidad</th>
              <th>Total</th>
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
                <td>{producto.total ? producto.total.toFixed(2) : "N/A"}</td>
              </tr>
            ))}

            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <strong>
                  Total-total: $
                  {productosSeleccionados
                    .reduce((total, producto) => total + producto.total, 0)
                    .toFixed(2)}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <button onClick={subirOrden} disabled={!productosSeleccionados.length}>
        Comprar
      </button>
    </div>
  );
};

export default Compra;
