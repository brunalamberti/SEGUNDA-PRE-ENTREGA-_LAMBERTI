Copio acá el código del profe. 
Yo cambié el orden (definí arriba de todo la primera función que se ejecuta),
refactoricé algunas pocas cosas, quise agregar una validación para permitir que también tome el número de id como válido para elegir producto -que no funcionó- y, principalmente, quise agregar una verificación y actualización de stock que no funciona y me traba la ejecución del código.  


// Creamos un array vacío para el carrito de compras
const carrito = [];

//Ordenar productos de menor a mayor precio
const ordenarMenorMayor = () => {
    productos.sort((a,b)=> a.precio - b.precio);
    mostrarListaOrdenada();
}

//Ordenar productos de mayor a menor precio
const ordenarMayorMenor = () => {
    productos.sort((a,b)=> b.precio - a.precio);
    mostrarListaOrdenada();
}

const mostrarListaOrdenada = () => {
    const listaOrdenada = productos.map(producto => {
        return '- '+producto.nombre+' $'+producto.precio
    });
    alert('Lista de precios:'+'\n\n'+listaOrdenada.join('\n'))
    comprarProductos(listaOrdenada)
}

const comprarProductos = (listaDeProductos) => {
    let otroProducto;
    let productoNombre = '';
    let productoCantidad = 0;

    do {
        productoNombre = prompt ('¿Que producto desea comprar?'+'\n\n'+listaDeProductos.join('\n'));
        productoCantidad = parseInt(prompt('¿Cuántos querés comprar?'));

        const producto = productos.find(producto => producto.nombre.toLowerCase() === productoNombre.toLowerCase());

        if (producto) {
            agregarAlCarrito(producto, producto.id, productoCantidad)
        } else {
            alert('El producto no se encuentra en el catálogo.')
        }

        otroProducto = confirm('Desea agregar otro producto?');
    } while (otroProducto)

    confirmarCompra()
};

const agregarAlCarrito = (producto, productoId, productoCantidad) => {
    const productoRepetido = carrito.find(producto => producto.id === productoId)
    if (!productoRepetido) {
        producto.cantidad += productoCantidad
        carrito.push(producto)
    } else {
        productoRepetido.cantidad += productoCantidad;
    }
    console.log(carrito)
}

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

const confirmarCompra = () => {
    const listaCarrito = carrito.map(producto => {
        return '- '+producto.nombre+' | Cantidad: '+producto.cantidad
    });

    const confirmar = confirm('Checkout: '
        +'\n\n'+listaCarrito.join('\n')
        +'\n\nPara continuar presione "Aceptar" sino "Cancelar" para eliminar un producto.'
    )

    if (confirmar) {
        finalizarCompra(listaCarrito)
    } else {
        const productoAEliminar = prompt('Ingrese el nombre del producto a eliminar:')
        eliminarProductoCarrito(productoAEliminar)
    }
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

const comprar = () => {
    const productosBaratos = confirm('¿Querés ordenar los productos del más barato al mas caro?')

    if (productosBaratos) {
        ordenarMenorMayor()
    } else {
        ordenarMayorMenor()
    }
};

comprar()