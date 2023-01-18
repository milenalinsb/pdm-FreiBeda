import { Box, ScrollView } from 'native-base';
import { Person } from '../components/Person';
import { Header } from '../components/Header';

export const Governanca = () => {
    return(
        <ScrollView>
            <Header nome={'Cooperativa do Leite e Mel'}/>
            <Box m={5}>
                <Person nome={'Moacir'} funcao={'Gestor'} />
                <Person />
                <Person />
            </Box>
        </ScrollView>
    )
};
