import { useEffect } from "react"
import { LogoWhite } from "../components/LogoWhite"
import { SplashContainer } from "../components/SplashContainer"
import { NavigationProps } from "../types/navigation";

export const Splash = ({ navigation }: NavigationProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate("Login");
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return(<>
    <SplashContainer>
        <LogoWhite height={200} width={200} />
    </SplashContainer>
    </>)
}