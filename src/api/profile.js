import axios from "axios";
import apiUrl from '../apiConfig'

export const getOneRestaurant = (userId) => {
    return axios(`${apiUrl}/restaurants/${userId}`)
}


// export const createFavorite = (user, newFavorite, id) => {
//     return axios({
//         url: `${apiUrl}/profile/${id}`,
//         method: 'POST',
//         headers: {
//             Authorization: `Token token=${user.token}`
//         },
//         data: {favorite: newFavorite }
//     })
// }