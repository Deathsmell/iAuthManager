const findTableRowById = (rowId) => {
    if (rowId) return document.getElementById(`user-tr-${rowId}`)
}

const removeUserRows = (removedUsers) => {
    return (removedUsers.forEach(({id}) => {
            findTableRowById(id).remove()
        })
    )
}

const changedStatus = (key, value) => {
    return (users) => {
        users.forEach(async ({id}) => {
            const elementById = await findTableRowById(id)
            if (elementById.childNodes) {
                const childNodes = elementById.childNodes;
                for (let i = 0; i < childNodes.length; i++) {
                    if (childNodes.item(i).className === key) {
                        childNodes.item(i).innerText = value
                    }
                }
            }
        })
    }
}