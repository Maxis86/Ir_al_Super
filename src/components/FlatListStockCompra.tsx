import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

export const FlatListStockCompra = ({stockItem}:any) => {
   
    return (
        <View style = {styles.card}>
            
             <Text style = {styles.itemText}>{stockItem.id}</Text>

             <Text >$ {stockItem.precio}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        backgroundColor: '#fbd3f5',
        padding: 10,
        flexDirection:'row',
        margin: 5,
    },
    itemText: {
        marginLeft: 10,
        fontSize: 18
    },

});
