import React, {useContext, useEffect, useState} from "react"
import {useSelect} from "../../hooks/select.hook";
import {SelectContext} from "../../context/SelectContext";
import useManage from "../../hooks/manage.hook";
import "./UserToolbar.css"

const isBlock = user => user.status && (user.status === "blocked")

const UserToolbar = () => {

    const manager = useManage();
    const [blocked, setBlocked] = useState(0)
    const [selectedUser] = useContext(SelectContext)
    const {cleanSelects} = useSelect()
    const {blockUsers, deleteUsers, unblockUsers} = manager

    useEffect(() => {
        if (selectedUser && selectedUser.length)
            setBlocked(selectedUser.filter(isBlock).length)
    }, [selectedUser])


    const selectDo = (handler) => {
        return (async (e) => {
            e.preventDefault()
            await cleanSelects()
            setBlocked(0)
            await handler(selectedUser)
        })
    }

    return (
        <div className="btn-group">
            <div>
                <div className="card-action center">
                    <a className={"btn-large green ".concat(blocked ? " " : "disabled")}
                       href="/"
                       onClick={selectDo(unblockUsers)}
                    >
                        <i className="material-icons left">group_add</i>
                        Unblock {blocked > 1
                        ? ` (${blocked})`
                        : ""}
                    </a>
                    <a className={"btn-large yellow darken-2 ".concat(selectedUser.length ? " " : "disabled")}
                       href="/"
                       onClick={selectDo(blockUsers)}
                    >
                        <i className="material-icons left">block</i>
                        Block {selectedUser.length !== blocked && selectedUser.length > 1
                        ? ` (${selectedUser.length - blocked})`
                        : ""}
                    </a>
                    <a className={"btn-large red lighten-1 ".concat(selectedUser.length ? " " : "disabled")}
                       href="/"
                       onClick={selectDo(deleteUsers)}
                    >
                        <i className="material-icons left">delete_forever</i>
                        Delete {selectedUser.length && selectedUser.length > 1
                        ? ` (${selectedUser.length})`
                        : ""}
                    </a>
                    <a className={"btn-large grey lighten-1 ".concat(selectedUser.length ? " " : "disabled")}
                       href="/"
                       onClick={selectDo(cleanSelects)}
                    >
                        <i className="material-icons left">clear_all</i>
                        Clean {selectedUser.length
                        ? ` (${selectedUser.length})`
                        : ""}
                    </a>
                </div>
            </div>
        </div>
    )
}

export default UserToolbar