import { FlatList, Heading } from "native-base";
import { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { HomeContext, IContext } from "../../contexts/homeContext";
import { IContextValues, ValuesContex } from "../../contexts/valuesContext";
import { api } from "../../services/api";
import { getToken } from "../../services/asyncStorage";
import { NavigationProps } from "../../types/navigation";
import { IOsc } from "../../types/osc";
import { OcsItem } from "../OcsItem";

export const OcsList = ({ navigation }: NavigationProps) => {
  const [list, setLIst] = useState<IOsc[]>([]);

  const { setValor, valor } = useContext<IContext>(HomeContext);
  const { setValors } = useContext<IContextValues>(ValuesContex);

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

  return (
    <>
      <Heading fontSize="xl" p="4" pb="3">
        Organizações
      </Heading>
      <FlatList
        data={list}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Osc", list[index]);
            }}
            activeOpacity={0.8}
          >
            <OcsItem key={item.id} data={item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </>
  );
};
