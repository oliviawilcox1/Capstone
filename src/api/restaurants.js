import apiUrl from '../apiConfig'
import axios from 'axios'

// *********** Index Route for Restaurants **************
export const getAllRestaurants = () => {
    return axios(`${apiUrl}/restaurants`)
}

// *********** Show Route for Restaurants **************
export const getOneRestaurant = (restaurantId) => {
    return axios(`${apiUrl}/restaurants/${restaurantId}`)
}

// *********** Create Route for Favorites **************
export const createFavorite = (user, userId, newFavorite) => {
    return axios({
      url: `${apiUrl}/profile/${userId}`,
      method: 'POST',
      data: { favorite: newFavorite },
    });
  };

