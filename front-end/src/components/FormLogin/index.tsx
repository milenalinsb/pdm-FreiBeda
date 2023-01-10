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
import { LoginDto } from "../../dtos/login.dto";
import { Button } from "../Button";
import { styles } from "./styles";

export const FormLogin = () => {
  return (
    <Center style={styles.container} w="100%">
      <Formik
        validate={createValidator(LoginDto)}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => console.log(values)}
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
                  <Text fontSize="xs">{errors.email}</Text>
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
                {errors.email && touched.email ? (
                  <Text fontSize="xs">{errors.password}</Text>
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
