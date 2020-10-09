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
            });
            let data
            try {
                data = await response.json()
            } catch (e) {
                setLoading(false)
                setError("Unsupported json")
            }

            if (!response.ok) {
                setError(response.message || {message: "useHttp response error"})
                setLoading(false)
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    }, [])

    const clearError = useCallback(() => setError(null), [])

    return {loading, error, request, clearError}
}