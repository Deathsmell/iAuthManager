import {useState, useContext} from 'react'
import {UserContext} from "../context/UserContext";

export const useSelect = () => {
    const users = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState([]);

    const selectRow = (event) => {
        const target = event.target
        const targetId = typeof target.value === "string"
            ? Number(target.value)
            : target.value
        if (target && target.checked) {
            const changedUsers = users.filter(user => user.id === targetId);
            setSelectedUser(selectedUser.concat(changedUsers))
        }
        if (target && !target.checked) {
            setSelectedUser(selectedUser.filter(user => user.id !== targetId))
        }
    }

    const selectAll = (event) => {
        const target = event.target;
        if (target && target.checked) {
            setSelectedUser([].concat(users))
            users.forEach(user => {
                document.getElementById(user.id).checked = true
            })
        }
        if (target && !target.checked) {
            setSelectedUser([])
            users.forEach(user => {
                document.getElementById(user.id).checked = false
            })
        }
    }

    const cleanSelect = () => {
        setSelectedUser([])
    }

    return {selectedUser, selectAll, selectRow, cleanSelect}
}