const baseDeDatos = [
    {
        id: 1,
        nombre: 'Queso Azul',
        precio: 700,
        imagen: './img/quesoAzul.png'
    },
    {
        id: 2,
        nombre: 'Lomo',
        precio: 1000,
        imagen: './img/lomo.jpg'
    },
    {
        id: 3,
        nombre: 'Salame Milan',
        precio: 400,
        imagen: './img/Salame.jpg'
    },
    {
        id: 4,
        nombre: 'Queso Pentagran',
        precio: 500,
        imagen: './img/quesoPentagran.jpg'
    }
];
class Carrito{
    constructor(productos){
        this.productos = productos;
    }
    agregarProducto(producto){
        this.productos.push(producto)
    }
}
class Producto{
    
    constructor(id,nombre,precio,imagen){
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen
    
    }
    
};
export{
    baseDeDatos,
    Producto,
    Carrito
}
