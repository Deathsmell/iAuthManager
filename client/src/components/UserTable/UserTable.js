import React from "react";
import {useSelect} from "../../hooks/select.hook"
import UserToolbar from "./UserToolbar"
import "./UserTable.css"

const UserTable = ({users,selectRow, selectAll}) => {

    return (
        <div className="">
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
                    {
                        users.length && Object.keys(users[0]).map(fieldName => {
                            return (
                                <th key={fieldName}>
                                    {fieldName}
                                </th>
                            )
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => {
                        return (
                            <tr
                                key={index}
                            >
                                <td
                                    className="checkbox-collum"
                                >
                                    <label htmlFor={user.id}>
                                        <input type="checkbox"
                                               className="filled-in checkbox-pink"
                                               id={user.id}
                                               value={user.id}
                                               onClick={selectRow}
                                        />
                                        <span className="empty"/>
                                    </label>
                                </td>
                                {
                                    Object.values(user).map((value, index) => {
                                        return (
                                            <td key={`${value}-${index}-${user.name}`}>{value}</td>
                                        )
                                    })
                                }
                            </tr>)
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default UserTable