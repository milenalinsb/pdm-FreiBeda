import { createContext, ReactNode, useState } from "react";

export type IContext = {
  valor: string;
  setValor: (valor: string) => void;
};

type Pros = {
  children: ReactNode;
};

export const HomeContext = createContext<IContext>({
  valor: "",
  setValor: function (valor: string): void {
    throw new Error("Function not implemented.");
  }
});

export const  HomeContextContainer = ({ children }: Pros) => {
  const [valor, setValor] = useState<string>("Home");
  return (
    <>
      <HomeContext.Provider
        value={{ valor, setValor } as unknown as IContext}
      >
        {children}
      </HomeContext.Provider>
    </>
  );
};
