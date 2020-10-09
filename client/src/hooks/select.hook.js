import {useContext} from 'react'
import {UserContext} from "../context/UserContext";

export const useSelect = (selector) => {
    const users = useContext(UserContext)
    const [selectedUser, setSelectedUser] = selector

    const cleanSelect = () => {
        setSelectedUser([])
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

    const setChecked = (boolean) => {
        users.forEach(user => {
            document.getElementById(user.id).checked = boolean
        })
    }

    const selectAll = ({target}) => {
        if (target.checked) {
            setSelectedUser([].concat(users))
            setChecked(true)
        } else {
            cleanSelect()
            setChecked(false)
        }
    }

    return {selectAll, selectRow, cleanSelect}
}