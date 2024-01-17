import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, TouchableOpacity, Text, Dimensions} from 'react-native';

export default function HeaderLogo() {
  return (

    <View style={styles.logoView}>
      <StatusBar style="light" backgroundColor="#5000FF"/>
      <Image style={styles.logo} source={require('../../assets/icon.png')}
      />
    </View>
  )
}

const {windowWd, windowHt} = Dimensions.get('screen')

const styles = StyleSheet.create({
  logoView: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width:300,
    height:300,
  },

  userIcon: {
    height:90,
    width:90,
    backgroundColor:"#5000FF",
    borderRadius:45,
    alignItems: "center",
    justifyContent: "center",
  },

});