import { Avatar, Text, Box } from 'native-base';
import { styles } from './style';
import { theme } from '../../theme';
import React from 'react';

type Props = {
    nome?: String,
    local?: String
}

const InfoProfile = ({ nome, local }: Props) => {
    return (
        <Box style={styles.infoProfile}>    
            <Text style={styles.nome}>{nome}</Text>
            <Text style={styles.local}>{local}</Text>
        </Box>
    )
};

export const Header = ({ nome, local }: Props) => {
    return (
        <Box style={styles.header}>
            <Avatar bgColor={theme.colors.primary[900]} />
            <InfoProfile nome={nome ? nome : 'Cooperativa'} local={local ? local : 'Município, UF'} />
        </Box>
    )
};