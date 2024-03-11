import axios from "axios"

const isLogged = () => {
    if (localStorage) {
        const token = getAuth()

        if (token) {
            if (!token || !token.exp)
                return false

            const currentTime = Math.floor(Date.now() / 1000)

            if (token.exp > currentTime) {
                return axios.post(`${import.meta.env.VITE_APP_API_URL}/auth/verify`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
                    .then(response => {
                        return true
                    })
                    .catch(error => {
                        return false
                    });
            }
        }
    }

    return false
}

const getAuth = () => {
    const token = localStorage.getItem('token')

    if (!token)
        return false

    const payload = token.split('.')[1]
    const payloadDecoded = atob(payload)
    const payloadJson = JSON.parse(payloadDecoded)

    return payloadJson
}

export { isLogged, getAuth }