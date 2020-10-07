import React, {useContext} from "react";
import {useSelect} from "../hooks/select.hook"
import {UserContext} from "../context/UserContext";

const style = {
    span: {
        height: "15px"
    },
    th: {
        width: "5px"
    }

}

const ListUsers = () => {

    const {selectRow, selectAll, selectedUser} = useSelect()
    const users = useContext(UserContext);


    return (
        <div className="container">
            <button
                onClick={() => {
                    console.log(selectedUser);
                }}
                style={{marginTop: "10px"}}
            >Show selected
            </button>
            <table className="highlight">
                <thead>
                <tr>
                    <th style={style.th}>
                        <label htmlFor="all">
                            <input type="checkbox"
                                   className="filled-in checkbox-pink"
                                   id="all"
                                   key="all"
                                   onClick={selectAll}
                            />
                            <span style={style.span}/>
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
                        <tr key={index}>
                            <td>
                                <label htmlFor={user.name}>
                                    <input type="checkbox"
                                           className="filled-in checkbox-pink"
                                           id={user.name}
                                           key={user.name}
                                           value={user.name}
                                           onClick={selectRow}
                                    />
                                    <span style={style.span}/>
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

export default ListUsers