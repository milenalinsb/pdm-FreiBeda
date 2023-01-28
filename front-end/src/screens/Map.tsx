import { Box } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Back } from "../components/Back";
import { Footer } from "../components/Footer";
import { api } from "../services/api";
import { getToken } from "../services/asyncStorage";
import { NavigationProps } from "../types/navigation";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  navigation: NavigationProps;
  route: any;
};

export const Map = ({ navigation, route }: Props) => {
  const [region, setRegion] = useState({
    latitude:-6.702519358552747,
    longitude: -38.48489647033116,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      const token = await getToken("@token");
      const endereco = await api.get(
        `/endereco/buscarEndereco/${route.params.endereco.id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      setRegion({
        latitude: endereco.data.latitude,
        longitude: endereco.data.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, [route]);

  return (
    <Box bg={"white"}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Osc", route.params)}
        activeOpacity={0.8}
      >
        <Back text="Voltar" />
      </TouchableOpacity>
      <MapView initialRegion={region}
      customMapStyle={mapStyle}
       style={styles.map}>
        <Marker coordinate={region}>
        <MaterialIcons name={"location-on"} size={60} color={"#4bf90b"} />
        </Marker>
      </MapView>
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

const mapStyle = [
  {
    featureType: "poi",
    elementType: "labels.icon",
    stylers: [
      {
        color: "#4bf90b",
      },
    ],
  },
];
