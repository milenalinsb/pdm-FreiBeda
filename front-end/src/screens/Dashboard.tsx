import { Box, ScrollView } from "native-base";
import { TouchableOpacity } from "react-native";
import { AddBtn } from "../components/AddBtn";
import { Footer } from "../components/Footer";
import { OcsList } from "../components/OcsList";
import { NavigationProps } from "../types/navigation";

export const Dashboard = ({ navigation }: NavigationProps) => {
  return (
    <>
      <ScrollView bg={"#ffffff"}>
        <Box marginTop={15}>
          <OcsList
            navigation={navigation}
            navigate={function (arg0: string, params: any): unknown {
              throw new Error("Function not implemented.");
            }}
          />
        </Box>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("OscForme");
        }}
        activeOpacity={0.8}
      >
        <AddBtn />
      </TouchableOpacity>
      <Footer navigation={navigation} page={"Dashboard"} />
    </>
  );
};
