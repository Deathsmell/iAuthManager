import {useCallback, useContext} from "react";
import {useMessage} from "./message.hook";
import {useHttp} from "./http.hook";
import {AuthContext} from "../context/AuthContext";

const useManage = () => {
    const {request} = useHttp()
    let message = useMessage();
    const {token} = useContext(AuthContext);


    const findTableRowById = useCallback((rowId) => {
        if (rowId) return document.getElementById(`user-tr-${rowId}`)
    }, [])

    const removeUserRows = (users) => {
        users.forEach(({id}) => {
            findTableRowById(id).remove()
        })
    }

    const changedStatus = (key, value) => {
        return (users) => {
            users.forEach(async ({id}) => {
                const elementById = await findTableRowById(id)
                if (elementById.childNodes) {
                    const childNodes = elementById.childNodes;
                    for (let i = 0; i < childNodes.length; i++) {
                        if (childNodes.item(i).className === key) {
                            childNodes.item(i).innerText = value
                        }
                    }
                }
            })
        }
    }

    const requestToServer = async (action, users) => {
        if (users && token) {
            const body = await request(`api/${action}`, 'POST', {users},
                {Authorization: `Bearer ${token}`})
            if (body) {
                message(body)
            }
            action !== 'delete'
                ? changedStatus('status', action)(users)
                : removeUserRows(users)
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


    return {blockUsers, unblockUsers, deleteUsers, getUsers,}

}

export default useManage