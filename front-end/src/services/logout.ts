import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { api } from "./api";
import { getToken,deletToken } from "./asyncStorage";

type Pros={
    navigation:any;
}

export const logout = async ({navigation}:Pros) => {
    try {
        const token = await getToken("@token")
        await api.get("/logout",{
            headers:{
                authorization:token
            }
        })
        await deletToken();
        navigation.navigate("Login")
    } catch (error) {
        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title: "Ops",
            textBody: "Ocorreu um erro inesperado",
            button: "Ok",
          });
    }
}