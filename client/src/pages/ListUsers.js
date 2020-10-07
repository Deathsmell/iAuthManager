import React, {useContext} from "react";
import {UserContext} from "../context/UserContext";
import UserTable from "../components/UserTable/UserTable"

const ListUsers = () => {

    const users = useContext(UserContext);


    return (
        <UserTable
            users={users}
        />
    )
}

export default ListUsers