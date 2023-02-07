import { Avatar, Box, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { Divider } from 'native-base';
import { styles } from "./style";

type Props = {
  nome: String;
  local: String;
  sigla: String;
};

const randomHex = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

const InfoProfile = ({ nome, local }: Props) => {

  return (
    <Box style={styles.infoProfile}>
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.local}>{local}</Text>
      <Divider bg = "#F7F8FC" my={4} width={'200px'}/>
    </Box>
  );

};

export const Header = ({ nome, local, sigla }: Props) => {

  const [color,setColor]=useState("green.500")

  useEffect(()=>{
    setColor(randomHex())
  },[])

  return (
    <Box bg={"#ffffff"}>
      <Box style={styles.header}>
        <Avatar bg={color} marginRight={"1/6"} >{sigla}</Avatar>
        <InfoProfile sigla={sigla} nome={nome} local={local} />
      </Box>
      </Box>
  );
};


