class Producto{
    
    constructor(nombre,precio,img){
        this.nombre = nombre
        this.precio = precio
        this.img = img
    
    }
    
}

export class Fiambre extends Producto{
    constructor(nombre,precio,img){
        super(nombre,precio,img)
    }
 }

export class Queso extends Producto{
    constructor(nombre,precio,tipo,img){
        super(nombre,precio,img)
        this.tipo = tipo
    }
    
}
