/*FACTORIAL DE UN NÚMERO( n! ) 
El factorial de un número entero positivo se define como el producto de todos los números naturales anteriores o iguales a él.
Se escribe n!, y se lee "n factorial". (Por definición el factorial de 0 es 1: 0!=1)

Por ejemplo, 4! = 4.3.2.1 = 24
*/ 
let fact,numero; 
do{
   numero = prompt("Por favor, el número debe ser entero positivo");
}while(isNaN(numero) || numero<0 || !(numero%1==0))
        fact=1;
        if(numero ==0){
           fact=1
        }else{
            for(let i=1; i<=numero; i++){
             fact= fact * i;
            }
        }
        console.log(`El factorial de ${numero} es : ${fact}`)
    