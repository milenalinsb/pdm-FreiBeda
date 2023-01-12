import { Avatar, Box } from 'native-base';
import { theme } from '../../theme';
import { styles } from './style';

type Props = {
    textoNotificacao: String
}

export const Notification = ({textoNotificacao}: Props) => {
    return(
        <Box style={styles.notification}>
            <Avatar bg={theme.colors.primary[900]} size={"xl"} />
            <Box style={styles.notificationBackground}>
                {textoNotificacao}
            </Box>
        </Box>
    )
};