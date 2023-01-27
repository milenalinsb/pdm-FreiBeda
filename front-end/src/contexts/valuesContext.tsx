import { createContext, ReactNode, useState } from "react";

type Pros = {
    children: ReactNode;
  };

  export type IContextValues = {
    values: any;
    setValors: (valor: any) => void;
  };
  
  export const ValuesContex = createContext<IContextValues>({
    values: "",
    setValors: function (valor: string): void {
      throw new Error("Function not implemented.");
    }
  });

export const ValuesContextContainer = ({ children }: Pros) => {
    const [values,setValors] = useState<any>();
    return(<>
    <ValuesContex.Provider value={{values,setValors}}>
    {children}
    </ValuesContex.Provider>
    </>)
}