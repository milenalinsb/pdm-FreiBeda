import createValidator from "class-validator-formik";
import { Formik } from "formik";
import {
  Box,
  Center,
  FormControl,
  Heading,
  Input,
  Image,
  Text,
  VStack,
} from "native-base";
import { ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { LoginDto } from "../../dtos/login.dto";
import { api } from "../../services/api";
import { setToken,setUser } from "../../services/asyncStorage";
import { AxiosError } from "../../types/axiosError";
import { ILogin } from "../../types/login";
import { NavigationProps } from "../../types/navigation";
import { Button } from "../Button";
import { styles } from "./styles";
import { View,TextInput,TouchableOpacity } from "react-native";
import {Ionicons} from '@expo/vector-icons';
import React, {useState} from 'react';
import { convertError } from "class-validator-formik/dist/convertError";



export const FormLogin = ({ navigation }: NavigationProps) => {
  const[input,setInput] = useState('');
  const[hidePass, setHidePass] = useState(true);

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
            setToken(data.data.token, 24);
            const user = await api.get(`/usuarios/buscar/${data.data.id}`, {
              headers: {
                authorization: data.data.token,
              },
            });
            await setUser(JSON.stringify(user.data.usuario))
            navigation.navigate("Dashboard");
            resetForm();
          } catch (error) {
            const data = error as AxiosError;
            if (data.response.data.message === "Usuário não cadastrado.") {
              setErrors({
                email: "Usuário não cadastrado.",
              });
            } else if (data.response.data.message === "Senha está incorreta.") {
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
          <Box safeArea w="100%" py="8" px='8'>
            <View style={styles.logo}>
                <Image 
                  source={require('../../../assets/logo.png')} 
                  style={{width:130 ,height:130}} 
                />
              </View>

            <Heading 
              textAlign="center"
              size="lg"
              color="#4a4a4a"
              fontWeight="semibold"
             
            

            >
               SoliVida
            </Heading>

            <VStack space={3} mt="2"> 
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
                <View>
                { <Input
                  secureTextEntry={hidePass}
                  onBlur={handleBlur("password")}

                  value={values.password}
                  onChangeText={handleChange("password")}
                  type="password" 
                />
                 }
                  
                  <TouchableOpacity style={styles.icon} onPress={ () => setHidePass(!hidePass) }>
                   { hidePass ? 
                     <Ionicons name="eye" color="#8ADE48" size={25} />
                     :
                     <Ionicons name="eye-off" color="#8ADE48" size={25} />
                   }
                 </TouchableOpacity>
                
                </View>

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

