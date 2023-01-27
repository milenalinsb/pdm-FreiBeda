import { Avatar, Text, Box } from 'native-base';
import { styles } from './style';
import React from 'react';

type Props = {
    nome: String,
    local: String,
    sigla:String
}

const InfoProfile = ({ nome, local }: Props) => {
    return (
        <Box style={styles.infoProfile}>    
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.local}>{local}</Text>
        </Box>
    )
};

export const Header = ({ nome, local,sigla }: Props) => {
    return (
        <Box style={styles.header}>
            <Avatar  bg="green.500">
                {sigla}
            </Avatar>
            <InfoProfile sigla={sigla} nome={nome} local={local} />
        </Box>
    )
};