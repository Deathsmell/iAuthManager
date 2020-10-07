import React, {useEffect, useState} from "react"
import "./UserToolbar.css"

const isBlock = user => user.status && (user.status === "block")

const UserToolbar = ({selectedUser}) => {

    const [blocked, setBlocked] = useState(0);

    useEffect(() => {
        setBlocked(selectedUser.filter(isBlock).length)
    },[selectedUser])

    return (
        <div className="btn-group">
            <div>
                <div className="card-action center">
                    <a className={"btn green ".concat(blocked ? " " : "disabled")}
                       href="/"
                    >
                        <i className="material-icons left">group_add</i>
                        Unblock {blocked > 1
                        ? ` (${blocked})`
                        : ""}
                    </a>
                    <a className={"btn yellow darken-2 ".concat(selectedUser.length ? " " : "disabled")}
                       href="/"
                    >
                        <i className="material-icons left">block</i>
                        Block {selectedUser.length !== blocked && selectedUser.length > 1
                        ? ` (${selectedUser.length - blocked})`
                        : ""}
                    </a>
                    <a className={"btn red lighten-1 ".concat(selectedUser.length ? " " : "disabled")}
                       href="/"
                    >
                        <i className="material-icons left">delete_forever</i>
                        Delete { selectedUser.length && selectedUser.length > 1
                        ? ` (${selectedUser.length})`
                        : ""}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default UserToolbar