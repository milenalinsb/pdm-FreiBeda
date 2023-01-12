import createValidator from "class-validator-formik";
import { Formik } from "formik";
import {
  Box,
  Center,
  FormControl,
  Heading,
  Input,
  Text,
  VStack,
} from "native-base";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { LoginDto } from "../../dtos/login.dto";
import { api } from "../../services/api";
import { setToken } from "../../services/asyncStorage";
import { AxiosError } from "../../types/axiosError";
import { ILogin } from "../../types/login";
import { NavigationProps } from "../../types/navigation";
import { Button } from "../Button";
import { styles } from "./styles";

export const FormLogin = ({ navigation }: NavigationProps) => {
  return (
    <Center style={styles.container} w="100%">
      <Formik
        validate={createValidator(LoginDto)}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values, { resetForm, setErrors }) => {
          try {
            const data = await api.post("/login", {
              email: values.email,
              senha: values.password,
            } as ILogin);
            setToken(data.data.token,24);
            navigation.navigate("Dashboard");
            resetForm();
          } catch (error) {
            const data = error as AxiosError;
            if (data.response.data.message === "Usuário não cadastrado.") {
              setErrors({
                email: "Usuário não cadastrado.",
              });
            } else if (data.response.data.message === "Senha está incorreta.") {
              console.log(data.response.data.message);
              setErrors({
                password: data.response.data.message,
              });
            } else {
              Dialog.show({
                type: ALERT_TYPE.DANGER,
                title: "Ops",
                textBody: "Ocorreu um erro inesperado",
                button: "Ok",
              });
            }
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
          <Box safeArea p="2" w="100%" maxW="290" py="8">
            <Heading
              size="lg"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
              fontWeight="semibold"
            >
              Bem-vindo
            </Heading>
            <Heading
              mt="1"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
              fontWeight="medium"
              size="xs"
            >
              Inscreva-se para continuar!
            </Heading>
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  onBlur={handleBlur("email")}
                  value={values.email}
                  onChangeText={handleChange("email")}
                />
                {errors.email && touched.email ? (
                  <Text color={"warning.500"} fontSize="xs">
                    {errors.email}
                  </Text>
                ) : null}
              </FormControl>
              <FormControl>
                <FormControl.Label>Senha</FormControl.Label>
                <Input
                  onBlur={handleBlur("password")}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  type="password"
                />
                {errors.password && touched.password ? (
                  <Text color={"warning.500"} fontSize="xs">
                    {errors.password}
                  </Text>
                ) : null}
              </FormControl>
              <Button onPress={handleSubmit} text={"Enviar"} />
            </VStack>
          </Box>
        )}
      </Formik>
    </Center>
  );
};
