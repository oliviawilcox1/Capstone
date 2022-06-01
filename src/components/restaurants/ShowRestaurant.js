import React, { useState, useEffect } from 'react'
import ScrollToTop from 'react-scroll-to-top'
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
const style2 = {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '15px'
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

    if(reviews != undefined) 

    {
            for (const i in reviews ) {
                console.log('reviews', reviews[i].restaurant._id)
                console.log('Show product id',  id)
                console.log('review', reviews)
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
            <ScrollToTop style={style2}/>
                <h1>{restaurant.name}</h1>
                <img src={`${restaurant.image}`} alt='' style={{ height: '400px', width: 'auto'}}/>

                <div class='form2'>
                    <p>
                        Located at {restaurant.address}<br/>
                        {restaurant.visitors} visitors  <br/>
                        {restaurant.cuisine} <br/>
                        {(restaurant.rating).toFixed(1)} <br/>
                    
                    </p>
                </div>

                <div class='form2' style={{ width: '50%', margin: 'auto', fontSize: '40px'}}>
                        <h2>A Brief Description: </h2>
                        <h6> {restaurant.description}</h6>
                        <p>
                            <button style={{margin: '15px'}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16" >
                                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                            </svg> 
                            &nbsp;
                            {' '}
                            <a href={`tel:+${restaurant.number}`}>{restaurant.number}</a>
                            </button><br/>
                        </p>
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