import { createContext } from "react";

export type IRoutesContexts = {
  routes: string;
  setRoute: (valor:string)=>void;
};

export const RoutesContexts = createContext<IRoutesContexts | any >(null);
