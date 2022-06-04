class Producto{
    
    constructor(id,nombre,marca,precio,stock,imagen){
        this.id = id
        this.nombre = nombre
        this.marca = marca
        this.precio = precio
        this.stock = stock
        this.imagen = imagen
    
    }


mostrarInformacion() {
    return `
    <div class="col mb-5">
    <div class="card h-100">
        <!-- Product image-->
         <img class="card-img-top" src="img/${this.imagen}" alt="${this.nombre}" style="max-width:300px;" />
       
        <!-- Product details-->
        <div class="card-body p-4">
            <div class="text-center">
                <!-- Product name-->
                <h5 class="fw-bolder">${this.nombre}</h5>
                <h5 class="fw-bolder">${this.marca}</h5>
                <h5 class="fw-bolder">Stock ${this.stock}</h5>
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
const productos = [];
export {Producto,productos} 