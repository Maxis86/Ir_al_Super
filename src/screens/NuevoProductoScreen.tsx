import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { agregarProducto } from '../helpers/ABMProductos';

import firestore from '@react-native-firebase/firestore';

export const NuevoProductoScreen = ({navigation}:any) => {

    const [producto, setProducto] = useState({
        nombreProducto: '',
        precioProducto: '',
        codigoBarrasProducto: ''
    })

    const onChange = (value: string, field: string) =>{
        setProducto({
            ...producto,
            [field]:value
        })
    }

    const insertar = ()=>{
        if (producto.nombreProducto === '' || producto.precioProducto === '' || producto.codigoBarrasProducto === '')
        {
            Alert.alert(
                "Atención",
                "Es necesario que se llenen todos los campos",
                [
                  {
                    text: "Volver a Inicio",
                    onPress: () => navigation.pop()
                  },
                  { 
                    text: "OK", 
                    //onPress: () => console.log("OK Pressed") 
                  }
                ],
                {
                    cancelable: true,
                }
                
              );
        }
        else{
            agregarProducto(producto);
            navigation.pop()
        }
    }

//    const buscar = ()=>{

//         firestore().collection("cities").where("capital", "==", true)
//         .get()
//         .then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 // doc.data() is never undefined for query doc snapshots
//                 console.log(doc.id, " => ", doc.data());
//             });
//         })
//         .catch((error) => {
//             console.log("Error getting documents: ", error);
//         });

//     } 


    return (


        <View style = {stylesScreen.container}>

            <Text style = {stylesScreen.titulo}>Producto Nuevo:</Text>

                <TextInput
                    style ={stylesScreen.inputStyle}
                    placeholder= "Ingrese el producto"
                    autoCorrect={false} // no me va a corregir lo que escribí
                    autoCapitalize="words" 
                    onChangeText= {(value) => onChange(value, 'nombreProducto')}
                />

                <TextInput 
                    style ={stylesScreen.inputStyle}
                    placeholder= "Ingrese el Código de Barras"
                    autoCapitalize="none" 
                    onChangeText= {(value) => onChange(value, 'codigoBarrasProducto')}
                    keyboardType="number-pad"
                />

                <TextInput 
                    style ={stylesScreen.inputStyle}
                    placeholder= "Ingrese su precio"
                    autoCapitalize="none" 
                    onChangeText= {(value) => onChange(value, 'precioProducto')}
                    keyboardType="number-pad"
                />
            
                <TouchableOpacity
                    style = {stylesScreen.submitButton}
                    onPress={() => insertar()}
                >
                    <Text style = {stylesScreen.submitButtonText}>Insertar Producto</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    style = {stylesScreen.submitButton}
                    onPress={() => buscar()}
                >
                    <Text style = {stylesScreen.submitButtonText}>Buscar</Text>
                </TouchableOpacity> */}

        </View>
    )
}

const stylesScreen = StyleSheet.create({
    container:{

    },
    titulo:{
        backgroundColor: '#1386e4',
        padding: 10,
        margin: 15,
        height: 40,
        color: 'white'
    },
    inputStyle: {
        color: 'black',
        fontSize: 18,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20, 
        fontWeight: '600',
        paddingLeft: 20,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: 'black',
        paddingRight: 12,
    },
    submitButton:{
        backgroundColor: '#3913e4',
        padding: 10,
        margin: 15,
        height: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    submitButtonText:{
       color: 'white',
    }
});