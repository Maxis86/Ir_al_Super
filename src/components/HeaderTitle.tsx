import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


interface Props {
    title: string;
}

export const HeaderTitle = ({title}:Props) => {

    const {top} = useSafeAreaInsets();

    return (
            <View style={{marginTop: top+20, marginBottom: 20}}>
                <Text style={styles.title}>{title}</Text>
            </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize:35,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
