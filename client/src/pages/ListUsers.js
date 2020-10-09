import React, {useContext, useEffect, useState} from "react"
import UserTable from "../components/UserTable/UserTable"
import UserToolbar from "../components/UserTable/UserToolbar"
import useManage from "../hooks/manage.hook";
import {UserContext} from "../context/UserContext";
import {AuthContext} from "../context/AuthContext";
import {SelectContext} from "../context/SelectContext";

const ListUsers = () => {

    const manager = useManage();
    const {getUsers} = manager
    const selector = useState([]);
    const {token} = useContext(AuthContext);
    const [users, setUsers] = useState([])

    useEffect(() => {
        if (token) setUsers(getUsers(setUsers))
    }, [token])

    return (
        <div>
            <UserContext.Provider value={users}>
                <SelectContext.Provider value={selector}>
                    <UserToolbar
                        manager={manager}
                    />
                    {
                        users.length
                            ? <UserTable
                                users={users}
                            />
                            : <div className="center" style={{marginTop: "5rem"}}>
                                <h3>Whatever was crashed in your code, cheer up!</h3>
                            </div>
                    }
                </SelectContext.Provider>
            </UserContext.Provider>
        </div>
    )
}

export default ListUsers