import {useContext, useEffect, useState} from "react";
import {useMessage} from "./message.hook";
import {useHttp} from "./http.hook";
import {AuthContext} from "../context/AuthContext";
import {UserContext} from "../context/UserContext";

const useManage = () => {
    const {request} = useHttp()
    const message = useMessage();
    const [change, setChange] = useState(false);
    const {token} = useContext(AuthContext);
    const [_, setUsers] = useContext(UserContext);


    useEffect(() => {
        if (token) setUsers(getUsers(setUsers))
    }, [token, change])


    const requestToServer = async (action, users) => {
        if (users && token) {
            const body = await request(`api/${action}`, 'POST', {users},
                {Authorization: `Bearer ${token}`})
            if (body) {
                message(body)
            }
            setChange(!change)
        } else {
            message(`Incorrect token`)
        }
    }

    const getUsers = (setUsers) => request('api/users', 'GET', null, {Authorization: `Bearer ${token}`})
        .then(setUsers)
        .catch(() => setUsers([]))


    const blockUsers = async (unblockedUsers) => {
        return await requestToServer('block', unblockedUsers)
    }

    const unblockUsers = async (blockedUsers) => {
        return await requestToServer('unblock', blockedUsers)
    }

    const deleteUsers = async (currentUsers) => {
        return await requestToServer('delete', currentUsers)
    }


    return {blockUsers, unblockUsers, deleteUsers, getUsers,}

}

export default useManage