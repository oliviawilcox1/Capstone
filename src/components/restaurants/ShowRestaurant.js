import React, { useState, useEffect } from 'react'
import { getOneRestaurant } from '../../api/restaurants'
import { Link } from 'react-router-dom'
import { useParams, useNavigate} from 'react-router-dom'
import ShowReviewModal from '../reviews/ShowReview'
import EditReview from '../reviews/EditReview'
import { getAllReviews, updateReview } from '../../api/reviews'
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
    const [modalOpen, setModalOpen] = useState(false);
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()


   
    const display = () => {
       
        if (user === null) 
        {
            console.log('cant')
            setHidden(true)
        } 
        else 
        {
            console.log('FAV', user.favorites)
            let faveArray = user.favorites  
            for (const i in faveArray ) {
                console.log('favorite product id', faveArray[i]._id)
                console.log('Show product id',  id)
                if (faveArray[i]._id == id) 
                {
                    setHidden(true)
                    return
                } 
                else 
                {
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


    if (!restaurant) 
    {
        return <p>Loading..</p>
    }


    const handleClick = (e) => {

        createFavorite(user, user._id, restaurant)
    
            setFavorite(user.favorites.push(restaurant)) 

            setHidden(true)
            // console.log('user fav array', user.favorites)
            return user
    }

// THIS IS TO ONLY SHOW REVIEWS SPECIFIC TO RESTAURANT
    let reviewCards = []

    if(reviews != undefined ) 
    {
        for (const i in reviews ) {
            // console.log('reviews', reviews[i].restaurant._id)
            // console.log('Show product id',  id)
            // console.log('review', reviews)
            if (reviews[i].restaurant._id == id) 
            {
            reviewCards =  reviews.map(review => (

                <ShowReviewModal
                    key={review._id} review={review} restaurant={restaurant} 
                    user={user} msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)} 
                />
                ))
            } 
            else 
            {
                console.log('The IDs dont match!')
            }
        }
    }



    return (
        <>
            <div style = {style} class='form'>
                
                <h1>{restaurant.name}</h1>
                <img src={`${restaurant.image}`} alt='' style={{ height: '400px', width: 'auto'}}/>

                <div class='form2'>
                    <p>
                        Located at {restaurant.address}<br/>
                        {restaurant.visitors} visitors  <br/>
                        {restaurant.cuisine} <br/>
                        {restaurant.rating} 
                    </p>
                </div>

                <div class='form2' style={{ width: '50%', margin: 'auto', fontSize: '40px'}}>
                        <h2>A Brief Description: </h2>
                        <h6> {restaurant.description}</h6>
                </div>
                <br/>
                <button style={{margin: '15px', display: hidden ? 'none' : 'inline'}} onClick={() => handleClick()}>Add to your Future Eats</button>
                <h3> Reviews </h3>
                <Link to={`/reviews/${id}`}>  <button style={{margin: '8px'}} > Add a Review </button>  </Link>
                <p> {reviewCards}</p> 

            </div>
        </>
    )
}
export default ShowRestaurant;