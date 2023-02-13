import { TouchableOpacity } from "react-native-gesture-handler"
import { Back } from "../components/Back"
import { NavigationProps } from "../types/navigation"
import { useEffect, useState } from "react"
import { IBeneficiario } from "../types/beneficiario"
import { api } from "../services/api"
import { getToken } from "../services/asyncStorage"
import { Avatar, FlatList, HStack, ScrollView, VStack, Text, Box, Spacer } from "native-base"
import { FontAwesome, Octicons } from "@expo/vector-icons";
import { theme } from "../theme"
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { AddBtn } from "../components/AddBtn"
import { Footer } from "../components/Footer"

type Props = {
    navigation: NavigationProps,
    route: any
}

export const BeneficiariosOsc = ({ navigation, route }: Props) => {
    const [beneficiarios, setBeneficiarios] = useState<IBeneficiario[]>([])
    useEffect(() => {
        (async () => {
            const token = await getToken("@token");
            const data = await api.get("/beneficiarios/buscarBeneficiarios", {
                headers: {
                    authorization: token
                }
            })
            setBeneficiarios(data.data.beneficiarios)
        })()

    }, [route])
    const handlingDelete = async (id: string) => {
        const token = await getToken("@token");
        await api.delete(`/beneficiarios/deletarBeneficiarios/${id}`, {
            headers: {
                authorization: token,
            },
        })
        .then(async () => {
            await api.get(`/beneficiarios/buscarBeneficiarios`, {
                headers: {
                    authorization:token
                },
            }).then(({ data }) => setBeneficiarios(data.beneficiarios));
        });
        
    }
    return (
        <>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Osc", route.params)
            }}>
                <Back text="OSC" />
            </TouchableOpacity>
            <ScrollView bg={"#ffffff"}>
                <FlatList
                    data={beneficiarios}
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
                                    <Avatar size="60" bg={`${theme.colors.primary[900]}`}>{item.nome.slice(0, 2)}</Avatar>
                                    <VStack>
                                        <Text color="primary.900" fontSize={20} bold>
                                            {item.nome}
                                        </Text>
                                        <Text
                                            color="coolGray.600"
                                            _dark={{
                                                color: "warmGray.200",
                                            }}
                                        >
                                            {item.profissao}
                                        </Text>
                                    </VStack>
                                    <Spacer />
                                    <Box>
                                        <HStack space={[5, 5]} justifyContent="space-between">
                                            <TouchableOpacity
                                                onPress={() => {
                                                    navigation.navigate("BeneficiarioEdit", {
                                                        idBeneficiario: item.id,
                                                        ...route.params,
                                                    });
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
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("CadastrarBeneficiario", {
                        idOsc: route.params.idOsc,
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