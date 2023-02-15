import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Avatar, Button, Text } from "native-base";
import React, { useState } from "react";
import { api, baseURL } from "../../services/api";
import { getToken, getUser } from "../../services/asyncStorage";
import { User } from "../../types/user";

export const AvatarPerfil = () => {
  const [user, setUser] = useState<User>();
  const [avatarUrl, setAvatarUrl] = useState(`${baseURL}/static/avatar.jpg`);
  const [imagesPath, setImagesPath] = useState<string[]>([]);
  const [name, setName] = useState("avatar");

  async function handleSelectImages() {
    const data = new FormData();
    const token = await getToken("@token");
   

    // tenho acesso a galeria de fotos e não a câmera
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    /* console.log(status); */
    if (status !== "granted") {
      // granted é quando o usuário deu permissão
      alert("Eita, precisamos de acesso às suas fotos...");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      // permite ao usuario editar a imagem (crop), antes de subir o app
      allowsEditing: true,
      quality: 1,
      //quero apensas imagems e não vídeo tb
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    /* console.log(result); */
    if (!result.canceled) {
      // se cancelou o upload da imagem
      // questão do conceito de imutabilidade. sempre que uma imagem for adicionado,
      //temos que copiar as imagens que tinha antes no array.
      //se não vai apagar na próxima renderização. pois começa sempre do zero
      setImagesPath([...imagesPath, result.assets[0].uri]);
      if (imagesPath != undefined) {
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            authorization: token,
          },
        };

        data.append("name", name);

        imagesPath.forEach((imageURI, index) => {
          data.append("images", {
            name: `${index}.jpg`,
            type: "image/jpg",
            uri: imageURI,
          } as any); // por que não tem formato definido. problema do react native que não tem o name da imagem
        });

        // const teste = await api.post(
        //   `/usuario/upload/${user.id as string}`,
        //   data,
        //   config
        // );
        //  console.log(teste);
      }
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const data = (await getUser("@user")) as unknown as User;
        setUser(JSON.parse(data as unknown as string));
        if (JSON.parse(data as unknown as string).avatar != null) {
          setAvatarUrl(
            `${baseURL}/static/${JSON.parse(data as unknown as string).avatar}`
          );
        }
      })();
    }, [])
  );

  return (
    <>
      <Avatar
        bg="cyan.500"
        size="200"
        source={{
          uri: avatarUrl,
        }}
      >
        HS
      </Avatar>
      <Button onPress={handleSelectImages}>Upload</Button>
      <Text marginTop={5} bold fontSize="20">
        {user?.username}{" "}
      </Text>
      <Text fontSize="15">{user?.email} </Text>
    </>
  );
};
