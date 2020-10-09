import React, {useContext, useEffect} from "react";
import {useSelect} from "../../hooks/select.hook";
import {UserContext} from "../../context/UserContext";
import "./UserTable.css"

const UserTable = () => {

    const {selectRow, selectAll} = useSelect()
    const [users] = useContext(UserContext);

    useEffect(() => {
        console.log("Rerender table")
    }, [])


    return (
        <div className="">
            {users.length && <table className="highlight">
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
                        Object.keys(users[0]).map(fieldName => {
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
                                    Object.entries(user).map(([fieldName, value], index) => {
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
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            }
        </div>
    )
}

export default UserTable