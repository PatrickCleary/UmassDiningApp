import React from 'react';
import Tools from './Tools'
import {  View, TouchableOpacity } from 'react-native';
import * as Constants from './Constants';

export default function ToolBar(props) {

    return (
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: Constants.mainColor, borderTopColor: '#c4c4c4', borderTopWidth: '1px', borderTopStyle: 'solid' }}>


            <TouchableOpacity style={{ flex: 1, }} onPress={() => props.onChange(1)}>
                <Tools pageNum={1} title="search" name='search1' page = {page===1} />
            </ TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, }} onPress={() => props.onChange(2)}>
                <Tools pageNum={2} title="fav" name='heart' page = {page===2} />
            </ TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, }} onPress={() => props.onChange(3)}>
                <Tools pageNum={3} title="settings" name='setting' page = {page===3} />
            </ TouchableOpacity >
        </View>

    );

}