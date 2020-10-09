import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback(message => {
        if (window.M && message && message !== "null") {
            if (message.message) {
                toast(message.message)
            } else if (typeof message !== "string") {
                message.forEach(msg => {
                    toast(msg)
                })
            } else {
                toast(message)
            }
        }
    }, [])
}

const toast = text => {
    window.M.toast({html: text})
}