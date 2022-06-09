import {productos,Producto} from './Producto.js'

let productosCarrito = []
let divProductos = document.getElementById('divProductos')
let btnCarrito = document.getElementById('btnCarrito')
let modalBody = document.getElementsByClassName('modal-body')[0]

const obtenerProductos = async () => {
    
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

/*Muestra cantidad de productos en el carrito*/
function mostrarCantidadProductos(productosCarrito){
    return btnCarrito.innerHTML = `
    <i class="bi-cart-fill me-1"></i>
          Carrito
     <span class="badge bg-dark text-white ms-1 rounded-pill">${productosCarrito.length}</span>`
}

/*Evento que muestra todos los productos*/
document.addEventListener("DOMContentLoaded", function(){
    iniciarCarrito();
    obtenerProductos() 
 });

 /*Inicio carrito*/
function iniciarCarrito(){
    if(localStorage.getItem('carrito')) {
        productosCarrito = JSON.parse(localStorage.getItem('carrito'))
        mostrarCantidadProductos(productosCarrito)
    } else {
        localStorage.setItem('carrito', JSON.stringify(productosCarrito))
    }
 }

/*Agregar Productos Carrito*/
function agregarProductos(ptr){
const productosCart = JSON.parse(localStorage.getItem('carrito'))
    let index = productosCart.findIndex(producto => producto.id == ptr );
    const nodo =productos.find(producto => producto.id == ptr)
        const {id,nombre,marca,precio,stock,imagen} = nodo      
    if(index != -1 ){
               
        if(productosCart[index].cantidad < nodo.stock){
            productosCart[index].cantidad++
            localStorage.setItem('carrito', JSON.stringify(productosCart))
            const pcantidad=document.getElementById(`cant-producto${ptr}`)
            if(pcantidad){
                actualizarCantidadCarrito(pcantidad,productosCart[index].cantidad)
            }
                    
        }
             
    } 
    else { 
        let vipd ={id:id,nombre:nombre,marca:marca,precio:precio,
                    stock:stock,imagen:imagen,cantidad:1 } 
        productosCart.push(vipd)
        localStorage.setItem('carrito',JSON.stringify(productosCart))
                
    }
    mostrarCantidadProductos(productosCart)
 }

 /*Eliminar todos los productos del Carrito*/
function eliminarProducto(indice)
{
    const productosDelStorage = JSON.parse(localStorage.getItem('carrito'))
    let index = productosDelStorage.findIndex(producto => producto.id == indice );   
          
    let nodo=document.getElementById(`card${indice}`)
     while (nodo.firstChild) {
       nodo.removeChild(nodo.firstChild);
     }
    productosDelStorage.splice(index,1)
    localStorage.setItem('carrito',JSON.stringify(productosDelStorage))
    calcularMonto()
    mostrarCantidadProductos(productosDelStorage)
          
}

/*Actualiza cantidad carrito*/
function actualizarCantidadCarrito(pcantidad,cantidad){
    pcantidad.innerText =`Cantidad: ${cantidad}`
    calcularMonto()
} 

 /*Calcula Monto de la Compra*/
function calcularMonto(){
    productosCarrito = JSON.parse(localStorage.getItem('carrito'));
    modalBody.innerHTML = ""
    let compraTotal = 0
    if (productosCarrito.length > 0)
     {
        productosCarrito.forEach(item => { 
           compraTotal += item.precio * item.cantidad
            mostrarModalBody(item)   
        })
       
       document.getElementById('precioFinal').innerHTML = `Precio total $${new Intl.NumberFormat("es-CO").format(compraTotal)}`
    }else{
        modalBody.innerHTML= ""
                document.getElementById('precioFinal').innerHTML = ""
                modalBody.innerHTML += `<h4>Tu Pedido</h4>
                                        <p>No hay productos en el carrito</p>`
                document.getElementById('finalizarCompra').style.visibility = "hidden";
                document.getElementById('cerrar').style.visibility = "hidden";
                document.getElementById('iniciarCompra').style.visibility = "visible";
                
    }
   return compraTotal
}    

/*Mostrar carga Productos a Comprar en el carrito */
function mostrarModalBody(item){
    const {id,nombre,marca,precio,stock,imagen,cantidad} = item  
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
                 <button value="${id}" data-id="btn-${id}" class="btn btn-outline-dark eliminar-producto"><i class="fas fa-trash-alt">Eliminar</i></button>
                 <button  value="${id}" class="btn btn-outline-dark eliminarUnProducto"><i class="fas fa-minus"></i></i></button>
                 <button dataId=${id} value="${id}" class="btn btn-outline-dark agregarModalProducto"><i class="fas fa-plus"></i></button>
               </div>
             </div>
       </div>
    </div>
`
/*Agregar un producto en el carrito*/
document.querySelectorAll('.agregarModalProducto').forEach(btn => {
 btn.addEventListener('click',(e) => {
     agregarProductos(btn.value)
 })
})

/*Evento eliminar un producto*/
document.querySelectorAll('.eliminarUnProducto').forEach(btn =>{
    btn.addEventListener('click', (e) => { 
        eliminarUnProducto(btn.value)
    })
})

/*Evento eliminar todos los productos*/
document.querySelectorAll('.eliminar-producto').forEach(btn =>{
    btn.addEventListener('click', (e) => {
        eliminarProducto(btn.value)
    })
})

}

/*Elimina un producto en el carrito*/
function eliminarUnProducto(indice){
    const productosDelStorage = JSON.parse(localStorage.getItem('carrito'))
    let index = productosDelStorage.findIndex(producto => producto.id == indice );   
            if(productosDelStorage[index].cantidad > 0) {
                productosDelStorage[index].cantidad--
                localStorage.setItem('carrito', JSON.stringify(productosDelStorage))
                       calcularMonto()
                
            }   
            
            if(productosDelStorage[index].cantidad==0){
               document.getElementById(`card${indice}`).remove()
               productosDelStorage.splice(index,1)
               localStorage.setItem('carrito',JSON.stringify(productosDelStorage))
               calcularMonto()
               mostrarCantidadProductos(productosDelStorage)
              
            }  
            
}

/*Evento boton carrito*/
btnCarrito.addEventListener('click', () => { 
    document.getElementById('finalizarCompra').style.visibility = "visible";
    document.getElementById('cerrar').style.visibility = "visible";
    document.getElementById('iniciarCompra').style.visibility = "hidden";
    calcularMonto()
})

/*Evento finalización de la compra*/ 
document.getElementById('finalizarCompra').addEventListener('click', (e) => {
    Swal.fire({
        icon: 'question',
        title: '¿Desea confirmar su compra?',
        text: `Precio total $${new Intl.NumberFormat("es-CO").format(calcularMonto())}`,
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

