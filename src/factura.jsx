import React, { useEffect, useState } from "react";
import axios from "axios";
import "../src/styles/paginaPrincipal.css";
import { useNavigate } from "react-router-dom";

const Factura = ({ onRedireccionCompra }) => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productosSeleccionados, setProductosSeleccionados] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

  useEffect(() => {
    const cargarProductos = () => {
      axios
        .get("http://localhost:3001/productos")
        .then((response) => {
          const productos = response.data;
          setProductos(productos);
          setProductosFiltrados(productos);
        })
        .catch((error) => {
          console.error("Error al obtener productos:", error.message);
        });
    };

    cargarProductos();
  }, []);

  const handleCheckboxChange = (
    productoId,
    productoNombre,
    productoPrecio,
    productoSeleccionado
  ) => {
    const nuevosProductosSeleccionados = [...productosSeleccionados];
    const indiceProducto = nuevosProductosSeleccionados.findIndex(
      (p) => p.id === productoId
    );

    if (indiceProducto !== -1) {
      // Si el producto ya está en la lista, actualizamos el estado
      nuevosProductosSeleccionados[indiceProducto].seleccionado =
        productoSeleccionado;
    } else {
      // Si el producto no está en la lista, lo añadimos
      nuevosProductosSeleccionados.push({
        id: productoId,
        nombre: productoNombre,
        precio: productoPrecio,
        seleccionado: productoSeleccionado,
        cantidad: 1,
      });
    }

    setProductosSeleccionados(nuevosProductosSeleccionados);
    actualizarEstadoBotonComprar();
  };

  const actualizarEstadoBotonComprar = () => {
    const hayProductoSeleccionado = productosSeleccionados.some(
      (producto) => producto.seleccionado
    );
  };

  const handleCategoriaClick = (categoria) => {
    setCategoriaSeleccionada(categoria);

    if (categoria === null || categoria === "") {
      setProductosFiltrados(productos);
    } else {
      const productosFiltrados = productos.filter(
        (producto) => producto.categoria === categoria
      );
      setProductosFiltrados(productosFiltrados);
    }
  };

  function procederAComprar() {
    localStorage.setItem("productos", JSON.stringify(productosSeleccionados));
    navigate("/factura", { state: { productosSeleccionados } });
  }

  return (
    <div>
      <body id="cuerpo">
        <table className="table" id="mi-tabla">
          <thead>
            <tr>
              <th scope="col">
                <span>ACCIÓN</span>
              </th>
              <th scope="col">NOMBRE</th>
              <th scope="col">PRECIO POR KG</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`producto-${producto.id}`}
                      data-id={producto.id}
                      data-nombre={producto.nombre}
                      data-precio={producto.precio}
                      checked={productosSeleccionados.some(
                        (p) => p.id === producto.id && p.seleccionado
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          producto.id,
                          producto.nombre,
                          producto.precio,
                          e.target.checked
                        )
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`producto-${producto.id}`}
                    >
                      Seleccionar
                    </label>
                  </div>
                </td>
                <td>
                  <span>{producto.nombre}</span>
                </td>
                <td id="price">
                  <span>{producto.precio.toFixed(2)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="boton">
          <button
            onClick={procederAComprar}
            disabled={!productosSeleccionados.length}
          >
            Proceder a comprar
          </button>
        </div>

        <div className="container mt-4">
          <div id="tabla-productos"></div>
        </div>

        <footer id="categorias">
          <div>
            {/* Mostrar categorías como botones */}
            <button onClick={() => handleCategoriaClick("")}>Todos</button>
            <button onClick={() => handleCategoriaClick("Frutas")}>
              Frutas
            </button>
            <button onClick={() => handleCategoriaClick("Verduras")}>
              Verduras
            </button>
            <button onClick={() => handleCategoriaClick("Abarrotes")}>
              Abarrotes
            </button>
          </div>
        </footer>
      </body>
    </div>
  );
};

export default Factura;
