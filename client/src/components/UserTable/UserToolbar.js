import React, {useEffect, useState} from "react"
import useManage from "../../hooks/manage.hook";
import "./UserToolbar.css"

const isBlock = user => user && user.status && (user.status === "block")

const UserToolbar = ({selectedUser, cleanSelect}) => {

    const [blocked, setBlocked] = useState(0);

    useEffect(() => {
        setBlocked(selectedUser.filter(isBlock).length)
    }, [selectedUser])

    const {blockUsers, deleteUsers, unblockUsers} = useManage();


    const blockHandler = async (e) => {
        e.preventDefault()
        await blockUsers(selectedUser)
        await cleanSelect()
    }

    const unblockHandler = async (e) => {
        e.preventDefault()
        await unblockUsers(selectedUser)
        await cleanSelect()
    }

    const deleteHandler = async (e) => {
        e.preventDefault()
        console.log(deleteUsers);
        await deleteUsers(selectedUser)
        await cleanSelect()
    }

    return (
        <div className="btn-group">
            <div>
                <div className="card-action center">
                    <a className={"btn green ".concat(blocked ? " " : "disabled")}
                       href="/"
                       onClick={unblockHandler}
                    >
                        <i className="material-icons left">group_add</i>
                        Unblock {blocked > 1
                        ? ` (${blocked})`
                        : ""}
                    </a>
                    <a className={"btn yellow darken-2 ".concat(selectedUser.length ? " " : "disabled")}
                       href="/"
                       onClick={blockHandler}
                    >
                        <i className="material-icons left">block</i>
                        Block {selectedUser.length !== blocked && selectedUser.length > 1
                        ? ` (${selectedUser.length - blocked})`
                        : ""}
                    </a>
                    <a className={"btn red lighten-1 ".concat(selectedUser.length ? " " : "disabled")}
                       href="/"
                       onClick={deleteHandler}
                    >
                        <i className="material-icons left">delete_forever</i>
                        Delete {selectedUser.length && selectedUser.length > 1
                        ? ` (${selectedUser.length})`
                        : ""}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default UserToolbar