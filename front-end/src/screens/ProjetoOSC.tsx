import { useEffect, useState } from "react"
import { Back } from "../components/Back"
import { NavigationProps } from "../types/navigation"
import { Center, FlatList, ScrollView } from "native-base"
import { getToken } from "../services/asyncStorage"
import { api } from "../services/api"
import { Text, Box } from "native-base"
import { theme } from "../theme"
import { IProjetos } from "../types/projetos"
import { InfoBlock } from "../components/InfoBlock"
import { IBeneficiario } from "../types/beneficiario"

type Props = {
    navigation: NavigationProps,
    route: any
}

export const ProjetoOsc = ({ navigation, route }: Props) => {
    const [projeto, setProjeto] = useState<IProjetos[]>([]);
    const [beneficiarios, setBeneficiarios] = useState<IBeneficiario[]>([]);
    useEffect(() => {
        (async () => {
            const token = await getToken("@token");
            const data = await api.get(`/projetos/buscarProjetos/${route.params.id}`, {
                headers: {
                    authorization: token,
                },
            });
            setProjeto(data.data)
            const beneficiario = await api.get('/beneficiarios/buscarBeneficiarios', {
                headers: {
                    authorization: token
                }
            })
            setBeneficiarios(beneficiario.data.beneficiarios)
        })()
    });
    return (
        <>
            <Back text="Projetos" />
            <ScrollView backgroundColor="#fff" flex={1}>
                <Center>
                    <Text fontSize={32} color={`${theme.colors.primary[900]}`}>{projeto[0]?.nome}</Text>
                </Center>
                <Box m={10}>
                    <InfoBlock titulo={"Objetivo"} conteudo={projeto[0]?.objetivo} />
                    <InfoBlock titulo={"Atividades"} conteudo={projeto[0]?.atividades} />
                    <InfoBlock titulo={"Impacto"} conteudo={projeto[0]?.impacto} />
                    <InfoBlock titulo={"Responsável"} conteudo={projeto[0]?.responsavel} />
                    <InfoBlock titulo={"Valor"} conteudo={`R$ ${projeto[0]?.valor}`} />
                    <InfoBlock titulo={"Patrocinadores"} conteudo={projeto[0]?.patrocinadores} />
                    <InfoBlock titulo={"Beneficiários"} conteudo={
                        <FlatList data={beneficiarios} renderItem={({item, index}) => (
                            <Text>{item.nome}</Text>
                        )} />
                    }/>
                </Box>

            </ScrollView>
        </>)
}