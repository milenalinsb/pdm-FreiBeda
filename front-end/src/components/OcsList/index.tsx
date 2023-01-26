import { FlatList, Heading } from "native-base";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { getToken } from "../../services/asyncStorage";
import { IOsc } from "../../types/osc";
import { OcsItem } from "../OcsItem";

export const OcsList = () => {
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

  return (
    <>
      <Heading fontSize="xl" p="4" pb="3">
      Organizações
      </Heading>
      <FlatList
        data={list}
        renderItem={({ item }) => <OcsItem key={item.id} data={item} />}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </>
  );
};
