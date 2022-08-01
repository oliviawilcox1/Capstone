import apiUrl from '../apiConfig'
import axios from 'axios'
// Axios: Axios is a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser
//  and it supports the Promise API that is native to JS ES6. 
// It can be used intercept HTTP requests and responses and enables client-side protection against XSRF. 
// It also has the ability to cancel requests.

// *********** Index Route for Reviews **************
export const getAllReviews = () => {
    return axios(`${apiUrl}/reviews`)
}

// *********** Create Route for Reviews **************
export const createReview = (user, id, newReview) => {
    return axios({
        url: `${apiUrl}/reviews/${id}`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {review: newReview }
    })
}

// *********** Update Route for A Review **************
export const updateReview = (user, updatedReview) => {
    return axios ({
        url: `${apiUrl}/reviews/${updatedReview._id}`,
        method: 'PATCH',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { review: updatedReview }
    })
}

// *********** Delete Route for A Review **************
export const deleteReview = (user, reviewId) => {
    return axios({
        url: `${apiUrl}/reviews/${reviewId}`,
        method:'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}