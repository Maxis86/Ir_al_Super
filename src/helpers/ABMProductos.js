import firestore from '@react-native-firebase/firestore';


// delete form usuarios where id='xxx'
export const eliminarProducto = id =>{
  
  firestore().collection("Productos")
        .doc(id)
        .delete()
        .then(() => {
           console.log("Document successfully deleted!");
        }).catch((error) => {
          console.error("Error removing document: ", error);
        });

}

// insert into usuarios
export const agregarProducto = (producto) =>{
    
    const productosRef = firestore().collection("Productos");

    productosRef.doc(producto.nombreProducto).set({
        precio: producto.precioProducto, codigo: producto.codigoBarrasProducto})

}

// update usuarios set precio=....
export const editarPrecio = (id, nuevoPrecio) =>{
        console.log(id, nuevoPrecio)
        firestore().collection('Productos')
        .doc(id)
        .update({
            precio: nuevoPrecio
        })

}



