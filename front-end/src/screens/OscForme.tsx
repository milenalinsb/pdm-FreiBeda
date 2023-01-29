import createValidator from "class-validator-formik";
import { Formik } from "formik";
import moment from "moment";
import {
  Box,
  Center,
  FormControl,
  Heading,
  Input,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Back } from "../components/Back";
import { Button } from "../components/Button";
import { Footer } from "../components/Footer";
import { CadastrarOSCDTO } from "../dtos/osc.dto";
import { api } from "../services/api";
import { getToken } from "../services/asyncStorage";
import { AxiosError } from "../types/axiosError";
import { NavigationProps } from "../types/navigation";

export const OscForme = ({ navigation }: NavigationProps) => {
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
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        activeOpacity={0.8}
      >
        <Back text="Home" />
      </TouchableOpacity>
      <ScrollView bg={"#ffffff"}>
        <Formik
          validate={createValidator(CadastrarOSCDTO)}
          initialValues={{
            nome: "",
            sigla: "",
            publico_Alvo: "",
            missao: "",
            visao: "",
            logradouro: "",
            numero: "",
            cep: "",
            bairro: "",
            cidade: "",
            estado: "",
            referencia: "",
          }}
          onSubmit={async (values, { resetForm, setErrors }) => {
            try {
              const token = await getToken("@token");
              const endereco = await api.post(
                "/endereco/cadastrarEndereco",
                {
                  logradouro: values.logradouro,
                  numero: values.numero,
                  cep: values.cep,
                  bairro: values.bairro,
                  cidade: values.cidade,
                  estado: values.estado,
                  referencia: values.referencia,
                },
                {
                  headers: {
                    authorization: token,
                  },
                }
              );
              const ong = await api.post(
                "/osc/cadastrarOrg",
                {
                  nome: values.nome,
                  sigla: values.sigla,
                  data_Fundacao: selectedDate,
                  publico_Alvo: values.publico_Alvo,
                  missao: values.missao,
                  visao: values.visao,
                  endereco: {
                    id: endereco.data.id,
                  },
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
                  navigation.navigate("Home", {
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
                  Criar Organização
                </Heading>
                <VStack space={5} mt="5">
                  <FormControl>
                    <FormControl.Label>Nome</FormControl.Label>
                    <Input
                      onBlur={handleBlur("nome")}
                      value={values.nome}
                      placeholder="Nome da organização"
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
                    <FormControl.Label>Sigla</FormControl.Label>
                    <Input
                      onBlur={handleBlur("sigla")}
                      value={values.sigla}
                      placeholder="Sigla da organização"
                      onChangeText={handleChange("sigla")}
                      type="text"
                    />
                    {errors.sigla && touched.sigla ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.sigla}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Data da fundação</FormControl.Label>
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
                    <FormControl.Label>Público-alvo</FormControl.Label>
                    <Input
                      onBlur={handleBlur("publico_Alvo")}
                      value={values.publico_Alvo}
                      placeholder="Público-alvo da organização"
                      onChangeText={handleChange("publico_Alvo")}
                      type="text"
                    />
                    {errors.publico_Alvo && touched.publico_Alvo ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.publico_Alvo}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Missão</FormControl.Label>
                    <TextArea
                      onBlur={handleBlur("missao")}
                      value={values.missao}
                      placeholder="Missão da organização"
                      onChangeText={handleChange("missao")}
                      aria-label="t1"
                      autoCompleteType={""}
                      numberOfLines={4}
                      mb="5"
                    />

                    {errors.missao && touched.missao ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.missao}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Visão</FormControl.Label>
                    <TextArea
                      onBlur={handleBlur("visao")}
                      value={values.visao}
                      placeholder="Missão da visão"
                      onChangeText={handleChange("visao")}
                      aria-label="t1"
                      autoCompleteType={""}
                      numberOfLines={4}
                      mb="5"
                    />
                    {errors.visao && touched.visao ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.visao}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Logradouro</FormControl.Label>
                    <Input
                      onBlur={handleBlur("logradouro")}
                      value={values.logradouro}
                      placeholder="Logradouro da organização"
                      onChangeText={handleChange("logradouro")}
                      type="text"
                    />
                    {errors.logradouro && touched.logradouro ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.logradouro}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Nº</FormControl.Label>
                    <Input
                      onBlur={handleBlur("numero")}
                      keyboardType="numeric"
                      value={values.numero}
                      placeholder="Numero da organização o"
                      onChangeText={handleChange("numero")}
                    />
                    {errors.numero && touched.numero ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.numero}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>CEP</FormControl.Label>
                    <Input
                      onBlur={handleBlur("cep")}
                      keyboardType="numeric"
                      value={values.cep}
                      placeholder="CEP da organização"
                      onChangeText={handleChange("cep")}
                    />
                    {errors.cep && touched.cep ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.cep}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Bairro</FormControl.Label>
                    <Input
                      onBlur={handleBlur("bairro")}
                      value={values.bairro}
                      placeholder="Bairro da organização"
                      onChangeText={handleChange("bairro")}
                    />
                    {errors.bairro && touched.bairro ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.bairro}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Cidade</FormControl.Label>
                    <Input
                      onBlur={handleBlur("cidade")}
                      value={values.cidade}
                      placeholder="Cidade da organização"
                      onChangeText={handleChange("cidade")}
                    />
                    {errors.cidade && touched.cidade ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.cidade}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Estado</FormControl.Label>
                    <Input
                      onBlur={handleBlur("estado")}
                      value={values.estado}
                      placeholder="Estado da organização"
                      onChangeText={handleChange("estado")}
                    />
                    {errors.estado && touched.estado ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.estado}
                      </Text>
                    ) : null}
                  </FormControl>

                  <FormControl>
                    <FormControl.Label>Referencia</FormControl.Label>
                    <Input
                      onBlur={handleBlur("referencia")}
                      value={values.referencia}
                      placeholder="Referencia do endereço"
                      onChangeText={handleChange("referencia")}
                    />
                    {errors.referencia && touched.referencia ? (
                      <Text color={"warning.500"} fontSize="xs">
                        {errors.referencia}
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

                  <Button onPress={handleSubmit} text={"Criar"} />
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
