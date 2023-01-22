import { AvatarPerfil } from "../components/AvatarPerfil";
import { Footer } from "../components/Footer";
import { PerfilContainer } from "../components/PerfilContainer";
import { NavigationProps } from "../types/navigation";

export const Perfil = ({ navigation }: NavigationProps) => {
  return (
    <>
    <PerfilContainer>
      <AvatarPerfil />
    </PerfilContainer>
      <Footer navigation={navigation} page={"Perfil"} />
    </>
  );
};
