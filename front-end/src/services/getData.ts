import AsyncStorage from "@react-native-async-storage/async-storage";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

export const getData = async (kay: string) => {
  try {
    const value = await AsyncStorage.getItem(kay);
    return value;
  } catch (e) {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: "Ops",
      textBody: "Ocorreu um erro inesperado",
      button: "Ok",
    });
  }
};
