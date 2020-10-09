import React, {useContext, useEffect, useState} from "react"
import "./UserToolbar.css"
import {useSelect} from "../../hooks/select.hook";
import {SelectContext} from "../../context/SelectContext";

const isBlock = user => user && user.status && (user.status === "block")

const UserToolbar = ({manager}) => {

    const [blocked, setBlocked] = useState(0)
    const [selectedUser] = useContext(SelectContext)
    const {cleanSelects} = useSelect()
    const {blockUsers, deleteUsers, unblockUsers} = manager

    useEffect(() => {
        setBlocked(selectedUser.filter(isBlock).length)
    }, [selectedUser])

    useEffect(()=>{
        console.log("RENDER")
    },[])

    const selectDo = (handler) => {
        return (async (e) => {
            e.preventDefault()
            await cleanSelects()
            const response = await handler(selectedUser)
            console.log(response)
        })
    }

    return (
        <div className="btn-group">
            <div>
                <div className="card-action center">
                    <a className={"btn green ".concat(blocked ? " " : "disabled")}
                       href="/"
                       onClick={selectDo(unblockUsers)}
                    >
                        <i className="material-icons left">group_add</i>
                        Unblock {blocked > 1
                        ? ` (${blocked})`
                        : ""}
                    </a>
                    <a className={"btn yellow darken-2 ".concat(selectedUser.length ? " " : "disabled")}
                       href="/"
                       onClick={selectDo(blockUsers)}
                    >
                        <i className="material-icons left">block</i>
                        Block {selectedUser.length !== blocked && selectedUser.length > 1
                        ? ` (${selectedUser.length - blocked})`
                        : ""}
                    </a>
                    <a className={"btn red lighten-1 ".concat(selectedUser.length ? " " : "disabled")}
                       href="/"
                       onClick={selectDo(deleteUsers)}
                    >
                        <i className="material-icons left">delete_forever</i>
                        Delete {selectedUser.length && selectedUser.length > 1
                        ? ` (${selectedUser.length})`
                        : ""}
                    </a>
                    <a className={"btn grey lighten-3 ".concat(selectedUser.length ? " " : "disabled")}
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