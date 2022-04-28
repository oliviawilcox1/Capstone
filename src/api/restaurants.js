import apiUrl from '../apiConfig'
import axios from 'axios'

export const getAllRestaurants = () => {
    return axios(`${apiUrl}/restaurants`)
}

export const getOneRestaurant = (restaurantId) => {
    return axios(`${apiUrl}/restaurants/${restaurantId}`)
}

export const createFavorite = (user, userId, newFavorite) => {
    console.log('user', user);
    console.log('this is newRestaurant', newFavorite);
    return axios({
      url: `${apiUrl}/profile/${userId}`,
      method: 'POST',
      data: { favorite: newFavorite },
    });
  };

