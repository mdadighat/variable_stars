import React, { createContext, useReducer, ReactNode } from "react";
import Reducer from './Reducer';


type Star = {
    altitude: string
    auid: string
    name: string
    const: string
    ra: string
    dec: string
    varType: string
    maxMag: string
    maxPass: string
    minMag: string
    minPass: string
    period: string
  }

type InitialStateType = {
    stars: Array<Star>;
    error: null | string;
}

type StoreProps = {
    children: ReactNode;
}

const initialState: InitialStateType = {
    stars: [],
    error: null
};

const Store = ({ children }: StoreProps) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext<[InitialStateType, React.Dispatch<any>]>([initialState, () => null]);
export default Store;