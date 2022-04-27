import React, { useState, useEffect } from 'react'
import { getOneRestaurant } from '../../api/restaurants'
import { Link } from 'react-router-dom'
import { useParams, useNavigate} from 'react-router-dom'



const style = {
    textAlign: 'center'
}

const ShowRestaurant = (props) => {
    const [restaurant, setRestaurant] = useState(null)
    const [review, setReview] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        getOneRestaurant(id)
            .then((res)=> {
                console.log(res.data.product)
                setRestaurant(res.data.restaurant)
            })
            .catch(err => console.log(err))
    }, [])


    if (!restaurant) {
        return <p>Loading..</p>
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
        </div>
        </>
    )

}
export default ShowRestaurant;