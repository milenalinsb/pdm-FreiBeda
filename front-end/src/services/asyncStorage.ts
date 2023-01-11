import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

export const getToken = async (kay: string) => {
  try {
    const value = await AsyncStorage.getItem(kay);
    const expire = await AsyncStorage.getItem("@expire");
    if (expire !== null) {
      console.log(expire);
      return value;
    } else {
      return null;
    }
  } catch (e) {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: "Ops",
      textBody: "Ocorreu um erro inesperado",
      button: "Ok",
    });
  }
};

export const setToken = async (value: string, expire: number) => {
  try {
    await AsyncStorage.setItem("@token", value);
    await AsyncStorage.setItem(
      "@expire",
      moment().add(expire, "hours").format()
    );
  } catch (e) {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: "Ops",
      textBody: "Ocorreu um erro inesperado",
      button: "Ok",
    });
  }
};
