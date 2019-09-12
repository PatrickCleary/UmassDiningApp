import React from 'react';
import { Text, StyleSheet, View } from 'react-native';


export default function header() {

    const headerStyle = StyleSheet.create({
        header: {
            fontFamily: 'Cochin',
            fontSize: 45,
            paddingTop: 17,
            color: '#85313b',
            borderBottomColor: 'black',

            borderStyle: 'solid',
        }

    })

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center' }}>
            <Text style={headerStyle.header}>
                Umass Dining

                </Text>


        </View>

    );

}