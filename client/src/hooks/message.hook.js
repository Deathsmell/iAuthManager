import {useCallback} from 'react'

export const useMessage = () => {
    return useCallback(message => {
        if (window.M && message){
            if (typeof message !== "string" ){
                message.forEach(msg =>{
                    toast(msg)
                })
            } else {
                toast(message)
            }
        }
    },[])
}

const toast = text => {
    window.M.toast({html: text})
}