import { styles } from './style';
import { Box, Text, Icon } from 'native-base';
import { FontAwesome,AntDesign } from '@expo/vector-icons';

type Props = {
    icon?: any,
    texto?: String
};

export const Card = ({ icon, texto }: Props) => {
    return (
        <Box style={styles.card}>
            <FontAwesome name={icon} size={72} color={"#FFF"} />
            <Text style={styles.textoCard}>{texto}</Text>
        </Box>
    )
};