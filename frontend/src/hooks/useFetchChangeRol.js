import { useEffect, useState } from "react";
import { changeRol } from "../helpers/changeRol";


export const useFetchChangeRol = (id,rol) => {
    const [state, setState] = useState({});
    useEffect( () => {
        changeRol(id,rol).then(data =>{
            setState(data);
        })
    }, [id])
    return state;
}