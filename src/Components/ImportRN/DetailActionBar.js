import { StyleSheet, View, Text, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export function DetailActionBar({ editAction, deleteAction, disabled=false, editing=false}) {
  const navigation = useNavigation();
  return (
    <View style={styles.buttons}>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => navigation.goBack()}
        
      >
        <Text style={styles.textStyle}>
          Fechar
          <Icon name="close-circle-outline" color="white" type="ionicon"/>
        </Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.buttonEdit]}
        onPress={() => editAction()}
        disabled={disabled}
      >
        <Text style={styles.textStyle}>{editing?"Confirmar":"Editar"}</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.buttonDelete]}
        onPress={() => deleteAction()}
        disabled={disabled}
      >
        <Text style={styles.textStyle}>Excluir</Text>
      </Pressable>
    </View>
  );
}

export function ListActionBar({insertScreen, insertText, disabled=false}) {
  const navigation = useNavigation();
  return (
      <View style={styles.oneButton}>
        <Pressable
          style={[styles.button, styles.buttonInsert]}
          onPress={() => navigation.navigate(insertScreen)}
          disabled={disabled} 
        >
          <Text style={styles.textStyle}>
            {insertText}
          </Text>
        </Pressable>
      </View>
  );
}

const styles = StyleSheet.create({
  buttons: {
    // flex:1,
    flexDirection: "row",
    backgroundColor: "lightgrey",
    paddingVertical: 10,
    padding: "5%",
    // marginHorizontal: 0,
    // paddingHorizontal: 15
    borderBottomWidth: 1,
    borderBottomColor:"black",
    marginBottom:15
  },

  
  oneButton: {
    alignItems:"center",
   
    width:"100%",
    paddingVertical:6,
    paddingStart:10,  
    elevation:0,
    marginBottom:5
  },
  button: {
    // borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
    fontSize: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonEdit: {
    backgroundColor: "#123512",
    paddingHorizontal: 20,
  },

  buttonClose: {
    backgroundColor: "#5000ff",
    paddingHorizontal: 20,
  },
  buttonDelete: {
    backgroundColor: "#ff3000",
  },

  buttonInsert: {
    backgroundColor: "#503fff",
    paddingHorizontal: 20,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
