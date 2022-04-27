import apiUrl from '../apiConfig'
import axios from 'axios'


export const getAllReviews = () => {
    return axios(`${apiUrl}/reviews`)
}

export const createReview = (user, newReview, id) => {
    return axios({
        url: `${apiUrl}/${id}/reviews`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: {review: newReview }
    })
}

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

export const deleteReview = (user, reviewId) => {
    return axios({
        url: `${apiUrl}/reviews/${reviewId}`,
        method:'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}