import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
    card: {
        width: 160,
        height: 170,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: `${theme.colors.primary[900]}`,
        marginRight: 6,
        marginTop: 3
    },
    textoCard: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
        marginTop: 16
    }
})