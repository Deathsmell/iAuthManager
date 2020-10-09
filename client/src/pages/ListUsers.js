import React, {useState} from "react"
import UserTable from "../components/UserTable/UserTable"
import UserToolbar from "../components/UserTable/UserToolbar"
import {UserContext} from "../context/UserContext";
import {SelectContext} from "../context/SelectContext";

const ListUsers = () => {

    const selector = useState([]);
    const userState = useState([]);

    return (
        <div>
            <UserContext.Provider value={userState}>
                <SelectContext.Provider value={selector}>
                    <UserToolbar/>
                    <UserTable/>
                </SelectContext.Provider>
            </UserContext.Provider>
        </div>
    )
}

export default ListUsers