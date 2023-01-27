import { ScrollView } from "native-base";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Notification } from "../components/Notification";
import { NavigationProps } from "../types/navigation";

export const Notifications = ({ navigation }: NavigationProps) => {
  return (
    <>
      <ScrollView>
      </ScrollView>
      <Footer navigation={navigation} page={"Notifications"} />
    </>
  );
};
