class Producto{
    
    constructor(id,nombre,precio,stock,imagen){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.stock = stock
        this.imagen = imagen
    
    }
    mostrarInformacion() {
        return `
        <div class="col mb-5">
        <div class="card h-100">
            <!-- Product image-->
             <img class="card-img-top" src="${this.imagen}" alt="${this.nombre}" style="max-width:300px;" />
           
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <!-- Product name-->
                    <h5 class="fw-bolder">${this.nombre}</h5>
                    <!-- Product price-->
                    $ ${this.precio}
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
               <div class="text-center"><button value=${this.id} class="btn btn-outline-dark agregar-producto">Agregar</div>
            </div>
        </div>
        `
    }
   
};
const baseDeDatos = [
    {
        id: 1,
        nombre: 'Queso Azul',
        precio: 700,
        stock: 5,
        imagen: './img/quesoAzul.png'
    },
    {
        id: 2,
        nombre: 'Lomo',
        precio: 1000,
        stock: 10,
        imagen: './img/lomo.jpg'
    },
    {
        id: 3,
        nombre: 'Salame Milan',
        precio: 400,
        stock: 15,
        imagen: './img/Salame.jpg'
    },
    {
        id: 4,
        nombre: ' La Paulina Queso Danbo',
        precio: 500,
        stock: 10,
        imagen: './img/queso-danbo-la-paulina.png'
    }
];

const productos = [];
baseDeDatos.forEach(item => {
    productos.push(new Producto(item.id, item.nombre, item.precio, item.stock,item.imagen))
});
export default productos