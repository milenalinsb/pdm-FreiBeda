import { styles } from './style';
import { Avatar, Box, Text } from 'native-base';

type Props = {
    nome?: String,
    funcao?: String
}

const PersonInfo = ({nome, funcao}: Props) => {
    return(
        <Box style={styles.person_info}>
            <Text style={styles.funcao}>{funcao}</Text>
            <Text style={styles.nome}>{nome}</Text>
        </Box>
    )
}

export const Person = ({nome, funcao}: Props) => {
    return(
        <Box style={styles.wrapper}>
            <Avatar style={styles.avatar} />
            <PersonInfo nome={nome ? nome : 'Nome'} funcao={funcao ? funcao : 'Função'} />
        </Box>
    )
}
