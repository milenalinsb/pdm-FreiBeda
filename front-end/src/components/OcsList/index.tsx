import { Box, FlatList, Heading } from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { api } from "../../services/api";
import { getToken } from "../../services/asyncStorage";
import { NavigationProps } from "../../types/navigation";
import { IOsc } from "../../types/osc";
import { OcsItem } from "../OcsItem";

const randomHex = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

export const OcsList = ({ navigation }: NavigationProps) => {
  const [list, setLIst] = useState<IOsc[]>([]);

  useEffect(() => {
    (async () => {
      const token = await getToken("@token");
      const data = await api.get("/osc/buscarOrg", {
        headers: {
          authorization: token,
        },
      });
      setLIst(data.data.osc);
    })();
  });

  const handlingOsc = (navigation: any, list: any) => {
    navigation.navigate("Osc", list);
  };

  return (
    <>
      <Box
       bg={"#fff"}
       >
        <Heading fontSize="xl" p="4" pb="3">
          Organizações
        </Heading>
      </Box>
      <FlatList
        data={list}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              handlingOsc(navigation, list[index]);
            }}
            activeOpacity={0.8}
          >
            <OcsItem
              colorAvatar={randomHex()}
              index={index}
              key={item.id}
              data={item}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </>
  );
};
