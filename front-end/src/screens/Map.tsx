import { Box } from "native-base";
import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView from "react-native-maps";
import { Back } from "../components/Back";
import { Footer } from "../components/Footer";
import { NavigationProps } from "../types/navigation";

type Props = {
  navigation: NavigationProps;
  route: any;
};

export const Map = ({ navigation, route }: Props) => {
  useEffect(() => {
    (async () => {
    
    })();
  });

  return (
    <Box bg={"white"}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Osc", route.params)}
        activeOpacity={0.8}
      >
        <Back text="Voltar" />
      </TouchableOpacity>
      <MapView style={styles.map} />
      <Footer navigation={navigation} page={"Dashboard"} />
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "84%",
  },
});
