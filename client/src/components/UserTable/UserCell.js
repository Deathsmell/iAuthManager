import React, {useCallback, useContext} from "react";
import moment from "moment";


const UserCell = ({user}) => {
    const fixDate = useCallback((date) => moment(date).format("hh:mm:ss MM-DD-YY"), [])

    const fieldValueHandler = useCallback((fieldName, value) => {
        if (fieldName === "createdAt") {
            return fixDate(value)
        }
        if (fieldName === 'status') {
            return (
                <div style={{fontSize: "20px"}} className={"chip ".concat(value === "blocked" ? "red" : "green")}>
                    {value}
                </div>
            )
        } else {
            return value
        }
    }, [user])

    return (
        Object.entries(user).map(([fieldName, value], index) => {
            return (
                <td
                    className={value}
                    key={`${value}-${index}-${value}`}
                >
                    {
                        fieldValueHandler(fieldName, value)
                    }
                </td>
            )
        })
    )
}

export default UserCell