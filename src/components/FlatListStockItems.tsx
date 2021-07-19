import React, { useState } from 'react'
import { Modal, StyleSheet, Text, Pressable, Alert, TextInput, View, TouchableOpacity } from 'react-native';

import  Icon  from 'react-native-vector-icons/Ionicons'

import { editarPrecio, eliminarProducto } from '../helpers/ABMProductos'


export const FlatListStockItems = ({stockItem}:any) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [precio, setNuevoPrecio] = useState('')

    const onChange = (value: string ) =>{
        setNuevoPrecio(value)
    }

    const actualizar = (producto:any) => {
        setModalVisible(!modalVisible)
        editarPrecio(producto, precio)
    }

    return(
        <View style = {styles.card}>
                <View style = {styles.container}>

                    <Text style = {styles.itemText}>
                        {stockItem.id} 
                    </Text>

                        <View style={{flex:1, flexDirection:'row'}}/>

                            {/* Text Precio del Producto */}
                            <Text style={{marginLeft:25, marginRight: 38}}>$ {stockItem.precio}</Text>
                            
                            {/* Boton Editar Producto */}
                            <TouchableOpacity
                                onPress={() => setModalVisible(true)}
                                style={{ marginRight: 14}}
                            >
                                <Icon
                                    name= "create-outline"
                                    color="blue"
                                    size= {30}  
                                />
                            </TouchableOpacity>

                            {/* Alerta no se ingresaron todos los datos */}
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                setModalVisible(!modalVisible);
                                }}
                            >
                                <View style={styles.centeredView}>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Modificar Precio:</Text>
                                            <TextInput
                                                    //style ={stylesScreen.inputStyle}
                                                    placeholder= "$ Nuevo Precio"
                                                    autoCorrect={false} // no me va a corregir lo que escribí
                                                    autoCapitalize="words" 
                                                    onChangeText= {(value) => onChange(value)}
                                            />
                                        <View style = {{flexDirection: 'row'}}>
                                            <Pressable
                                                style={[styles.button, styles.buttonCancelar, {marginRight:15}]}
                                                onPress={() => setModalVisible(!modalVisible)}
                                                >
                                                <Text style={styles.textStyle}>Cancelar</Text>
                                            </Pressable>
                                            <Pressable
                                                style={[styles.button, styles.buttonClose]}
                                                onPress={() => actualizar(stockItem.id)}
                                                >
                                                <Text style={styles.textStyle}>Actualizar</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            
                            {/* Elmininar Producto */}
                            <TouchableOpacity
                                style={{ marginRight: 5}}
                                onPress = {() => eliminarProducto(stockItem.id)}
                            >
                                <Icon
                                    name= "trash-outline"
                                    color="red"
                                    size= {30}  
                                />      
                            </TouchableOpacity>
                        
                        </View>

                    <Text style = {{paddingLeft: 10}}>Código: {stockItem.codigo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: '#e2e9f1',
        padding: 5,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'center',
        fontSize: 15,
    },
    itemText: {
        marginLeft: 10,
        fontSize: 18
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonCancelar: {
        backgroundColor: "#3eb905",
        marginTop: 20
      },
      buttonClose: {
        backgroundColor: "#2196F3",
        marginTop: 20
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        
      },
      modalText: {
        marginBottom: 1,
        textAlign: "center"
      }
});
