import {Queso, Fiambre} from "./clases.js"
/* Ingresar productos en el carrito*/
const carrito = [];
let  idProducto, nombreQueso, nombreFiambre, precioQueso, precioFiambre,tipoQueso;
do{
    idProducto = parseInt(prompt("Ingrese producto: \n<0> => Queso \n<1> => Fiambre  \n<2> => Salir "));
 switch(idProducto){
           case 0:
                 nombreQueso = prompt("ingrese el nombre del queso a comprar");
                 precioQueso = parseFloat(prompt(`ingrese el precio del ${nombreQueso}`));
                 tipoQueso = prompt(`ingrese el tipo de Queso ${nombreQueso}`);
                 const queso = new Queso(nombreQueso,precioQueso,tipoQueso)
                 carrito.push(queso);
                break;
               
           case 1: 
                 nombreFiambre = prompt("ingrese el nombre del fiambre a comprar"); 
                 precioFiambre = parseFloat(prompt(`ingrese el precio del ${nombreFiambre}`));  
                 const fiambre = new Fiambre(nombreFiambre,precioFiambre);
                 carrito.push(fiambre);
                 break;
           case 2:
                  alert("Finalizo carga del carrito");
                  cargarCarrito(carrito)        
                 
 }
 
}while(idProducto <= 0 || idProducto == 1 || idProducto > 2)


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

