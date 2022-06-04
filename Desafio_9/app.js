import {productos,Producto} from './Producto.js'

let productosCarrito = []
let divProductos = document.getElementById('divProductos')
let btnCarrito = document.getElementById('btnCarrito')
let modalBody = document.getElementsByClassName('modal-body')[0]
let modalCarrito = document.getElementById('modalCarrito')

const DatosJson = async () => {
    
    let datos = await fetch('./productos.json') 

    let productosJson = await datos.json() 
   
    productosJson.forEach(item => {
        productos.push(new Producto(item.id, item.nombre,item.marca, item.precio, item.stock,item.img))
    });
    productos.forEach((producto) => {
        divProductos.innerHTML += producto.mostrarInformacion()
    });
    
    document.querySelectorAll('.agregar-producto').forEach(nodo => {nodo.addEventListener('click', (e) => {
          
        agregarProductos(e.target.value)
        
    })})
}



function mostrarCantidadProductos(productosCarrito){
    return btnCarrito.innerHTML = `
    <i class="bi-cart-fill me-1"></i>
          Carrito
     <span class="badge bg-dark text-white ms-1 rounded-pill">${productosCarrito.length}</span>`
}

document.addEventListener("DOMContentLoaded", function(){

    iniciarCarrito();
    DatosJson()
     
 });

function iniciarCarrito(){
    if(localStorage.getItem('carrito')) {
        productosCarrito = JSON.parse(localStorage.getItem('carrito'))
        mostrarCantidadProductos(productosCarrito)
    } else {
        localStorage.setItem('carrito', JSON.stringify(productosCarrito))
    }
 }

function agregarProductos(ptr){
const productosCart = JSON.parse(localStorage.getItem('carrito'))
     
    let index = productosCart.findIndex(producto => producto.id == ptr );
    console.log(index)
            
    console.log(ptr +"ptr")
            
    if(index != -1 ){
               
        if(productosCart[index].cantidad < productos[index].stock){
            console.log(productosCart[index].cantidad,productos[index].stock)

             productosCart[index].cantidad++
            localStorage.setItem('carrito', JSON.stringify(productosCart))
            const pcantidad=document.getElementById(`cant-producto${ptr}`)
            if(pcantidad){
                actualizarCantidadCarrito(pcantidad,productosCart[index].cantidad)
            }
                    
        }
             
    } 
    else {

        const nodo =productos.find(producto => producto.id == ptr)
        console.log(nodo)
        const {id,nombre,marca,precio,stock,imagen} = nodo
        let vipd ={id:id,nombre:nombre,marca:marca,precio:precio,
                    stock:stock,imagen:imagen,cantidad:1 } 
                
        console.log(vipd.nombre)
        productosCart.push(vipd)
        localStorage.setItem('carrito',JSON.stringify(productosCart))
        console.log(`Producto localStorage ${productosCart.length}`)
        console.log( JSON.parse(localStorage.getItem('carrito')));
                
    }
    mostrarCantidadProductos(productosCart) }
    
function actualizarCantidadCarrito(pcantidad,cantidad){
    pcantidad.innerText =`Cantidad: ${cantidad}`
calcularMonto()
} 

function calcularMonto(){
    productosCarrito = JSON.parse(localStorage.getItem('carrito'));
    modalBody.innerHTML = ""
    let compraTotal = 0
    if (productosCarrito.length > 0)
     {
        productosCarrito.forEach(item => {
           // const producto = productos.find(nodo => nodo.id == item.id)
            console.log(item.precio + "mostrar carrito " ) 
            compraTotal += item.precio * item.cantidad
            mostrarModalBody(item)
           
            
        })
       
       document.getElementById('precioFinal').innerHTML = `Precio total $${compraTotal}`
    }else{
        modalBody.innerHTML += `<p>No hay productos en el carrito</p>`
    }

}    

/*Mostrar carga Productos */
function mostrarModalBody(item){
    const {id,nombre,marca,precio,stock,imagen,cantidad} = item 
   //const {cantidad,id} = item 
     modalBody.innerHTML += `
    <div id ="card${id}" class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
                <img src="img/${imagen}" class="img-fluid rounded-start" alt="${nombre}">
          </div>
        
            <div class="col-md-8">
              <div class="card-body">
                 <h5 class="card-title">Nombre: ${nombre}</h5>
                 <p class="card-text">Marca: ${marca}</p>
                 <p class="card-text">Precio: $${precio}</p>
                 <p class="card-text">Stock: ${stock}</p>
                 <p id="cant-producto${id}" class="card-text">Cantidad: ${cantidad}</p>
                 <button value="${id}" data-id="btn-${id}" class="btn btn-outline-dark eliminar-producto">Eliminar</button>
                 <button dataId=${id} value="${id}" class="btn btn-outline-dark agregarModalProducto">Agregar</button>
               </div>
             </div>
       </div>
    </div>
`
document.querySelectorAll('.agregarModalProducto').forEach(btn => {
 btn.addEventListener('click',(e) => {
     console.log(e.target.value)
     agregarProductos(e.target.value)
 })
})
}
/*Carga carrito*/
btnCarrito.addEventListener('click', () => { 
    calcularMonto()
   
   // eliminarCarrito(compraTotal)

})

document.getElementById('finalizarCompra').addEventListener('click', (e) => {
    Swal.fire({
        icon: 'question',
        title: '¿Desea confirmar su compra?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6'
      }).then((result)=>{
          if(result.isConfirmed){
            Swal.fire({
                icon: 'success',
                title: 'Compra Finalizada',
                text: 'En breve recibira su pedido'
            })
          }
      })
      productosCarrito=[]
      localStorage.removeItem('carrito');
      iniciarCarrito()
    
      const modal = bootstrap.Modal.getInstance(document.querySelector('#modalCarrito'));

      modal.hide()
      document.getElementById('precioFinal').innerHTML = `Precio total $0`
      mostrarCantidadProductos(productosCarrito)
   })

