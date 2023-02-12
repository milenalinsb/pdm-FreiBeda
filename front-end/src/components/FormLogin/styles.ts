import { position } from "native-base/lib/typescript/theme/styled-system";
import { StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
    },
  
    icon:{
      width:'15%',
      height: 50,
      justifyContent: 'center',
      marginLeft: '85%',
      marginBottom:'-15%',
      position:'absolute'  
    },

    View:{
      position:'relative'
    },
    logo:{
      width:'100%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      marginTop: '-50%',
      marginBottom:42
    }
   
  });
  
