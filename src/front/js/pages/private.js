import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    return(
        <div>
            {store.token ? 
        (<div>
            <h1>Estás en la jungla</h1>
        </div>): 
        (<div>
            <h1>No estas Logeado...</h1>
        </div>) 
        
        }
        </div>
    )
}

export default Private