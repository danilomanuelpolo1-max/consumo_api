
const contenedor = document.getElementById("contenedor");


async function obtenerProductos() {
  try {

  

    const productosGuardados = localStorage.getItem("productos");

    if (productosGuardados) {
      console.log("Datos cargados desde localStorage");
      mostrarProductos(JSON.parse(productosGuardados));
    } else {
      console.log("Consumiendo API...");

      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();

      console.log("Datos originales:", data);

   
      const productosProcesados = data.map(producto => {
        const { id, title, price, category } = producto;
        return { id, title, price, category };
      });

      console.log("Datos procesados:", productosProcesados);

     
      localStorage.setItem("productos", JSON.stringify(productosProcesados));

    
      mostrarProductos(productosProcesados);
    }

  } catch (error) {
    console.log("Error:", error);
  }
}


function mostrarProductos(productos) {
  contenedor.innerHTML = "";

  productos.forEach(producto => {
    const div = document.createElement("div");

    div.innerHTML = `
      <h3>${producto.title}</h3>
      <p>Precio: $${producto.price}</p>
      <p>Categoría: ${producto.category}</p>
      <hr>
    `;

    contenedor.appendChild(div);
  });
}


obtenerProductos();