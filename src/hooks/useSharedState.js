import { useContext } from "react";
import SharedStateContext from "../context/SharedStateProvider";

const useSharedState = () => {
    return useContext(SharedStateContext);
}

export default useSharedState;