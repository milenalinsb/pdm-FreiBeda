import { ScrollView } from "native-base";
import { Footer } from "../components/Footer";
import { NavigationProps } from "../types/navigation";

export const Notifications = ({ navigation }: NavigationProps) => {
  return (
    <>
      <ScrollView bg={"#ffffff"}></ScrollView>
      <Footer navigation={navigation} page={"Notifications"} />
    </>
  );
};
