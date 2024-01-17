import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ListActionBar } from "./DetailActionBar";


function elementosHeader(colunas, item){
  colunas.map((coluna, index) => {
      return (
        <View 
         key={index}
         style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}} 
         >
          <Text
          style={{
            ...styles.columnsElements,
            fontWeight: coluna == "ID" ? "bold" : "regular",
            width:tamanhosTabela[index]
            }}>
              {item[index]}
           </Text>
            </View>
          )    
    })
}


// Componente Grid para exibição de 3 e 4 colunas
export function Grid({elementos, colunas, tamanhosTabela, telaDetalhe, telaInsert, textoInsert}){

  const navigation = useNavigation();
  
    const tableHeader = () => ( // Construtor do Cabeçalho das colunas
      <View style={styles.tableHeader}>
        {
          colunas.map((coluna, index) => {
            {
              return (
                <View 
                  key={index}
                  style={{...styles.columnHeader, width: tamanhosTabela[index]}} 
                  >
                  <Text style={styles.columnHeaderTxt}>{coluna}</Text>
                </View>
              )
            }
          })
        }
      </View>
    )

    const styles1 = { 
    colunaID: {
      width:tamanhosTabela[0],
      textAlign:"center",
      fontWeight:"bold"
    },
    coluna1: {
      width:tamanhosTabela[1],
      textAlign:"center",
    },
    coluna2: {
      width:tamanhosTabela[2],
      textAlign:"center",
    },
    coluna3: {
      width:tamanhosTabela[3],
      textAlign:"center",
    },
    coluna4: {
      width:tamanhosTabela.length == 5 ? tamanhosTabela[4]: "0%",
      textAlign:"center",
    }
    }
    
    return(
           <View style={ styles.container }>

        <ListActionBar
        insertScreen={telaInsert}
        insertText={textoInsert}/>

        <FlatList
            style={{width:"90%"}}
            ListHeaderComponent={tableHeader}
            stickyHeaderIndices={[0]}
            decelerationRate={'fast'}
            data={elementos}
            keyExtractor={(item, index) => index} // item mantém a key unica e não repete os dados
            extraData={elementos}
            renderItem={({item, index})=> {
              // console.log("--------------")
              // console.log("Item:")
              // console.log(item)
              // console.log("Index: ")
              // console.log(index)
              // console.log("OBJECT: ")
              // console.log(Object.values(item)[0])
              // console.log(Object.values(item)[1])
              // console.log(Object.values(item)[2])
              
              if(colunas.length == 3){
                return(
                  <TouchableOpacity onPress={()=>{navigation.navigate(telaDetalhe, {id: Object.values(item)[0]})}}>
                       <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
                            <Text style={{...styles1.colunaID, fontWeight:"bold"}}>{Object.values(item)[0]}</Text>
                            <Text style={styles1.coluna1}>{Object.values(item)[1]}</Text>
                            <Text style={styles1.coluna2}>{Object.values(item)[2]}</Text> 
                        </View>
                  </TouchableOpacity>
                )
              }
              else if(colunas.length == 4){
                return(
                  <TouchableOpacity onPress={()=>{navigation.navigate(telaDetalhe, {id: Object.values(item)[0]})}}>
                  <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
                  
                                     <Text style={{...styles1.colunaID, fontWeight:"bold"}}>{Object.values(item)[0]}</Text>
                                     <Text style={styles1.coluna1}>{Object.values(item)[1]}</Text>
                                     <Text style={styles1.coluna2}>{Object.values(item)[2]}</Text>
                                     <Text style={styles1.coluna3}>{Object.values(item)[3]}</Text>
                                     <Text style={styles1.coluna4}>{Object.values(item)[4]}</Text>
                                   
                                   </View>
                                   </TouchableOpacity>
                )
              }

            }
              //  (
                  
                    // <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
                    //                  <Text style={{...styles1.colunaID, fontWeight:"bold"}}>{Object.values(item)[0]}</Text>
                    //                  <Text style={styles1.coluna1}>{Object.values(item)[1]}</Text>
                    //                  <Text style={styles1.coluna2}>{Object.values(item)[2]}</Text>
                    //                  <Text style={styles1.coluna3}>{Object.values(item)[3]}</Text>
                    //                  <Text style={styles1.coluna4}>{Object.values(item)[4]}</Text>
                    //                </View>


                    // <View style={{...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white"}}>
                    //     <Text style={{...styles1.colunaID, width:tamanhosTabela[0]}}>{Object.values(item)[0]}</Text>
                    //     <Text style={{...styles1.coluna1, width:tamanhosTabela[1]}}>{Object.values(item)[1]}</Text>
                    //     <Text style={{...styles1.coluna2, width:tamanhosTabela[2]}}>{Object.values(item)[2]}</Text>
                    //     <Text style={{...styles1.coluna3, width:tamanhosTabela[3]}}>{Object.values(item)[3]}</Text>
                    //     <Text style={{...styles1.coluna4, width:tamanhosTabela[4]}}>{Object.values(item)[4]}</Text>
                    // </View>
                     
              // )
            }
            />
   </View>

            
              // elementosHeader(colunas, item)
           
           
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop:70
    },
    title:{
        fontSize:30,
    },

    tableHeader: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      backgroundColor: "#5000ff",
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      height: 50
    },
    tableRow: {
      flexDirection: "row",
      height: 40,
      alignItems:"center",
    },

    columnHeader: {
      width: "20%",
      justifyContent: "center",
      alignItems:"center"
    },
    columnHeaderTxt: {
      color: "white",
      fontWeight: "bold",
    },
    columnsElements:{
      alignItems: "center",
     
    },
    
  });








