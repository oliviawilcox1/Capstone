import apiUrl from '../apiConfig'
import axios from "axios"

export const getOneUser = (userId) => {
    return axios(`${apiUrl}/profile/${userId}`)
}