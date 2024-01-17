import React from "react";
import {TextInput, StyleSheet } from 'react-native';
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";


export function PMInputCadastro(
    {valor, setter, placeholderText = "", tipoInput, maxInput, icone, posIcone, isTextoSeguro=false, isEditavel=true}
  ) {
  

    const error = {
      height:30,
      width:350,
      margin: 15,
      fontSize: 20,
      color:"red",
      borderBottomColor: '#000',
      borderBottomWidth: 1,
      alignItems: "center",
      justifyContent: "center",
  };

  return (

    <TextInput
      style={styles.input}
      onChangeText={setter}
      value={valor}
      error = {error}
      textColor = "gray"
      activeUnderlineColor= "red"
      placeholder= {placeholderText}
      keyboardType={tipoInput}
      maxLength= {maxInput}

      secureTextEntry = {isTextoSeguro}
      editable = {isEditavel}
      //Colocar as máscaras de input
      //Colocar esquema para alternar a máscara de senha
    />
  );
}

export function SearchDropDown({data, setSelected, fieldPlaceHolder, searchPlaceholder, onSelect, save, defaultOption}){

  const [colorTextSelected, setColorTextSelected] = useState(false)

  if(colorTextSelected){
    return(

      <SelectList
      data={data}
      setSelected={setSelected}
      inputStyles={{...styles.searchDropDownTexts, color:"black" }}
      boxStyles={styles.box}
      dropdownStyles={styles.dropdown}
      dropdownTextStyles={styles.searchDropDownTexts}
      placeholder={fieldPlaceHolder}
      searchPlaceholder={searchPlaceholder}
      onSelect={()=> onSelect}
      save={save}
      notFoundText="Sem dados"
      defaultOption={defaultOption}
      // dropdownShown={false}
      
      
    />
    )
  }
return(

  <SelectList
  data={data}
  setSelected={setSelected}
  inputStyles={styles.searchDropDownTexts}
  boxStyles={styles.box}
  dropdownStyles={styles.dropdown}
  dropdownTextStyles={styles.searchDropDownTexts}
  placeholder={fieldPlaceHolder}
  searchPlaceholder={searchPlaceholder}
  onSelect={()=>{
    setColorTextSelected(!colorTextSelected)
    if(onSelect !== undefined){
      onSelect()
    }
    
  }}
  
/>
)

}

export function PMInputModal(
  {style, valor, setter, placeholderText = "", tipoInput, maxInput, isTextoSeguro=false}
) {

  const error = {
    height:30,
    width:350,
    margin: 15,
    fontSize: 20,
    color:"red",
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
};

return (

  <TextInput
    style={{...style}}
    onChangeText={setter}
    value={valor}
    error = {error}
    textColor = "gray"
    activeUnderlineColor= "red"
    placeholder= {placeholderText}
    keyboardType={tipoInput}
    maxLength= {maxInput}

    secureTextEntry = {isTextoSeguro}
    //Colocar as máscaras de input
    //Colocar esquema para alternar a máscara de senha
  />
);
}


const styles = StyleSheet.create(
{

  input: {
    height:30,
    width:350,
    margin: 15,
    paddingStart:18,
    fontSize: 20,
    fontWeight: "bold",
    color:"gray",
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  box:{
    borderWidth:0,
    borderRadius:0,
    borderColor:"black",
    width:350,
    borderBottomWidth: 2,
    alignItems: "center",
  },

  dropdown:{
    borderColor: 'black',
    borderWidth: 2,
    borderTopWidth:0,
    borderTopLeftRadius:0,
    borderTopRightRadius:0

  },
  
  searchDropDownTexts:{
    fontSize: 20,
    fontWeight: "bold",
    color:"gray",
  }
}
)