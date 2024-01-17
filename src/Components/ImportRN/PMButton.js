import React from "react";

import {View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export function PMButton({
  styleBtn = 'default',
  text,
  setter,
  BtnWidth=180,
  BtnHeight=55,
  fontSize=20,
  shadow=true}){

    const shadowBtn = {
      elevation: 5,
      shadowColor: 'black'
    }

  if(shadow) {
    var styledBtn = StyleSheet.create({
      height:BtnHeight,
      width: BtnWidth,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      color: 'black',
      backgroundColor:'white',
      ...shadowBtn,
    })
  } else{
    var styledBtn = StyleSheet.create({
      height:BtnHeight,
      width: BtnWidth,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      color: 'black',
      backgroundColor:'white',
  })
  }



  const purpleBtn = {
    ...styledBtn,
    backgroundColor: '#5000FF',
    borderWidth:2,
    borderColor:'#5000FF'
  }

  const whiteBtn = {
    ...styledBtn,
    backgroundColor:'white',
    borderWidth:2,
    borderColor:'#5000FF'
  }
  const fontStyle = StyleSheet.create({
    fontSize:fontSize,
    color:'black',
    // fontFamily:'PoppinsRegular',
    marginTop:3
  })

  if (styleBtn === 'white'){
    return (
        <TouchableOpacity style={{...whiteBtn, marginTop:5}} onPress={ () => {setter()} }>
          <Text style={fontStyle}>{text}</Text>
        </TouchableOpacity>
    );
  }
  else if (styleBtn === 'list'){
    return (
        <TouchableOpacity style={{...purpleBtn, marginTop:5}} onPress={ () => {setter()} }>
          <Text style={{ fontSize:fontSize, color:'white'}}>{text}</Text>
        </TouchableOpacity>
    );
  }

  return (
      <TouchableOpacity style={purpleBtn} onPress={ () => {
        if (setter !== undefined){
          setter()
        }
        } }>
        <Text style={{ fontSize:fontSize, color:'white', /*fontFamily:'PoppinsRegular',*/ marginTop:5}}>{text}</Text>
      </TouchableOpacity>

  );
}
