import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, TouchableOpacity, Alert, Modal, Pressable,TextInput } from 'react-native';
import { StyleSheet } from 'react-native'


import  Icon  from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';


import { FlatListStockItems } from '../components/FlatListStockItems'
import { HeaderTitle } from '../components/HeaderTitle'
import { agregarProducto } from '../helpers/ABMProductos';


export const NuevoProductoScreen = ({navigation}:any) => {

    const [productosStock, setProductoStock] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {

        firestore().collection('Productos').onSnapshot((snap) => {
        // se actualiza cada vez que hay un cambio

        const productos:any = [];

        snap.forEach((snapHijo) => {
            productos.push({
            id: snapHijo.id,
            ...snapHijo.data(),
            });
        });
        setProductoStock(productos);
        
        });
    }, []);

    const itemSeparator = () =>{
        return (
            <View style={{
                borderBottomWidth: 1,
                opacity: 0.4,
                marginVertical:8
            }}>
            </View>
        )
    }

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

    return (

        <View style={{flex:1}}>
 
            <View >
                            
                <HeaderTitle title="Mi lista de Productos"/>

                <TouchableOpacity
                        style = {stylesScreen.submitButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style = {stylesScreen.submitButtonText}>Nuevo</Text>
                </TouchableOpacity>

                {/* Modal Nuevo Producto */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={stylesModal.centeredView}>
                        <View style={stylesModal.modalView}>
                            <Text style={stylesModal.modalText}>Nuevo Producto</Text>
                            <TextInput
                                style ={stylesScreen.inputStyle}
                                placeholder= "Ingrese el producto"
                                autoCorrect={false} // no me va a corregir lo que escribí
                                autoCapitalize="words" 
                                onChangeText= {(value) => onChange(value, 'nombreProducto')}
                            />

                            <TextInput 
                                style ={stylesScreen.inputStyle}
                                placeholder= "Código de Barras"
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
                
                            <View style = {{flexDirection: 'row'}}>
                                <Pressable
                                    style={[stylesModal.button, stylesModal.buttonCancelar, {marginRight:15}]}
                                    onPress={() => setModalVisible(!modalVisible)}
                                    >
                                    <Text style={stylesModal.textStyle}>Cancelar</Text>
                                </Pressable>
                                <Pressable
                                    style={[stylesModal.button, stylesModal.buttonClose]}
                                    onPress={() => insertar()}
                                    >
                                    <Text style={stylesModal.textStyle}>Agregar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style = {{marginTop:30}}>
                    
                    {(productosStock)?
                        <FlatList
                            data={productosStock}
                            renderItem={({item}) => <FlatListStockItems stockItem={item}/>}
                            keyExtractor={(item)=>item.id}
                            ListHeaderComponent={()=> 
                                                    <View style={stylesHome.container}>
                                                        <Text style = {{flex:1, fontSize: 15}}>Producto</Text>
                                                        <Text style = {{marginRight: 22, fontSize: 15}}>Precio</Text>
                                                        <Text style = {{marginRight: 5, fontSize: 15}}>Editar</Text>
                                                        <Text style = {{fontSize: 15, marginBottom: 15}}>Borrar</Text>
                                                    </View>
                                                } // por si quiero un título
                            ItemSeparatorComponent={()=>itemSeparator()}
                        />
                    : null
                    }
                    
                </View>
                </View>
            </View>
    )
}

const stylesScreen = StyleSheet.create({

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
        height: 40,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    submitButtonText:{
       color: 'white',
    }
});

const stylesHome = StyleSheet.create({

    container:{
        flexDirection:'row',
    }
});

const stylesModal = StyleSheet.create({


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