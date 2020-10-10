import React, {useContext} from "react";
import {useSelect} from "../../hooks/select.hook";
import {UserContext} from "../../context/UserContext";
import "./UserTable.css"
import UserCell from "./UserCell";

const UserTable = () => {

    const {selectRow, selectAll} = useSelect()
    const [users] = useContext(UserContext);

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
                                <UserCell user={user}/>
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