
import {Queso, Fiambre} from "./clases.js"
/* Ingresar productos en el carrito*/
const carrito = [];
const imgQueso = ['img/img3.png','img/imag2.png','img/img6.jpg'];
const imgFiambre = ['img/img.webp','img/img4.jpg','img/img5.jpg']
let  idProducto, nombreQueso, nombreFiambre, precioQueso, precioFiambre,tipoQueso,img;
let j = 0;
let i = 0;
do{
    idProducto = parseInt(prompt("Ingrese producto: \n<0> => Queso \n<1> => Fiambre  \n<2> => Salir "));
    
 switch(idProducto){
           case 0:
                 nombreQueso = prompt("ingrese el nombre del queso a comprar");
                 precioQueso = parseFloat(prompt(`ingrese el precio del ${nombreQueso}`));
                 tipoQueso = prompt(`ingrese el tipo de Queso ${nombreQueso}`);
                 const queso = new Queso(nombreQueso,precioQueso,tipoQueso,imgQueso[i]);
                
                 (i<2) ? i++ : i=0;
                 carrito.push(queso);
                break;
               
           case 1: 
                 nombreFiambre = prompt("ingrese el nombre del fiambre a comprar"); 
                 precioFiambre = parseFloat(prompt(`ingrese el precio del ${nombreFiambre}`));  
                 const fiambre = new Fiambre(nombreFiambre,precioFiambre,imgFiambre[j]);
                
                 (j<2) ? j++ : j=0;
                 carrito.push(fiambre);
                 break;
           case 2:
                  alert("Finalizo carga del carrito");
                  //cargarCarrito(carrito) 
               
                  cargaHTML(carrito)       
                 
 }
 
}while(idProducto <= 0 || idProducto == 1 || idProducto > 2)

function cargaHTML(carrito){
    let card=document.getElementById('inicio');
    
    
    carrito.forEach(item => {
        card.innerHTML+=`
        
        <div class="col mb-5">
        <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" src="${item.img}" alt="${item.nombre}" style="max-width:300px;" />
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
                <div class="text-center"><a class="btn btn-outline-danger mt-auto" href="#">Eliminar</a></div>
            </div>
        </div>
         
           <!-- 
                   <div class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image
                            <div class="card" style="width: 18rem; margin: 5px;">
                                    <img src="#" class="card-img-top" alt="${item.nombre}">
                                <!-- Product details
                                <div class="card-body p-4">
                                   <div class="text-center">
                                       <!-- Product name
                                       <h5 class="fw-bolder">${item.nombre}</h5>
                                      <!-- Product price
                                       $ ${item.precio}
                                    </div>
                                </div>
                                 <!-- Product actions
                               <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Eliminar</a></div>
                               </div>
                            </div>
                        </div>
                    </div> 
           
        -->
        `
    })

    document.body.classList.remove('d-none')
}
/*Carga carrito*/
function cargarCarrito(card){
    if(card.length==0){
        alert("El carrito esta vacio")
    }else{
        alert("Listado de productos en el carrito \n");
        let description = ""
        card.forEach((item,index) => {
            
           if (item.tipo != undefined){
            description+=`${++index} Queso: ${item.nombre}\n  Precio: $${item.precio}\n  Tipo: ${item.tipo}\n`;
           }else{
            description+=`${++index} Fiambre : ${item.nombre}\n  Precio: $${item.precio} \n`
           } 
            });
            alert(description);
        let total = card.reduce((add,e) => add + e.precio, 0)
        alert(`Total de la compra= $ ${total}`);
    }
}

