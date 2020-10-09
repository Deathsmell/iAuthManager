import {useCallback, useContext, useState} from "react";
import {useMessage} from "./message.hook";
import {useHttp} from "./http.hook";
import {AuthContext} from "../context/AuthContext";

const useManage = () => {
    const {request} = useHttp()
    let message = useMessage();
    const [change, setChange] = useState(false)
    const {token} = useContext(AuthContext);

    const requestToServer = async (action, users) => {
        if (users && token) {
            const body = await request(
                `api/${action}`,
                'POST',
                {
                    users
                },
                {Authorization: `Bearer ${token}`}
            )
            if (body && body.message) {
                message(body.message)
            }
            setChange(!change)
        } else {
            message(`Incorrect token`)
        }

    }

    const getUsers = useCallback((setUsers) => {
        return request('api/users', 'GET', null, {Authorization: `Bearer ${token}`})
            .then(setUsers)
            .catch(() => setUsers([]))
    }, [])


    const blockUsers = useCallback(async (users) => {
        return await requestToServer('block', users)
    }, [])

    const unblockUsers = useCallback(async (users) => {
        return await requestToServer('unblock', users)
    }, [])

    const deleteUsers = useCallback(async (users) => {
        return await requestToServer('delete', users)
    }, []);


    return {blockUsers, unblockUsers, deleteUsers, change, getUsers,}

}

export default useManage