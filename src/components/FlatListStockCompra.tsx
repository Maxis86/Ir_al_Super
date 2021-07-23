import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';

import { ListItem } from 'react-native-elements';


export const FlatListStockCompra = ({stockItem}:any) => {
   
    const valorTotal = stockItem.precio * stockItem.cantidad 

    return (

        
           <View>
            <ListItem bottomDivider 
                >
                <Image style= {styles.imagenProducto}
                 source={{
                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                  }} />
                <View style = {styles.infoCompra}>
                    <ListItem.Content style={styles.nombreCantidad}>
                        <ListItem.Title style = {styles.itemNombre}>{stockItem.id}</ListItem.Title>
                        <ListItem.Subtitle style={styles.itemCantidad}>X {stockItem.cantidad}</ListItem.Subtitle>
                    </ListItem.Content>
                    <Text style = {styles.itemPrecio}>$ {valorTotal} </Text>
                </View>
            
            </ListItem >

        </View>
    )
}

const styles = StyleSheet.create({
    
    itemNombre: {
        fontSize: 25,
        marginLeft: 5,
        marginTop:5
    },
    itemCantidad:{
        fontSize: 15,
        marginBottom: 5,
        marginLeft: 20
    },
    nombreCantidad :{
        marginVertical: 2
    },
    itemPrecio:{
        fontSize: 20,
        position: 'absolute',
        right:0,
        marginRight: 10
    },
    imagenProducto :{
        width: 50,
        height: 50,
        borderRadius: 15
    },
    infoCompra: {
        flex: 1,
        marginLeft: 5,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    }

});
