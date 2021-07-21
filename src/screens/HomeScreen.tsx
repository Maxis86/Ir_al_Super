
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, StatusBar, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native'

import firestore from '@react-native-firebase/firestore';
// import {SwipeListView} from 'react-native-swipe-list-view'

import  Icon  from 'react-native-vector-icons/Ionicons'
import { FlatListStockItems } from '../components/FlatListStockItems'

import { HeaderTitle } from '../components/HeaderTitle'
import { useNavigation } from '@react-navigation/core'
import { FlatListStockCompra } from '../components/FlatListStockCompra';

export const HomeScreen = () => {

    const [proximaCompra, setProximaCompra] = useState([]);
    const navigation = useNavigation ();

    useEffect(() => {

        firestore().collection('ListaCompras').onSnapshot((snap) => {
        // se actualiza cada vez que hay un cambio

        const productos:any = [];

        snap.forEach((snapHijo) => {
            productos.push({
            id: snapHijo.id,
            ...snapHijo.data(),
            });
        });
        setProximaCompra(productos);
        
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

    const renderItem = ({ item }:any) => (
        // <HeaderTitle title={item.id} />
        <FlatListStockCompra stockItem={item}/>
      );
    return (
            
            <View>
            <Text>Home</Text>

            <TouchableOpacity 
                onPress={()=>navigation.navigate('NuevoProductoScreen')}
                // style={stylesHome.editarFoto}
            >
                <Icon
                    name= "arrow-redo"
                    color="grey"
                    size= {25}  
                />
            </TouchableOpacity>

            <View style = {{marginTop:30}}>
                    
                    {(proximaCompra)?
                    <View style={styles.container}>
                        {/* // <FlatList
                        //     data={proximaCompra}
                        //     renderItem={({item}) => (<FlatListStockItems stockItem={item}/>)}
                        //     keyExtractor={(item)=>item.id}
                        //     ListHeaderComponent={()=> 
                        //                             <View style={stylesHome.container}>
                        //                                 <Text style = {{flex:1, fontSize: 15}}>Producto</Text>
                        //                                 <Text style = {{marginRight: 22, fontSize: 15}}>Precio</Text>
                        //                                 <Text style = {{marginRight: 5, fontSize: 15}}>Editar</Text>
                        //                                 <Text style = {{fontSize: 15, marginBottom: 15}}>Borrar</Text>
                        //                             </View>
                        //                         } // por si quiero un título
                        //     ItemSeparatorComponent={()=>itemSeparator()}
                        // /> */}


                        <FlatList
                            data={proximaCompra}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                        
                    : null
                    }
                    
             </View>
    </View>
    )
}

const stylesHome = StyleSheet.create({

    container:{
        flexDirection:'row',
    }
});

const styles = StyleSheet.create({

    container:{
        // flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    }
});
