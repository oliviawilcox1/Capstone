import apiUrl from '../apiConfig'
import axios from 'axios'

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