import { Entypo, FontAwesome, Octicons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  FlatList,
  Flex,
  HStack,
  ScrollView,
  Spacer,
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { Back } from "../components/Back";
import { Footer } from "../components/Footer";
import { api } from "../services/api";
import { getToken } from "../services/asyncStorage";
import { randomHex } from "../services/randomHex";
import { IGovernanca } from "../types/governanca";
import { NavigationProps } from "../types/navigation";

type Props = {
  navigation: NavigationProps;
  route: any;
};

export const Governancas = ({ navigation, route }: Props) => {
  const [list, setList] = useState<IGovernanca[]>();

  const handlingDelete = async (id: string) => {
    const token = await getToken("@token");
    await api.delete(`/governanca/deletarGovernanca/${id}`, {
      headers: {
        authorization: token,
      },
    });
    const req = await api.get(
      `/governanca/buscarGovernancaOsc/${route.params.id}`,
      {
        headers: {
          authorization: token,
        },
      }
    );
    setList(req.data.governanca);
  };

  useEffect(() => {
    (async () => {
      const token = await getToken("@token");
      const req = await api.get(
        `/governanca/buscarGovernancaOsc/${route.params.id}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      setList(req.data.governanca);
    })();
  }, [route]);

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("Osc", route.params)}
        activeOpacity={0.8}
      >
        <Back text="Governança" />
      </TouchableOpacity>
      <ScrollView bg={"#ffffff"}>
        <FlatList
          data={list}
          renderItem={({ item, index }) => (
            <Box
              bg={index % 2 == 0 ? "#ffffff" : "#F8F8F8"}
              borderBottomWidth="1"
              borderColor={"#f5f3f3"}
              pl={["0", "4"]}
              pr={["0", "5"]}
              py="2"
            >
              <Box padding={6}>
                <HStack space={[2, 3]} justifyContent="space-between">
                  <Avatar bg={randomHex()} size="60">
                    {`${item.nome[0]}${item.nome[1]}`}
                  </Avatar>
                  <VStack>
                    <Text color="primary.900" bold>
                      {item.nome}
                    </Text>
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                    >
                      {item.cargo}
                    </Text>
                  </VStack>
                  <Spacer />
                  <Box>
                    <HStack space={[5, 5]} justifyContent="space-between">
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("Governancas", route.params);
                        }}
                        activeOpacity={0.8}
                      >
                        <FontAwesome
                          name={"pencil"}
                          size={30}
                          color={"#c3c4ff"}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          Dialog.show({
                            type: ALERT_TYPE.WARNING,
                            title: "Atenção",
                            textBody: `Tem certeza que gostaria de apagar ${item.nome}?`,
                            button: "Sim",
                            onPressButton() {
                              handlingDelete(item.id);
                              Dialog.hide();
                            },
                          });
                        }}
                        activeOpacity={0.8}
                      >
                        <Octicons name={"trash"} size={30} color={"#ee6868"} />
                      </TouchableOpacity>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            </Box>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>
      <Box bg={"#ffffff"} padding={6}>
        <Flex direction="row-reverse" mb="2.5" mt="1.5">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Governancas", route.params);
            }}
            activeOpacity={0.8}
          >
            <Avatar bg={"primary.900"} size="60">
              <Entypo name={"plus"} size={40} color={"#FFF"} />
            </Avatar>
          </TouchableOpacity>
        </Flex>
      </Box>
      <Footer navigation={navigation} page={"Dashboard"} />
    </>
  );
};
