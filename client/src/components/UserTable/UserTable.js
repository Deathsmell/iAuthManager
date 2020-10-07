import React from "react";
import {useSelect} from "../../hooks/select.hook"
import UserToolbar from "./UserToolbar"
import "./UserTable.css"

const UserTable = ({users}) => {

    const {selectRow, selectAll,selectedUser} = useSelect()

    return (
        <div className="">
            <UserToolbar selectedUser={selectedUser}/>
            <table className="highlight">
                <thead>
                <tr>
                    <th className="checkbox-collum">
                        <label htmlFor="all">
                            <input type="checkbox"
                                   className="filled-in checkbox-pink"
                                   id="all"
                                   key="all"
                                   onClick={selectAll}
                            />
                            <span className="empty"/>
                        </label>
                    </th>
                    {Object.keys(users[0]).map(fieldName => {
                        return (
                            <th key={fieldName}>
                                {fieldName}
                            </th>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => {
                    return (
                        <tr
                            key={index}
                        >
                            <td
                                className="checkbox-collum"
                            >
                                <label htmlFor={user.name}>
                                    <input type="checkbox"
                                           className="filled-in checkbox-pink"
                                           id={user.name}
                                           key={user.name}
                                           value={user.name}
                                           onClick={selectRow}
                                    />
                                    <span className="empty"/>
                                </label>
                            </td>
                            {Object.values(user).map(value => {
                                return (
                                    <td key={`${value}-${index}`}>{value}</td>
                                )
                            })}
                        </tr>)
                })}
                </tbody>
            </table>
        </div>
    )
}

export default UserTable