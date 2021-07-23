
import React, { useEffect, useState } from 'react'
import { FlatList, Text, View, TouchableOpacity, ScrollView, TouchableWithoutFeedback, StatusBar, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import firestore from '@react-native-firebase/firestore';
// import {SwipeListView} from 'react-native-swipe-list-view'

import  Icon  from 'react-native-vector-icons/Ionicons'
import { FlatListStockCompra } from '../components/FlatListStockCompra';
import { Button } from 'react-native-elements';
import { HeaderTitle } from '../components/HeaderTitle';


export const HomeScreen = () => {

    const [proximaCompra, setProximaCompra] = useState([]);
    const navigation = useNavigation ();
    const [cantidad, setCantidad] = useState(0)

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


    const renderItem = ({ item }:any) => (
        // <HeaderTitle title={item.id} />
        <FlatListStockCompra stockItem={item}/>
      );
    return (
            
            <View style = {styles.container}>
                <View style = {styles.header}>
                    <HeaderTitle title="Mis Compras"/>
                   
                    <Button
                        onPress={()=>navigation.navigate('NuevoProductoScreen')}
                        icon={
                            <Icon
                            name="arrow-redo"
                            size={15}
                            color="white"
                            />
                        }
                        iconRight
                        title="Ir a mi stock "
                    />
                   
                </View>
                <View style = {{marginTop:30}}>
                        
                        {(proximaCompra)?
                        <View style={styles.containerFlatList}>
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

const styles = StyleSheet.create({
    container:{

    },
    header:{

    },
    titulo:{
        fontSize: 35
    },
    containerFlatList:{
        // flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        marginBottom:10
    },

});
