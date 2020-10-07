import {useState, useContext} from 'react'
import {UserContext} from "../context/UserContext";

export const useSelect = () => {
    const users = useContext(UserContext);
    const [selectedUser, setSelectedUser] = useState([]);

    const selectRow = (event) => {
        const target = event.target;
        if (target && target.checked) {
            setSelectedUser(selectedUser.concat(users.find(user => user.name === target.value)))
        }
        if (target && !target.checked) {
            setSelectedUser(selectedUser.filter(user => user.name !== target.value))
        }
    }

    const selectAll = (event) => {
        const target = event.target;
        if (target && target.checked) {
            setSelectedUser([].concat(users))
            users.forEach(user => {
                document.getElementById(user.name).checked = true
            })
        }
        if (target && !target.checked) {
            setSelectedUser([])
            users.forEach(user => {
                document.getElementById(user.name).checked = false
            })
        }
    }

    return {selectAll: selectAll, selectRow: selectRow, selectedUser}
}