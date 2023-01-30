export type NavigationProps={
    navigate(arg0: string, params: any): unknown
    navigation:{
        navigate: (path: string,route?:any) => void
    }
}