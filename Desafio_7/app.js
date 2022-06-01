import productos from './Producto.js'

let productosCarrito = []
let divProductos = document.getElementById('divProductos')
let btnCarrito = document.getElementById('btnCarrito')
let modalBody = document.getElementsByClassName('modal-body')[0]
let modalCarrito = document.getElementById('modalCarrito')


function mostrarCantidadProductos(productosCarrito){
    return btnCarrito.innerHTML = `
    <i class="bi-cart-fill me-1"></i>
          Carrito
     <span class="badge bg-dark text-white ms-1 rounded-pill">${productosCarrito.length}</span>`
}

if(localStorage.getItem('carrito')) {
    productosCarrito = JSON.parse(localStorage.getItem('carrito'))
    mostrarCantidadProductos(productosCarrito)
} else {
    localStorage.setItem('carrito', JSON.stringify(productosCarrito))
}

productos.forEach((producto) => {
    divProductos.innerHTML += producto.mostrarInformacion()
});
 
document.querySelectorAll('.agregar-producto').forEach(nodo => {nodo.addEventListener('click', (e) => {
    
    const productosCart = JSON.parse(localStorage.getItem('carrito'))
     
    let index = productosCart.findIndex(producto => producto.id == e.target.value );
    
    if(index != -1 ){
       
       if(productosCart[index].cantidad < productos[index].stock){
            productosCart[index].cantidad++
            localStorage.setItem('carrito', JSON.stringify(productosCart))
        }
     
    } 
    else {
        let producto = {id: e.target.value, cantidad: 1}
        productosCart.push(producto)
        localStorage.setItem('carrito',JSON.stringify(productosCart))
        console.log(`Producto localStorage ${productosCart.length}`)
        console.log( JSON.parse(localStorage.getItem('carrito')));
        
    }
    mostrarCantidadProductos(productosCart)
})})

/*Mostrar carga Productos */
function mostrarModalBody(producto,item){
    const {nombre,precio,imagen} = producto
    const {cantidad,id} = item 
    return modalBody.innerHTML += `
    <div id ="card${id}" class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
                <img src="${imagen}" class="img-fluid rounded-start" alt="${nombre}">
          </div>
        
            <div class="col-md-8">
              <div class="card-body">
                 <h5 class="card-title">Nombre: ${nombre}</h5>
                 <p class="card-text">Precio: $${precio}</p>
                 <p class="card-text">Cantidad: ${cantidad}</p>
                 <button value="${id}" data-id="btn-${id}" class="btn btn-outline-dark eliminar-producto">Eliminar</button>
               </div>
             </div>
       </div>
    </div>
`
}
/*Eliminar Carrito*/
function eliminarCarrito(total)
{

    modalCarrito.addEventListener('click', (e) => {
        
         const productosCarrito = JSON.parse(localStorage.getItem('carrito'))
         const btnId = e.target.getAttribute('data-id')
         if(btnId !== null){
             const btnValue = e.target.value
             document.getElementById(`card${btnValue}`).remove()
             let productoCatalogo = productos.find(producto => producto.id == e.target.value );
             let productoCarrito = productosCarrito.find(producto => producto.id == productoCatalogo.id );
             total -=productoCatalogo.precio * productoCarrito.cantidad
             let indexCarrito = productosCarrito.findIndex(producto => producto.id == productoCatalogo.id )
             productosCarrito.splice(indexCarrito,1)
             localStorage.setItem('carrito',JSON.stringify(productosCarrito))
             productosCarrito.forEach(producto => console.log(producto))
             document.getElementById('precioFinal').innerHTML = `Precio total $${total}`
             mostrarCantidadProductos(productosCarrito)
         }
        
     })
}

/*Carga carrito*/
btnCarrito.addEventListener('click', () => { 
    productosCarrito = JSON.parse(localStorage.getItem('carrito'));
    modalBody.innerHTML = ""
    let compraTotal = 0
    if (productosCarrito.length > 0)
     {
        productosCarrito.forEach(item => {
            const producto = productos.find(nodo => nodo.id == item.id)
            compraTotal += producto.precio * item.cantidad
            mostrarModalBody(producto,item)
            
        })
       
       document.getElementById('precioFinal').innerHTML = `Precio total $${compraTotal}`
    }else{
        modalBody.innerHTML += `<p>Carrito Vacio</p>`
    }

    eliminarCarrito(compraTotal)
  
})

