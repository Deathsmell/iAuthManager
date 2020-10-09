import React, {useContext, useEffect, useState} from "react"
import UserTable from "../components/UserTable/UserTable"
import UserToolbar from "../components/UserTable/UserToolbar"
import useManage from "../hooks/manage.hook";
import {UserContext} from "../context/UserContext";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

const ListUsers = () => {

    const manager = useManage();
    const {getUsers} = manager

    const selector = useState([]);

    const {token} = useContext(AuthContext);
    const [users, setUsers] = useState([])


    useEffect(() => {
        if (token) {
            setUsers(getUsers(setUsers))
        }
    }, [token])

    useEffect(() => {
        console.log("Rerender list users")
    }, [])

    return (
        <div>
            <UserContext.Provider value={users}>
                <UserToolbar
                    selector={selector}
                    manager={manager}
                />
                {users.length
                    ? <UserTable
                        selector={selector}
                        users={users}
                    />
                    : <div className="center" style={{marginTop: "5rem"}}>
                        <h3>Никого нету</h3>
                    </div>
                }
            </UserContext.Provider>
        </div>
    )
}

export default ListUsers