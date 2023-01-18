import { StyleSheet } from "react-native";
import { theme } from "../../theme";

export const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        height: 120,
        marginTop: 15
    },
    avatar: {
        backgroundColor: `${theme.colors.primary[900]}`,
        width: 120,
        height: 120
    },
    person_info: {
        flex: 0.8,
        height: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    nome: {
        fontWeight: '700',
        fontSize: 26,
        color: `${theme.colors.primary[900]}`,
        marginTop: 10
    },
    funcao: {
        fontWeight: '400',
        color: '#8B8D8F'
    }
});