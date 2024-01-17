import { Alert, StyleSheet, Text, View } from "react-native"
import { PMInputCadastro } from "./PMTextInput"
import { PMButton } from "./PMButton"

export default function RetrieveDataById({setterId, valueId, searchAction}){
    return(
        <View style={styles.container}>     
        <Text style={styles.title}>Insira o ID do usuário:</Text>


        <PMInputCadastro
            setter={ setterId }
            valor={ valueId }
            placeholderText="ID"
            tipoInput="default"
          />

        <PMButton styleBtn = 'list' BtnWidth={'80%'} BtnHeight={50} text ={"Buscar"} setter ={
        searchAction
        }/>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal:20
    },
    title:{
        fontSize:30,
    },
    dados:{
      fontSize:20,
    }
    });