import axios from "axios";
import apiUrl from '../apiConfig'

export const getOneRestaurant = (userId) => {
    return axios(`${apiUrl}/restaurants/${userId}`)
}
