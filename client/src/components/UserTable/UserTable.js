import React, {useEffect} from "react";
import "./UserTable.css"
import {useSelect} from "../../hooks/select.hook";

const UserTable = ({users}) => {

    const {selectRow, selectAll} = useSelect()

    useEffect(() => {
        console.log("Rerender table")
    }, [])


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
                    users.map((user) => {
                        return (
                            <tr
                                id={`user-tr-${user.id}`}
                                key={`user-tr-${user.id}`}
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
                                    Object.entries(user).map(([fieldName,value], index) => {
                                        return (
                                            <td
                                                className={fieldName}
                                                key={`${fieldName}-${index}-${value}`}
                                            >
                                                {value}
                                            </td>
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