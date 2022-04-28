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
    const [review, setReviews] = useState([])
    const [reviewModalOpen, setReviewModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate()


    
    const isFavorite = () => {
        let faveArray = []
        getAllReviews()
          .then(res => {
              console.log('this is the favoritesArray', res.data.reviews)
              // setFavoriteArray(res.data.favorites)
              faveArray = res.data.reviews
              return faveArray
            })
            .then(faveArray => {
                // Itterating through faveArray but we're going through the entire thing and ending on the last item in array
                // whether or not something ends up equaling the Id if the last item in the array does not equal the array,
                // set hidden will be set equal to false
                // consider writing a filter function that returns it true or false
                // set hidden to the value that is return to the 'variable is fave'
                // const isFave = faveArray.filter((product) => {
                //   product 
                // })
        
                for( const i in faveArray ) {
                //   console.log('favorite product id', faveArray[i].product._id)
                //   console.log('Show product id',  id)
                  if (faveArray[i].restaurant._id == id) {
                    console.log('review', faveArray.review)

                    // return setHidden(true) // this is not working
                  } else {
                    console.log('review', faveArray)
                   
                  }
                } 
              })  
            .catch(error => console.log(error))
    }


    useEffect(()=> {
        getOneRestaurant(id)
            .then((res)=> {
                console.log(res.data.restaurant)
                setRestaurant(res.data.restaurant)
                // setReviews(res.data.restaurant.review)
                // console.log('reviews', review)
                isFavorite()
            })
            .catch(err => console.log(err))
    //    getAllReviews()
    //             .then(res => {
    //                 console.log('res', res.data)
    //                 setReviews(res.data.reviews)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    }, [updated])

    if (!restaurant) {
        return <p>Loading..</p>
    }

    console.log(review)
    let reviewCards = []
    if (review.length>0) {
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