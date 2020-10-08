import React, {useContext, useEffect, useState} from "react";
import UserTable from "../components/UserTable/UserTable"
import {useHttp} from "../hooks/http.hook";
import useManage from "../hooks/manage.hook";
import {UserContext} from "../context/UserContext";
import {useSelect} from "../hooks/select.hook";
import UserToolbar from "../components/UserTable/UserToolbar";

const ListUsers = () => {

    const {selectRow, selectAll, selectedUser, cleanSelect} = useSelect()
    const users = useContext(UserContext);


    return (
        <div>
            <UserToolbar selectedUser={selectedUser}
                         cleanSelect={cleanSelect}
            />
            <UserTable
                users={users}
                selectAll={selectAll}
                selectRow={selectRow}
            />
        </div>
    )
}

export default ListUsers