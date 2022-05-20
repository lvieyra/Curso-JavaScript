class Producto{
    
    constructor(nombre,precio){
        this.nombre = nombre
        this.precio = precio
    
    }
    
}

export class Fiambre extends Producto{
    constructor(nombre,precio){
        super(nombre,precio)
    }
 }

export class Queso extends Producto{
    constructor(nombre,precio,tipo){
        super(nombre,precio)
        this.tipo = tipo
    }
    
}
