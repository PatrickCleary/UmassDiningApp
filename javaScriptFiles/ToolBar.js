import React from 'react';
import Tools from './Tools'
import { Text, Alert, View, TouchableOpacity } from 'react-native';
import Test from './Test';


export default function ToolBar(props) {

    const divBordStyle = { borderSyle: 'solid', borderWidth: '1px', flex: 1, }

    return (
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#fff', borderTopColor: '#c4c4c4', borderTopWidth: '1px', borderTopStyle: 'solid' }}>


            <TouchableOpacity style={{ flex: 1, backgroundColor: (page === 1) ? '#e0e0e0' : '#fff' }} onPress={() => props.onChange(1)}>
                <Tools pageNum={1} title="search" name='search1' />
            </ TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, backgroundColor: (page === 2) ? '#e0e0e0' : '#fff' }} onPress={() => props.onChange(2)}>
                <Tools pageNum={2} title="fav" name='heart' />
            </ TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, backgroundColor: (page === 3) ? '#e0e0e0' : '#fff' }} onPress={() => props.onChange(3)}>
                <Tools pageNum={3} title="settings" name='setting' />
            </ TouchableOpacity >
        </View>

    );

}