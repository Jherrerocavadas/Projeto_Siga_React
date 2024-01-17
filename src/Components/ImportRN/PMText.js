import {Text, View, TouchableOpacity} from 'react-native';
import { useFonts } from 'expo-font';

export function PMText({
    weight='Regular',
    size=size?size:20,
    textColor='black',
    heightLine='',
    children,
    }) {

    // let [fontsLoaded] = useFonts({
    //   PoppinsLight: require('../../assets/fonts/Poppins-Light.ttf'),
    //   PoppinsRegular: require('../../assets/fonts/Poppins-Regular.ttf'),
    //   PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
    //   PoppinsBold: require('../../assets/fonts/Poppins-Medium.ttf'),
    //   PoppinsBlack: require('../../assets/fonts/Poppins-Bold.ttf'),
    // })

    let line = {}

    if(heightLine != '') {
      line = {
        lineHeight:heightLine
      }
    }

    const styleText = {
      // fontFamily:`Poppins${weight}`,
      fontSize:size,
      color:textColor,
      ...line
    }

  return (
    <Text style={styleText}>{children}</Text>
  );
}

export function PMTextLink({texto, link,funcLink}) {
  const styles = {
    container:
    {
      position: "relative",
      bottom:10,
      flexDirection: "row",
      marginVertical:20,
    },
    textStyle:{
      fontSize: 15,
    },

    textLink: {
      color:"#5000FF",
    },
  };

  return (
      <View style={styles.container}>
      <Text style={styles.textStyle}>{texto} </Text>
      <TouchableOpacity onPress={funcLink}>
          <Text style={[styles.textStyle, styles.textLink]}>{link}</Text>
      </TouchableOpacity>
      </View>
  );
}
