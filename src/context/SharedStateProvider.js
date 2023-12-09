import { createContext, useState, useEffect } from "react";

const INITIAL_STATE = {
    currentOrg:  JSON.parse(localStorage.getItem("currentOrg")) || null,
};

const SharedStateContext = createContext({});

export const SharedStateProvider = ({ children }) => {
    const [state, setState] = useState(INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("currentOrg", JSON.stringify(state.currentOrg));
    }, [state.currentOrg]);

    return (
        <SharedStateContext.Provider value={{ currentOrg: state.currentOrg, setState }}>
            {children}
        </SharedStateContext.Provider>

    )
}

export default SharedStateContext;

