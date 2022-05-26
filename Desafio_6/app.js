import { 
    baseDeDatos,
    Producto,
    Carrito
} from './baseDatos.js'

const carrito = new Carrito([]);
const productos = [];
baseDeDatos.forEach(item => {
    productos.push(item)
    console.log(item)
});
cargaHTML(productos);
const btnsAgregarProducto = document.querySelectorAll('.agregar-producto')
btnsAgregarProducto.forEach(btn => {
    btn.addEventListener('click', (e) =>{
        agregarProductoAlCarrito(e.target.value);
        
    })
    })
function agregarProductoAlCarrito(itemId){

 const producto = baseDeDatos.find(producto => producto.id === Number(itemId))
 carrito.agregarProducto(producto)
 alert(` Se agrego ${producto.nombre} al carrito`)
 const resultado = document.getElementById('carrito')
 resultado.innerHTML = "";
 resultado.innerHTML+= `<ul class="list-group text-white"> `
 carrito.productos.forEach(a => resultado.innerHTML+= `<li class="list-group-item ">${a.nombre}</li>  `)
 
resultado.innerHTML+= `</ul>`
} 

function cargaHTML(carrito){
    let card=document.getElementById('inicio');
    
    carrito.forEach((item) => {
        card.innerHTML+=`
        
        <div class="col mb-5">
        <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" src="${item.imagen}" alt="${item.nombre}" style="max-width:300px;" />
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${item.nombre}</h5>
                    <!-- Product price-->
                    $ ${item.precio}
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
               <div class="text-center"><button value=${item.id}  class="btn btn-outline-danger agregar-producto">Agregar</div>
                <div class="text-center"><a class="btn btn-outline-danger mt-auto" href="#">Eliminar</a></div>
            </div>
        </div>
        `
    })

}