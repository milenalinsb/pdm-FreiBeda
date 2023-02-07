import { ScrollView, TouchableOpacity } from "react-native";
import { NavigationProps } from "../types/navigation";
import { Back } from "../components/Back";
import { Formik } from "formik";
import createValidator from "class-validator-formik";
import { ProjetosDTO } from "../dtos/projetos.dto";
import { api } from "../services/api";
import { getToken } from "../services/asyncStorage";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { AxiosError } from "../types/axiosError";
import { Box, Center, FormControl, Heading, Input, VStack, Text } from "native-base";
import { Footer } from "../components/Footer";
import { Button } from "../components/Button";

type Props = {
    navigation: NavigationProps;
    route: any;
};


export const ProjetoOscEdit = ({ navigation, route }: Props) => {
    return (
        <>
            <TouchableOpacity
                onPress={() => navigation.navigate("Projetos", route.params)}
                activeOpacity={0.8}
            >
                <Back text="Projetos" />
            </TouchableOpacity>
            <ScrollView bg={"#FFF"}>
                <Formik
                    validate={createValidator(ProjetosDTO)}
                    initialValues={{
                        nome: "",
                        atividades: "",
                        impacto: "",
                        objetivo: "",
                        oscID: "",
                        patrocinadores: "",
                        responsavel: "",
                        valor: ""
                    }}
                    onSubmit={async (values, { resetForm, setErrors }) => {
                        try {
                            const token = await getToken("@token");
                            await api.put(
                                `/projetos/atualizarProjetos/${route.params.idProjeto}`,
                                {
                                    nome: values.nome,
                                    atividades: values.nome,
                                    impacto: values.nome,
                                    objetivo: values.nome,
                                    oscID: route.params.id,
                                    patrocinadores: values.patrocinadores,
                                    responsavel: values.responsavel,
                                    valor: values.valor
                                },
                                {
                                    headers: {
                                        authorization: token,
                                    },
                                }
                            );
                            resetForm();
                            Dialog.show({
                                type: ALERT_TYPE.SUCCESS,
                                title: "Atenção",
                                textBody: `Editado com sucesso`,
                                button: "Ok",
                                onPressButton() {
                                    navigation.navigate("ProjetosOsc", {
                                        ...route.params,
                                        paramPropKey: "paramPropValue",
                                    })
                                    Dialog.hide();
                                },
                            });
                        } catch (error) {
                            const data = error as AxiosError;
                            console.log(error)
                        }
                    }}
                >
                    {({
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                    }) => (
                        <Center w="100%">
                            <Box safeArea p="2" w="100%" maxW="300" py="1/4">
                                <Heading
                                    size="lg"
                                    color="coolGray.800"
                                    _dark={{
                                        color: "warmGray.50",
                                    }}
                                    fontWeight="semibold"
                                >
                                    Editar projeto
                                </Heading>
                                <VStack space={5} mt="5">
                                    <FormControl>
                                        <FormControl.Label>Nome</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("nome")}
                                            value={values.nome}
                                            placeholder="Nome do projeto"
                                            onChangeText={handleChange("nome")}
                                            type="text"
                                        />
                                        {errors.nome && touched.nome ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.nome}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Atividades</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("atividades")}
                                            value={values.atividades}
                                            placeholder="Atividades"
                                            onChangeText={handleChange("atividades")}
                                            type="text"
                                        />
                                        {errors.atividades && touched.atividades ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.atividades}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Impacto</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("impacto")}
                                            value={values.impacto}
                                            placeholder="Impacto do projeto"
                                            onChangeText={handleChange("impacto")}
                                            type="text"
                                        />
                                        {errors.impacto && touched.impacto ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.impacto}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Objetivo</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("objetivo")}
                                            value={values.objetivo}
                                            placeholder="Objetivo do projeto"
                                            onChangeText={handleChange("objetivo")}
                                            type="text"
                                        />
                                        {errors.objetivo && touched.objetivo ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.objetivo}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Patrocinadores</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("patrocinadores")}
                                            value={values.patrocinadores}
                                            placeholder="Patrocinadores"
                                            onChangeText={handleChange("patrocinadores")}
                                            type="text"
                                        />

                                        {errors.patrocinadores && touched.patrocinadores ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.patrocinadores}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Responsável</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("responsavel")}
                                            value={values.responsavel}
                                            placeholder="Responsável"
                                            onChangeText={handleChange("responsavel")}
                                            type="text"
                                        />

                                        {errors.responsavel && touched.responsavel ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.responsavel}
                                            </Text>
                                        ) : null}
                                    </FormControl>


                                    <FormControl>
                                        <FormControl.Label>Valor</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("valor")}
                                            value={values.valor}
                                            placeholder="Valor R$"
                                            onChangeText={handleChange("valor")}
                                            type="text"
                                        />

                                        {errors.valor && touched.valor ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.valor}
                                            </Text>
                                        ) : null}
                                    </FormControl>


                                    <Button onPress={handleSubmit} text={"Editar"} />
                                </VStack>
                            </Box>
                        </Center>
                    )}
                </Formik>
            </ScrollView>
            <Footer navigation={navigation} page={"Dashboard"} />
        </>
    );
};