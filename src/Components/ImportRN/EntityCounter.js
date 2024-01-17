import { ActivityIndicator, View, StyleSheet, TouchableOpacity } from "react-native"
import { PMText } from "./PMText"
export function EntityCounter({ label, counterValue, isLoading, isClickable, action }) {

  if (isLoading) {
    return (

      <View style={styles.counter}>
        <PMText textColor="white" size={18}>{label}: {
          <ActivityIndicator style={styles.loader} size="small" color="#5000ff" />
        }</PMText>

      </View>


    )
  }

  if (isClickable) {
    return (
     
        <View style={styles.counterPressable} >
           <TouchableOpacity style={styles.counter}
           activeOpacity={0.5}
           
        onPress={() => {
          if (action !== undefined) {
            action()
          }
        }}>
          <View>
          <PMText textColor="white" size={18}>{label}: {counterValue}</PMText>
          </View>
          </TouchableOpacity>
        </View>
     
    )

  }
  return (
    <View style={styles.counter}>
      <PMText textColor="white" size={18}>{label}: {counterValue}</PMText>
    </View>


  )
}

const styles = StyleSheet.create({
  counter: {
    flex: 1,
    //   width: 120,
    height: 120,
    flexDirection: "row",
    backgroundColor: '#999',
    borderRadius: 20,
    alignItems: 'center',
    //   justifyContent: 'center',
    paddingHorizontal: 5,
    marginHorizontal: 1,
    //   marginVertical: 10
  },
  counterPressable: {
    flex:1,
    height: 120,
    flexDirection: "row",
  }
});