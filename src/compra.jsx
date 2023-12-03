import React, { useEffect } from "react";

const Compra = () => {
  // Función para obtener productos seleccionados del localStorage
  function obtenerProductosSeleccionados() {
    const productosEnLocalStorage =
      JSON.parse(localStorage.getItem("productos")) || [];
    return productosEnLocalStorage.filter((producto) => producto.seleccionado);
    console.log(productosEnLocalStorage);
  }

  // Función para renderizar la tabla de productos seleccionados
  function renderizarProductosSeleccionados(productos) {
    const productosCompradosDiv = document.getElementById(
      "productos-comprados"
    );

    if (productos.length === 0) {
      productosCompradosDiv.innerHTML =
        "<p>No hay productos seleccionados.</p>";
      return;
    }

    // Crear la tabla
    const tabla = document.createElement("table");
    tabla.classList.add("table");

    // Crear el encabezado de la tabla
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Nombre</th>
        <th>Precio por KG</th>
        <th>Cantidad</th>
      </tr>
    `;
    tabla.appendChild(thead);

    // Crear el cuerpo de la tabla
    const tbody = document.createElement("tbody");

    productos.forEach((producto) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${producto.nombre}</td>
        <td>${producto.precio.toFixed(2)}</td>
        <td>
          <input
            type="number"
            class="form-control cantidad-input"
            data-id="${producto.id}"
            value="${producto.cantidad}"
          />
        </td>
      `;
      tbody.appendChild(tr);
    });

    tabla.appendChild(tbody);
    productosCompradosDiv.innerHTML = "";
    productosCompradosDiv.appendChild(tabla);
  }

  // Función para manejar cambios en la cantidad
  function handleCantidadInputChange(event) {
    const cantidad = parseInt(event.target.value, 10);
    const productoId = event.target.getAttribute("data-id");
    actualizarCantidadEnLocalStorage(productoId, cantidad);
  }

  // Función para actualizar la cantidad en localStorage
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
    // Volver a renderizar la tabla después de actualizar la cantidad
    renderizarProductosSeleccionados(productosActualizados);
  }

  useEffect(() => {
    // Obtén los productos seleccionados del localStorage
    const productosSeleccionados = obtenerProductosSeleccionados();

    // Renderiza la tabla de productos seleccionados
    renderizarProductosSeleccionados(productosSeleccionados);

    // Agrega un evento para manejar cambios en la cantidad
    const cantidadInputs = document.querySelectorAll(".cantidad-input");
    cantidadInputs.forEach((input) => {
      input.addEventListener("input", handleCantidadInputChange);
    });
  }, []); // Asegúrate de pasar un array vacío como segundo argumento para que useEffect se ejecute solo una vez

  return <div id="productos-comprados"></div>;
};

export default Compra;

// import React, { useEffect } from "react";

// const Compra = () => {
//   // Función para obtener productos seleccionados del localStorage
//   function obtenerProductosSeleccionados() {
//     const productosEnLocalStorage =
//       JSON.parse(localStorage.getItem("productos")) || [];
//     return productosEnLocalStorage.filter((producto) => producto.seleccionado);
//     console.log(productosEnLocalStorage);
//   }

//   // Función para renderizar la tabla de productos seleccionados
//   function renderizarProductosSeleccionados(productos) {
//     const productosCompradosDiv = document.getElementById(
//       "productos-comprados"
//     );

//     if (productos.length === 0) {
//       productosCompradosDiv.innerHTML =
//         "<p>No hay productos seleccionados.</p>";
//       return;
//     }

//     // Crear la tabla
//     const tabla = document.createElement("table");
//     tabla.classList.add("table");

//     // Crear el encabezado de la tabla
//     const thead = document.createElement("thead");
//     thead.innerHTML = `
//       <tr>
//         <th>Nombre</th>
//         <th>Precio por KG</th>
//         <th>Cantidad</th>
//       </tr>
//     `;
//     tabla.appendChild(thead);

//     // Crear el cuerpo de la tabla
//     const tbody = document.createElement("tbody");

//     productos.forEach((producto) => {
//       const tr = document.createElement("tr");
//       tr.innerHTML = `
//         <td>${producto.nombre}</td>
//         <td>${producto.precio.toFixed(2)}</td>
//         <td>
//           <input
//             type="number"
//             class="form-control cantidad-input"
//             data-id="${producto.id}"
//             value="${producto.cantidad}"
//           />
//         </td>
//       `;
//       tbody.appendChild(tr);
//     });

//     tabla.appendChild(tbody);
//     productosCompradosDiv.innerHTML = "";
//     productosCompradosDiv.appendChild(tabla);
//   }

//   // Función para manejar cambios en la cantidad
//   function handleCantidadInputChange(event) {
//     const cantidad = parseInt(event.target.value, 10);
//     const productoId = event.target.getAttribute("data-id");
//     actualizarCantidadEnLocalStorage(productoId, cantidad);
//   }

//   // Función para actualizar la cantidad en localStorage
//   function actualizarCantidadEnLocalStorage(productoId, cantidad) {
//     const productosEnLocalStorage =
//       JSON.parse(localStorage.getItem("productos")) || [];

//     const productosActualizados = productosEnLocalStorage.map((producto) => {
//       if (producto.id === productoId) {
//         return { ...producto, cantidad: cantidad };
//       }
//       return producto;
//     });

//     localStorage.setItem("productos", JSON.stringify(productosActualizados));
//     // Volver a renderizar la tabla después de actualizar la cantidad
//     renderizarProductosSeleccionados(productosActualizados);
//   }

//   useEffect(() => {
//     // Obtén los productos seleccionados del localStorage
//     const productosSeleccionados = obtenerProductosSeleccionados();

//     // Renderiza la tabla de productos seleccionados
//     renderizarProductosSeleccionados(productosSeleccionados);

//     // Agrega un evento para manejar cambios en la cantidad
//     const cantidadInputs = document.querySelectorAll(".cantidad-input");
//     cantidadInputs.forEach((input) => {
//       input.addEventListener("input", handleCantidadInputChange);
//     });
//   }, []); // Asegúrate de pasar un array vacío como segundo argumento para que useEffect se ejecute solo una vez

//   return <div id="productos-comprados"></div>;
// };

// export default Compra;
