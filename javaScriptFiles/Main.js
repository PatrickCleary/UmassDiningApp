import React from 'react';
import {  View, } from 'react-native';
import ToolBar from './ToolBar';
import CenterPiece from './CenterPiece';


export default function Main(props) {




    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
            <CenterPiece   style={{ paddingTop: '5%' }} changePage={(pageNum) => props.onChange(pageNum)} pageNum={props.pageNum} />

            <ToolBar onChange={(pageNum) => props.onChange(pageNum)} page={props.page} />
        </View>

    );

}