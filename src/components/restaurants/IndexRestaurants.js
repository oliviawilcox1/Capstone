import React, {useEffect, useState} from 'react'
import { getAllRestaurants } from '../../api/restaurants'
import {Link, useNavigate } from 'react-router-dom'

const style = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
}

const IndexRestaurants = (props) => {
    const [restaurants, setRestaurants] = useState(null)
    const {msgAlert, user } = props

    useEffect(()=> {
        getAllRestaurants()
            .then(res => {
                console.log('res', res)
                setRestaurants(res.data.restaurants)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    if(!restaurants) {
        return <h1>Loading...</h1>
    } 
    // let profile 
    // if(user) {
    //    profile = <Link to={`profile/${user._id}`} className='ml-auto m-2' >
	// 				Profile
	// 	  		</Link>
    // }


    let restaurantCards 
    if (restaurants.length > 0) {
    restaurantCards = restaurants.map(restaurant => {
       return <div key={restaurant.id} style={{width: '700px', textAlign:'center'}}>
            <Link to={`restaurants/${restaurant._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurant.name}</h2></Link>
            <p>{restaurant.rating} Stars </p>
            <p>Located at {restaurant.address}</p>
            <img src={`${restaurant.image}`} style={{ height: '350px', width: '550px'}}/>
        </div>
    })
    }

return (
    <>

    <h1>Top Three Places To Eat At This Month </h1>
        <h1>All Restaurants in NYC</h1><br/>
        <div style ={style}>
              
                {restaurantCards}
        </div>
    
    </>
)

}

export default IndexRestaurants