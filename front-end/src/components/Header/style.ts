import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
    header: {
        margin: 20,
        width: "90%",
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#E3E3E3",
        borderBottomWidth: 2,
    },
    infoProfile: {
        flex: 0.9,
        height: 48,
        marginRight: 25
    },
    nome: {
        color: "#212121",
        fontSize: 18,
        fontWeight: "700"
    },
    local: {
        color: "#ADADB4",
        fontSize: 12
    }
});