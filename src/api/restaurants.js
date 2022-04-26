import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllRestaurants = () => {
    return axios(`${apiUrl}/restaurants`)
}

export const getOneRestaurant = (restaurantId) => {
    return axios(`${apiUrl}/restaurants/${restaurantId}`)
}

