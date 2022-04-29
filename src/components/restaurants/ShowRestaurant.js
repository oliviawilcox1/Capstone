import React, { useState, useEffect } from 'react'
import { getOneRestaurant } from '../../api/restaurants'
import { Link } from 'react-router-dom'
import { useParams, useNavigate} from 'react-router-dom'
import ShowReviewModal from '../reviews/ShowReview'
import EditReview from '../reviews/EditReview'
import { getAllReviews } from '../../api/reviews'
import { createFavorite } from '../../api/restaurants'


const style = {
    textAlign: 'center'
}


const ShowRestaurant = (props) => {
    const { user, msgAlert } = props;
    const [restaurant, setRestaurant] = useState(null)
    const [reviews, setReviews] = useState()
    const [hidden, setHidden] = useState(false)
    const [favorite, setFavorite] = useState(null)
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()


   
    const display = () => {
       
        if (user === null) {
            console.log('cant')
            setHidden(true)
        } else {
                console.log('FAV', user.favorites)
                let faveArray = user.favorites  
                for (const i in faveArray ) {
                    console.log('favorite product id', faveArray[i]._id)
                    console.log('Show product id',  id)
                    if (faveArray[i]._id == id) {
                    // console.log('Do not display favorite button')
                        setHidden(true)
                        return
                    } else {
                    // console.log('Display Favorite button')
                        setHidden(false)
                    }

                return user
        }
    }
}








    useEffect(()=> {
        getOneRestaurant(id)
            .then((res)=> { 
                setRestaurant(res.data.restaurant) 
                display()
            })
                // setReviews(res.data.restaurant.review)
                // console.log('reviews', review)
                // isFavorite()
            .catch(err => console.log(err))
        getAllReviews()
                .then(res => {
                    console.log('res', res.data.reviews)
                    setReviews(res.data.reviews)
                    return reviews
                })
                .catch(err => {
                    console.log(err)
                })
    }, [updated])

    if (!restaurant) {
        return <p>Loading..</p>
    }



const handleClick = (e) => {
    // console.log('the restaurant to submit', restaurant)
    // console.log('user',user.favorites)
    createFavorite(user, user._id, restaurant)
        // let favorite = user.favorites.push(restaurant)
         setFavorite(user.favorites.push(restaurant)) 
         setHidden(true)
         console.log('user fav array', user.favorites)
         return user
  }


    // createReview(user, product._id, review)
    //     // if create is successful, we should navigate to the show page
    //     .then(() => handleClose())
    //     // then we send a success message
    //     .then(() =>
    //         msgAlert({
    //             heading: 'Review Created',
    //             message: 'Thank you for your feedback!',
    //             variant: 'success',
    //         }))
    //     .then(() => triggerRefresh())
    //     // if there is an error, we'll send an error message
    //     .catch(() =>
    //         msgAlert({
    //             heading: 'Oh No!',
    //             message: 'Please try again.',
    //             variant: 'danger',
    //         }))
    //    console.log(review)


    // let reviewCards = []
    // if(reviews != undefined ) {
   
    //     console.log('review', reviews)
    //         reviewCards = reviews.map(review => (
               
    //             <ShowReviewModal
    //                 key={review._id} review={review} restaurant={restaurant} 
    //                 user={user} msgAlert={msgAlert}
    //                 triggerRefresh={() => setUpdated(prev => !prev)}
    //             />
    //         ))
    // }
 
// THIS IS TO ONLY SHOW REVIEWS SPECIFIC TO RESTAURANT
let reviewCards = []
if(reviews != undefined ) {
    for (const i in reviews ) {
        console.log('reviews', reviews[i].restaurant._id)
        console.log('Show product id',  id)
        if (reviews[i].restaurant._id == id) {
        // console.log('Do not display favorite button')
        console.log('review', reviews)
        reviewCards = reviews.map(review => (
           
            <ShowReviewModal
                key={review._id} review={review} restaurant={restaurant} 
                user={user} msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
            />
        ))
        } else {
        // console.log('Display Favorite button')
            console.log('erg')
        }
    }
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
            <button style={{ display: hidden ? 'none' : 'block'}} onClick={() => handleClick()}>Add to your Future Eats</button>
            <h3> Reviews </h3>
            <Link to={`/reviews/${id}`}>  <button> Add a Review </button>  </Link>
            <p> {reviewCards}</p> 
         
        </div>
        </>
    )
}
export default ShowRestaurant;