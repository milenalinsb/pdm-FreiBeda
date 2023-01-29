import { Box, ScrollView } from "native-base";
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
      <AddBtn />
      <Footer navigation={navigation} page={"Dashboard"} />
    </>
  );
};
