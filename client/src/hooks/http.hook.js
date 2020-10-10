import {useCallback, useState} from 'react'

export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setLoading(true)
        try {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {
                method,
                body,
                headers
            })

            let data
            try {
                data = await response.json()
            } catch (e) {
                const error = data.message ? data.message : "Unsupported json"
                setError(error)
            }

            if (!response.ok) {
                setError(data.message || {message: "useHttp response error"})
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, error, request, clearError}
}