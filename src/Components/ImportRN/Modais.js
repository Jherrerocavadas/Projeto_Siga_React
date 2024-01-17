import { KeyboardAvoidingView, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { PMInputModal } from "./PMTextInput";
import { PMButton } from "./PMButton";
import ClickableDatePicker from "./ClickableDatePicker";

export function ModalBuscaEntity({
  id,
  labelID,
  modalVisible, 
  setModalVisible,
  children}){
      return (
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              setModalVisible(!modalVisible);
           }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={ styles.modalTitle}>{labelID}{parseInt(id)}</Text>
                {children}
              <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Fechar</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        </View>
        );   
 
}

export function ModalText({children}){
  return(
    <Text style={styles.modalText}>{children}</Text>
  )
}

export function ModalAlterarEntity({
  id,
  labelID,
  modalVisible, 
  setModalVisible,
  labelActionBtn,
  action,
  children

}){

  if(action == undefined){
    action = () =>{
        {console.warn("Sem ação definida para o modal")
    }}
}
    return (
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
         }}>
        <View style={styles.centeredView}>
          <KeyboardAvoidingView style={styles.modalViewEncolhida} behavior="padding">
              <Text style={ styles.modalTitle}>{labelID} {parseInt(id)}</Text>
              {children}
            <View style={styles.buttons}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Fechar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonDelete]}
              onPress={() => action()}>
              <Text style={styles.textStyle}>{labelActionBtn}</Text>
            </Pressable>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      </View>
      );   
}

export function FieldAlterarModal({labelModal, setter, valor, tipoInput}){
  return(
    <View style={styles.modalViewInput}>
        <Text style={ styles.modalText}>{labelModal}: </Text>
        <PMInputModal
        style={styles.modalInput}
        setter={setter}
        valor={valor}
        placeholderText={labelModal}
        tipoInput={tipoInput?tipoInput:"default"}
        />
      </View>
  )
}

export function DateFieldModal({labelModal, setter, valor}){
  return(
    <View style={styles.modalViewInput}>
      <Text style={ styles.modalText}>{labelModal}: </Text>
      <ClickableDatePicker 
          value={valor}
          setter={setter}
          display= "spinner"
          />
    </View>
  )
}

























export function ModalPessoa({statusDeletado, setStatusDeletado, modalVisible, 
    setModalVisible, id, nome, telefone, labelActionBtn, action}) {       
    if(action == undefined){
        action = () =>{
            {console.log("teste")
        }}
    }
    // console.log(statusDeletado)
    // if(statusDeletado){
        return (
            <View style={styles.centeredView}>
              <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
             }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  <Text style={ styles.modalTitle}>Pessoa: id {parseInt(id)}</Text>
                  <Text style={ styles.modalText}>Nome: {nome}</Text>
                  <Text style={ styles.modalText}>Telefone: {telefone}</Text>
                <View style={styles.buttons}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Fechar</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonDelete]}
                  onPress={() => action()}>
                  <Text style={styles.textStyle}>{labelActionBtn}</Text>
                </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          </View>
          );   
    // }
    // else{
    //     return (
    //         <View style={styles.centeredView}>
    //           <Modal
    //             animationType="fade"
    //             transparent={true}
    //             visible={modalVisible}
    //             onRequestClose={() => {
    //             setModalVisible(!modalVisible);
    //          }}>
    //         <View style={styles.centeredView}>
    //           <View style={styles.modalView}>
    //               Alert.alert(
    //                 "Sucesso!",
    //                 "Usuário excluído!"
    //               )
    //             <View style={styles.buttons}>
    //             <Pressable
    //               style={[styles.button, styles.buttonClose]}
    //               onPress={() => {setModalVisible(!modalVisible)
    //               setStatusDeletado(!statusDeletado)}}>
    //               <Text style={styles.textStyle}>Fechar</Text>
    //             </Pressable>
    //             </View>
    //           </View>
    //         </View>
    //       </Modal>
    //       </View>
    //       );   
    // }
    
      
}

export function ModalBuscaPessoa({modalVisible, 
  setModalVisible, id, nome, telefone}) {       
      return (
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              setModalVisible(!modalVisible);
           }}>
          <View style={styles.centeredView}>
            <View style={styles.modalBuscarView}>
                <Text style={ styles.modalTitle}>Pessoa: id {parseInt(id)}</Text>
                <Text style={ styles.modalText}>Nome: {nome}</Text>
                <Text style={ styles.modalText}>Telefone: {telefone}</Text>
              <View style={styles.buttons}>
              <PMButton styleBtn = 'list' BtnWidth={'80%'} BtnHeight={50} text ={"Fechar"} setter ={
                ()=>
                    setModalVisible(!modalVisible)    
                
                }/>

              </View>
            </View>
          </View>
        </Modal>
        </View>
        );   

}

export function ModalAlterarPessoa({modalVisible, setModalVisible, id, nome, setNome,
   telefone, setTelefone, labelActionBtn, action}) {


      
  if(action == undefined){
      action = () =>{
          {console.log("teste")
      }}
  }
      return (
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
              setModalVisible(!modalVisible);
           }}>
          <View style={styles.centeredView}>
            <KeyboardAvoidingView style={styles.modalViewEncolhida} behavior="padding">
                <Text style={ styles.modalTitle}>Pessoa: id {parseInt(id)}</Text>
                
                <View style={styles.modalViewInput}>
                  <Text style={ styles.modalText}>Nome: </Text>
                  <PMInputModal
                  style={ styles.modalInput}
                  setter={ setNome }
                  valor={ nome }
                  placeholderText="Pessoa"
                  tipoInput="default"
                  />
                </View> 

                <View style={styles.modalViewInput}>
                  <Text style={ styles.modalText}>Telefone: </Text>
                  <PMInputModal
                  style={ styles.modalInput}
                  setter={ setTelefone }
                  valor={ telefone }
                  placeholderText="Telefone"
                  tipoInput="phone-pad"
                  />
                </View> 

              <View style={styles.buttons}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Fechar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={() => action()}>
                <Text style={styles.textStyle}>{labelActionBtn}</Text>
              </Pressable>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
        </View>
        );   
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal:20,
    
  },
  modalView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:20,
    marginVertical:'60%',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalBuscarView: {
    width:300,
    height: 400,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:20,
    marginVertical:'60%',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  modalViewEncolhida: {
    height: 400,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  buttons: {
    flexDirection:"row",
    marginHorizontal: 30,
    // paddingHorizontal: 15
    
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginHorizontal: 10,
    fontSize:20,
    paddingHorizontal: 20
    
  },
    buttonClose: {
    backgroundColor: '#5000ff',
    paddingHorizontal: 20
  },
  buttonDelete: {
    backgroundColor: '#ff3000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight:"bold"
  },
  modalInput: {
   marginBottom: 15,
   textAlign: 'center',
   fontSize: 20,
   width:150,
   fontSize: 20,
   color:"#2f2f2f",
   borderBottomColor: 'black',
   borderBottomWidth: 1,
   alignItems: "center",
   justifyContent: "center",
  },
  modalViewInput:{
    flexDirection:"row",
  },
  });