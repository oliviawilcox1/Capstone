import apiUrl from '../apiConfig'
import axios from 'axios'
// Axios: Axios is a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser
//  and it supports the Promise API that is native to JS ES6. 
// It can be used intercept HTTP requests and responses and enables client-side protection against XSRF. 
// It also has the ability to cancel requests.

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

