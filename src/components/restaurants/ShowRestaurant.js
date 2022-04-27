import React, { useState, useEffect } from 'react'
import { getOneRestaurant } from '../../api/restaurants'
import { Link } from 'react-router-dom'
import { useParams, useNavigate} from 'react-router-dom'
import ShowReviewModal from '../reviews/ShowReview'
import EditReview from '../reviews/EditReview'
import { getAllReviews } from '../../api/reviews'


const style = {
    textAlign: 'center'
}

const ShowRestaurant = (props) => {
    const { user, msgAlert } = props;
    const [restaurant, setRestaurant] = useState(null)
    const [review, setReviews] = useState(null)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        getOneRestaurant(id)
            .then((res)=> {
                console.log(res.data.restaurant)
                setRestaurant(res.data.restaurant)
            })
            .catch(err => console.log(err))
       getAllReviews()
                .then(res => {
                    console.log('res', res)
                    setReviews(res.data.reviews)
                })
                .catch(err => {
                    console.log(err)
                })
    }, [updated])


    if (!restaurant) {
        return <p>Loading..</p>
    }

    console.log(review)
    let reviewCards = null;
    if (review) {
        console.log('review', review)
            reviewCards = review.map(review => (
                <ShowReviewModal
                    key={review._id} review={review} restaurant={restaurant} 
                    user={user} msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
            console.log('review', reviewCards)
        }
    



    return (
        <>
        <div style = {style}>
            <h1>{restaurant.name}</h1>
            <img src={`${restaurant.image}`} alt='' style={{ height: '400px', width: 'auto'}}/>
        <div style={{ font: '12px'}}>
            <p>Located at {restaurant.address}</p>
            <p>{restaurant.visitors} visitors</p>
            <p>{restaurant.cuisine}</p>
            <p>{restaurant.rating}</p>
         </div>
            <div style={{ width: '550px', margin: 'auto'}}>
                <h3>What to Expect:</h3>
                <h4> {restaurant.description}</h4>
            </div>
            <button>Add to your Future Eats</button>
            <h3> Reviews </h3>
            <Link to={`/${id}/reviews`}>  <button> Add a Review </button>  </Link>
            <p> {reviewCards}</p> 
        </div>
        </>
    )

}
export default ShowRestaurant;