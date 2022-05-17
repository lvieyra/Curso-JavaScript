/*Un negocio se dedica a la venta de computadoras. El vendedor tiene un sueldo mensual pero además de su sueldo 
gana una comisión por venta. * Si el monto de venta es mayor de 10000 la comisión será del 20%. * Si el monto de 
venta es mayor o igual a 5000 y mayor o igual  de 1000 la comisión es del 10%. * Si el monto de la venta es menor que 1000 
no tiene comisión.
*/
const comision = (monto, porcentaje) => monto * porcentaje;
function imprimir(sueldo,miComision,vendedor) {
    const sueldoTotal = (sueldo,miComision) => sueldo + miComision;
    console.log("*** Recibo de Sueldo del Vendedor ***");
    console.log(`Vendedor ${vendedor}`);
    console.log(`Sueldo $ ${sueldo}`);
    console.log(`Comision $ ${miComision}`);
    console.log(`Sueldo Total $ ${sueldoTotal(sueldo,miComision)}`)
}

function calcularSueldos(vendedor){
    let sueldo, montoVentas, miComision;
    do{
        sueldo = parseFloat(prompt("Ingrese Sueldo"));
        montoVentas = parseFloat(prompt("Ingrese Monto de Ventas"))
    }while(isNaN(sueldo) || sueldo<0 || isNaN(montoVentas) || montoVentas < 0)
        if(montoVentas> 10000){
           miComision= comision(montoVentas, 0.20); 
        }else if (montoVentas >=5000 || montoVentas>=1000) {
            miComision = comision(montoVentas, 0.10)
        }else{
            alert("No cobra comisión");
        }
        return imprimir(sueldo,miComision,vendedor); 
}
let vendedor;
do{
    vendedor = prompt("Ingrese el Nombre Vendedor");
}while(!isNaN(vendedor));

calcularSueldos(vendedor);




