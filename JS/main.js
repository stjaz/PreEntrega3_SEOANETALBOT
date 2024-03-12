let carrito = [];

// Agrego constructor para los productos como correción de la entrega nro 2
function Producto(id, nombre, precio) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
}

const productos = [
    new Producto(726, 'Camsieta Ohaio', 5.00),
    new Producto(897, 'Short Las Vegas', 10.00),
    new Producto(432, 'Sandalias Egypt', 40.00)
];

document.addEventListener('DOMContentLoaded', () => {
    cargarProductosEnHTML();
    cargarCarritoDesdeStorage();
    actualizarCarrito();
});

function cargarProductosEnHTML() {
    const productosContainer = document.getElementById('productos');

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.id = `producto-${producto.id}`;
        productoElement.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productosContainer.appendChild(productoElement);
    });
}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
    guardarCarritoEnStorage();
}

function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalElement = document.getElementById('total');

    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        const listItem = document.createElement('li');
        listItem.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        listaCarrito.appendChild(listItem);
        total += producto.precio;
    });

    totalElement.textContent = total.toFixed(2);
}

function realizarCompra() {
    const usuarioRegistrado = confirm('¿Estás registrado?');

    if (usuarioRegistrado) {
        alert('Compra realizada con éxito. El total es de $' + parseFloat(document.getElementById('total').textContent) + '. Gracias por tu compra!');
        carrito = [];
        actualizarCarrito();
        guardarCarritoEnStorage();
    } else {
        alert('Debes estar registrado para realizar una compra. Por favor, regístrate.');
    }
}

function guardarCarritoEnStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}
