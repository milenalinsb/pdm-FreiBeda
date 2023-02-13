import { TouchableOpacity } from "react-native"
import { NavigationProps } from "../types/navigation"
import { Box, Center, CheckIcon, FormControl, Heading, Input, ScrollView, Select, Text, VStack } from "native-base"
import { Back } from "../components/Back"
import { Formik } from "formik"
import createValidator from "class-validator-formik"
import { BeneficiarioDTO } from "../dtos/beneficiario.dto"
import { getToken } from "../services/asyncStorage"
import { api } from "../services/api"
import { ALERT_TYPE, Dialog } from "react-native-alert-notification"
import { AxiosError } from "../types/axiosError"
import { Button } from "../components/Button"
import { useState } from "react"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"


type Props = {
    navigation: NavigationProps,
    route: any
}

export const BeneficiarioEdit = ({ navigation, route }: Props) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date: any) => {
        setSelectedDate(date);
        hideDatePicker();
    };
    return (
        <>
            <TouchableOpacity onPress={() => (
                navigation.navigate("BeneficiariosOsc", route.params)
            )}>
                <Back text="Beneficiários" />
            </TouchableOpacity>
            <ScrollView bg={"#fff"}>
                <Formik
                    validate={createValidator(BeneficiarioDTO)}
                    initialValues={{
                        nome: "",
                        sexo: "",
                        cor_Declarada: "",
                        is_Menor: "",
                        responsavel_Menor: "",
                        profissao: "",
                        renda_Mensal: ""
                    }}
                    onSubmit={async (values, { resetForm, setErrors }) => {
                        try {
                            const token = await getToken("@token");
                            const beneficiario = await api.post(
                                `/beneficiarios/atualizarBeneficiarios/${route.params.idBeneficiario}`,
                                {
                                    id: route.params.idBeneficiario,
                                    nome: values.nome,
                                    data_Nascimento: selectedDate,
                                    sexo: values.sexo,
                                    cor_Declarada: values.cor_Declarada,
                                    is_Menor: values.is_Menor,
                                    responsavel_Menor: values.responsavel_Menor,
                                    profissao: values.profissao,
                                    renda_Mensal: values.renda_Mensal,
                                    id_fk_projeto: route.params.id
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
                                textBody: "Criada com sucesso",
                                button: "Ok",
                                onPressButton() {
                                    navigation.navigate("BeneficiariosOsc", {
                                        ...route.params,
                                        paramPropKey: "paramPropValue",
                                    });
                                    Dialog.hide();
                                },
                            });
                        } catch (error) {
                            const data = error as AxiosError;
                            setErrors({
                                nome: data.response.data.message,
                            });
                            Dialog.show({
                                type: ALERT_TYPE.DANGER,
                                title: "Atenção",
                                textBody: data.response.data.message,
                                button: "Ok",
                            });
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
                                    Atualizar beneficiário
                                </Heading>
                                <VStack space={5} mt="5">
                                    <FormControl>
                                        <FormControl.Label>Nome</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("nome")}
                                            value={values.nome}
                                            placeholder="Nome do beneficiário"
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
                                        <FormControl.Label>Data de nascimento</FormControl.Label>
                                        <TouchableOpacity
                                            onPress={() => showDatePicker()}
                                            activeOpacity={0.8}
                                        >
                                            <Input
                                                isDisabled
                                                value={moment(selectedDate).format("DD/MM/YYYY")}
                                                type="text"
                                            />
                                        </TouchableOpacity>
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Sexo</FormControl.Label>
                                        <Select selectedValue={values.sexo} minWidth="200" accessibilityLabel="Choose Service" placeholder="Selecione" _selectedItem={{
                                            bg: "#8ADE48",
                                            endIcon: <CheckIcon size="2" />
                                        }} mt={1} onValueChange={handleChange("sexo")}>
                                            <Select.Item label="Feminino" value="f" />
                                            <Select.Item label="Masculino" value="m" />
                                        </Select>

                                        {errors.sexo && touched.sexo ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.sexo}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Cor declarada</FormControl.Label>
                                        <Select selectedValue={values.cor_Declarada} minWidth="200" accessibilityLabel="Choose Service" placeholder="Selecione" _selectedItem={{
                                            bg: "#8ADE48",
                                            endIcon: <CheckIcon size="2" />
                                        }} mt={1} onValueChange={handleChange("cor_Declarada")}>
                                            <Select.Item label="Branca" value="branca" />
                                            <Select.Item label="Preta" value="preta" />
                                            <Select.Item label="Parda" value="parda" />
                                            <Select.Item label="Amarela" value="amarela" />
                                        </Select>


                                        {errors.is_Menor && touched.is_Menor ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.is_Menor}
                                            </Text>
                                        ) : null}
                                        {errors.cor_Declarada && touched.cor_Declarada ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.cor_Declarada}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>O beneficiário é menor</FormControl.Label>
                                        <Select selectedValue={values.is_Menor} minWidth="200" accessibilityLabel="Choose Service" placeholder="Selecione" _selectedItem={{
                                            bg: "#8ADE48",
                                            endIcon: <CheckIcon size="2" />
                                        }} mt={1} onValueChange={handleChange("is_Menor")}>
                                            <Select.Item label="Sim" value="true" />
                                            <Select.Item label="Não" value="false" />
                                        </Select>

                                        {errors.is_Menor && touched.is_Menor ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.is_Menor}
                                            </Text>
                                        ) : null}
                                    </FormControl>
                                    <FormControl>
                                        <FormControl.Label>Responsável</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("responsavel_Menor")}
                                            value={values.responsavel_Menor}
                                            placeholder="Responsável"
                                            onChangeText={handleChange("responsavel_Menor")}
                                            type="text"
                                        />

                                        {errors.responsavel_Menor && touched.responsavel_Menor ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.responsavel_Menor}
                                            </Text>
                                        ) : null}
                                    </FormControl>


                                    <FormControl>
                                        <FormControl.Label>Profissão</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("profissao")}
                                            value={values.profissao}
                                            placeholder="Ex: agricultor"
                                            onChangeText={handleChange("profissao")}
                                            type="text"
                                        />

                                        {errors.profissao && touched.profissao ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.profissao}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <FormControl>
                                        <FormControl.Label>Renda mensal</FormControl.Label>
                                        <Input
                                            onBlur={handleBlur("renda_Mensal")}
                                            value={values.renda_Mensal}
                                            placeholder="R$ 1000,00"
                                            onChangeText={handleChange("renda_Mensal")}
                                            type="text"
                                        />

                                        {errors.renda_Mensal && touched.renda_Mensal ? (
                                            <Text color={"warning.500"} fontSize="xs">
                                                {errors.renda_Mensal}
                                            </Text>
                                        ) : null}
                                    </FormControl>

                                    <DateTimePickerModal
                                        textColor="#ffff"
                                        date={selectedDate}
                                        isVisible={datePickerVisible}
                                        mode="date"
                                        onConfirm={handleConfirm}
                                        onCancel={hideDatePicker}
                                    />

                                    <Button onPress={handleSubmit} text={"Atualizar"} />
                                </VStack>
                            </Box>
                        </Center>
                    )}
                </Formik>
            </ScrollView>
        </>
    )
}