import {useCallback, useContext, useEffect} from 'react'
import {UserContext} from "../context/UserContext";
import {SelectContext} from "../context/SelectContext";

export const useSelect = () => {
    const users = useContext(UserContext)
    const [selectedUser, setSelectedUser] = useContext(SelectContext)

    useEffect(() => {
        setChecked(users && (selectedUser.length === users.length))('all')
    }, [selectedUser, users])

    const setChecked = useCallback((boolean) => {
        return (id) => {
            const elementById = document.getElementById(id.id ? id.id : "all");
            if (elementById) {
                elementById.checked = boolean
            }
        }
    }, [selectedUser])


    const setCheckedAll = (boolean) => {
        const checked = setChecked(boolean);
        users.forEach(checked)
    }

    const cleanSelects = () => {
        setSelectedUser([])
        setCheckedAll(false)
    }

    const selectAll = ({target}) => {
        if (target.checked) {
            setSelectedUser([].concat(users))
            setCheckedAll(true)
        } else {
            cleanSelects()
        }
    }

    const selectRow = (event) => {
        const target = event.target
        const targetId = typeof target.value === "string"
            ? Number(target.value)
            : target.value
        if (target && target.checked) {
            const changedUsers = users.filter(user => user.id === targetId);
            setSelectedUser(selectedUser.concat(changedUsers))
        }
        if (target && !target.checked)
            setSelectedUser(selectedUser.filter(user => user.id !== targetId))
    }

    return {selectedUser, selectAll, selectRow, cleanSelects}
}