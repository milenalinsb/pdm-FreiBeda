import React from "react";
import { FormLogin } from "../components/FormLogin";
import { NavigationProps } from "../types/navigation";

export const Login = ({ navigation }: NavigationProps) => {
    return(<>
    <FormLogin navigation={navigation} />
    </>)
}