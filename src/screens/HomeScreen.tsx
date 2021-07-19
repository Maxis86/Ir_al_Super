
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import firestore from '@react-native-firebase/firestore';

import  Icon  from 'react-native-vector-icons/Ionicons'
import { FlatListStockItems } from '../components/FlatListStockItems'

import { HeaderTitle } from '../components/HeaderTitle'
import { styles } from '../theme/appTheme'


export const HomeScreen = () => {

    const [productosStock, setProductoStock] = useState([]);

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

    const navigation = useNavigation ();

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

    return (
        
            <View style={styles.globalMargin}>
                
                <HeaderTitle title="Principal"/>

                <View style = {stylesHome.container}>

                    <Text style={stylesHome.title}>Ingresar Producto</Text>

                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('NuevoProductoScreen')}
                        style={stylesHome.editarFoto}
                    >
                        <Icon
                            name= "pencil-outline"
                            color="grey"
                            size= {25}  
                        />
                    </TouchableOpacity>


                </View>
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
       
    )
}

const stylesHome = StyleSheet.create({

    container:{
        flexDirection:'row',
    },
    title:{
        flex:1,
        fontSize:20,
        fontWeight: 'bold',
    },
    editarFoto:{
        marginLeft: 20
    }
});