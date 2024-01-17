
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { Text, TouchableOpacity } from "react-native";






export default function ClickableDatePicker({
    value, 
    setter,
    display,
    mode="default",
    minimumDate=new Date(2000, 1, 1),
    timeZoneName="America/Sao_Paulo"}
    ){

    const style = {
        height:30,
        width:350,
        margin: 15,
        fontSize: 20,
        fontWeight: "bold",
        color:"black",
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    };

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setter(currentDate);
      };
    
      const showPicker = () => {
        DateTimePickerAndroid.open({
          value,
          onChange,
          display,
          minimumDate,
          timeZoneName,
          mode
        });
      };


      return(
        <TouchableOpacity onPress={showPicker}>
        <Text style={style}>{value.toLocaleDateString()}</Text>

        </TouchableOpacity>
       
      )


    //   <TouchableOpacity style={purpleBtn} onPress={ () => {
    //     if (setter !== undefined){
    //       setter()
    //     }
    //     } }>
    //     <Text style={{ fontSize:fontSize, color:'white', /*fontFamily:'PoppinsRegular',*/ marginTop:5}}>{text}</Text>
    //   </TouchableOpacity>
    //   <PMButton BtnWidth={'50%'} BtnHeight={50} text ={"Data compra"} styleBtn="white" setter ={()=>{
    //     showPicker()
    // }}/>
      

}