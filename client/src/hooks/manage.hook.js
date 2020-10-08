import {useCallback, useState} from "react";
import {useMessage} from "./message.hook";
import {useHttp} from "./http.hook";

const useManage = () => {
    const {request} = useHttp()
    let message = useMessage();
    const [change, setChange] = useState(false)

    const requestToServer = async (action, users) => {
        console.log(users);
        if (users) {
            const token = JSON.parse(localStorage.getItem('userData')).token
            const body = await request(`api/${action}`, 'POST', {
                users,
                token
            })
            if (body && body.message) {
                message(body.message)
            }
            setChange(!change)
        }

    }

    const blockUsers = useCallback(async (users) => {
        return await requestToServer('block', users)
    }, [])

    const unblockUsers = useCallback(async (users) => {
        return await requestToServer('unblock', users)
    }, [])

    const deleteUsers = useCallback(async (users) => {
        return await requestToServer('delete', users)
    }, []);


    return {blockUsers, unblockUsers, deleteUsers, change,}

}

export default useManage