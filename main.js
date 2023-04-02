const carrito = [];

alert("Bienvenidos a mi tienda online");

const inicioNav = () =>{
    const ordenProds = confirm('¿Querés ordenar los productos del más barato al mas caro?')

    if (ordenProds) {
        ordenarPrecioAsc()
    } else {
        ordenarPrecioAleat()
    }
}


const ordenarPrecioAsc = () =>{
    productos.sort((a,b)=> a.precio - b.precio);
    mostrarListaOrdenada();
}

const ordenarPrecioAleat = () => {
    productos.sort((a,b) => 0.5 - Math.random());
    mostrarListaOrdenada();
}

const mostrarListaOrdenada = ()=>{
    const listaOrdenada = productos.map(producto => {
        return '#' + producto.id + '-' + producto.nombre + ' $'+ producto.precio;
    });
    alert('Lista de precios:'+'\n\n'+listaOrdenada.join('\n'))
    comprarProductos(listaOrdenada)

}

const comprarProductos = (listaDeProductos) =>{
    let prodNombre = '';
    let otroProducto = false;
    let prodCant = 0;

    do {
        prodNombre = prompt ('¿Que producto desea comprar?'+'\n\n'+listaDeProductos.join('\n'));
        prodCant = parseInt(prompt('¿Cuántos querés comprar?'));

        const prodPorNombre = productos.find(producto => producto.nombre.toLowerCase() === prodNombre.toLowerCase());
        const prodPorId = productos.find(producto => producto.id === prodNombre);
    
        
        if (prodPorNombre || prodPorId) {
            const prodIndex  = productos.findIndex(prodPorNombre(),prodNombre);
            verificarStock(prodIndex, prodCant);
            }
         else {
            alert('El producto no se encuentra en el catálogo.')
        }

        otroProducto = confirm('¿Desea agregar otro producto?');
    } while (otroProducto)

    confirmarCompra()
    return prodIndex;
}


const verificarStock = (index, cantidad)=>{
    if(cantidad<=productos[index].cant) {
        agregarAlCarrito(productos[index].nombre,productos[index].id, cantidad);
        productos[index].cant--; 
    }else {
      alert(`Solo quedan ${productos[index].cant} unidades del producto ${productos[index].nombre}`)}
    }

const agregarAlCarrito = (producto, productoId, cantidad) =>{
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cant += cantidad
        carrito.push(producto)
    } else {
        productoRepetido.cant += cantidad
    }
}

const confirmarCompra = () => {
    const listaCarrito = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cant
    });

    const confirmar = confirm('Checkout: '
        +'\n\n'+listaCarrito.join('\n')
        +'\n\nPara continuar presione "Aceptar". Presione "Cancelar" para eliminar un producto.'
    )

    if (confirmar) {
        finalizarCompra(listaCarrito)
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar:')
        eliminarProductoCarrito(productoAEliminar)
    }
};
const eliminarProductoCarrito = (productoNombre) => {
    carrito.forEach((producto, index) => {
        if (producto.nombre.toLowerCase() === productoNombre.toLowerCase()) {
            if (producto.cantidad > 1) {
                producto.cantidad--
            } else {
                carrito.splice(index, 1)
            }
        }
    })
    confirmarCompra()
};

const finalizarCompra = (listaCarrito) => {
    const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0)
    const precioTotal = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    alert('Detalle de su compra:'
        +'\n\n'+listaCarrito.join('\n')
        +'\n\nTotal de productos: '+cantidadTotal
        +'\n\nEl total de su compra es: '+precioTotal
        +'\n\nGracias por su compra!!!'
    )
};

inicioNav();















