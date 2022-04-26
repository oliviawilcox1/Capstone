import React, { useEffect } from 'react'
import { getOneRestaurant } from '../../api/restaurants'

import { useParams, useNavigate} from 'react-router-dom'



const style = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'wrap'
}

const ShowRestaurant = (props) => {
    const [restaurant, setRestaurant] = useState(null)
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

        <h1>{restaurant.name}</h1>
        <img src={restaurant.image} alt=''/>
        <p>Located at {restaurant.address}</p>
        <p>{restaurant.visitors} visitors</p>
        <p>{restaurant.cuisine}</p>
        <p>{restaurant.rating}</p>
        <div>
            <h3>{restaurant.description}</h3>
        </div>
        <button>Add to your Future Eats</button>
        <h3> Reviews </h3>
        <button> Add a Review </button>
        </>
    )
















}