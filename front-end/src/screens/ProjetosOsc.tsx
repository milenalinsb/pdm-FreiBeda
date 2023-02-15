import { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Back } from "../components/Back"
import { NavigationProps } from "../types/navigation";
import { FlatList, ScrollView, Box, VStack, Text, HStack } from "native-base";
import { Footer } from "../components/Footer";
import { AddBtn } from "../components/AddBtn";
import { api } from "../services/api";
import { IProjetos } from "../types/projetos";
import { getToken } from "../services/asyncStorage";
import { theme } from "../theme";
import { FontAwesome, Octicons } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";

type Props = {
    navigation: NavigationProps;
    route: any;
}

export const ProjetosOsc = ({ navigation, route }: Props) => {
    const [projetos, setProjetos] = useState<IProjetos[]>([]);
    const handlingDelete = async (id: string) => {
        const token = await getToken("@token");
        await api.delete(`/projetos/deletarProjetos/${id}`, {
            headers: {
                authorization: token,
            },
        });
        const req = await api.get(
            `/projetos/buscarProjetos/${route.params.id}`,
            {
                headers: {
                    authorization: token,
                },
            }
        );
        setProjetos(req.data);
    };
    useEffect(() => {
        (async () => {
            const token = await getToken("@token");
            const data = await api.get("/projetos/buscarProjetos", {
                headers: {
                    authorization: token,
                },
            });
            setProjetos(data.data);
        })();
    });
    const handlingProjeto = (navigation: any, list: any) => {
        navigation.navigate("ProjetoOSC", list);
    };
    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Osc", route.params)
                }
                }>
                <Back text="OSC" />
            </TouchableOpacity>
            <ScrollView bg={"#ffffff"}>
                <FlatList
                    data={projetos}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            onPress={() => {
                                handlingProjeto(navigation, projetos[index]);
                            }}
                            activeOpacity={0.8}
                        >
                            <Box p={3} mx={10} my={2} flex={1}  w={"70%"} height={"1/2"} borderBottomWidth={0.5} borderBottomColor={"#C5C0DB"}>
                                <HStack space={[5, 5]} justifyContent={"space-between"}>
                                    <VStack space={[1, 2]}>
                                        <Text fontSize={24} color={`${theme.colors.primary[900]}`}>
                                            {item.nome}
                                        </Text>
                                        <Text fontSize={16} color={"#8A8894"}>
                                            {item.objetivo}
                                        </Text>
                                    </VStack>
                                    <HStack space={[5, 5]} justifyContent={"space-between"}>
                                        <TouchableOpacity onPress={() =>
                                            navigation.navigate("ProjetoOscEdit", {
                                                idProjeto: item.id,
                                                ...route.params,
                                            })
                                        }
                                        activeOpacity={0.8}>
                                        <FontAwesome
                                            name="pencil"
                                            color={"#c3c4ff"}
                                            size={30}
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
                            </HStack>
                        </Box>
                        </TouchableOpacity>
                    )}
            keyExtractor={(item) => item.id}
                ></FlatList>
            </ScrollView >
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("CadastrarProjetos", {
                        ...route.params
                    });
                }}
                activeOpacity={0.8}
            >
                <AddBtn />
            </TouchableOpacity>
            <Footer navigation={navigation} page={"Dashboard"} />
        </>
    )
}