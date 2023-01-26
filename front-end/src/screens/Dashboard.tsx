import { Box, ScrollView } from "native-base";
import { Footer } from "../components/Footer";
import { OcsList } from "../components/OcsList";
import { NavigationProps } from "../types/navigation";

//<Header
//nome="Cooperativa Terra e Vida - CTV"
//local="Recife, Pernambuco"
///>

export const Dashboard = ({ navigation }: NavigationProps) => {
  return (
    <>
      <ScrollView>
        <Box marginTop={15}>
          <OcsList/>
        </Box>
      </ScrollView>
      <Footer navigation={navigation} page={"Dashboard"} />
    </>
  );
};
