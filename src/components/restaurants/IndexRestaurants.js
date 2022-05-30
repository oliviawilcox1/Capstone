import React, {useEffect, useState} from 'react'
import { getAllRestaurants } from '../../api/restaurants'
import {Link, useNavigate } from 'react-router-dom'



const style = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '20px'
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

    if(!restaurants) 
    {
        return <h1>Loading...</h1>
    } 

    let restaurantCards 

    if (restaurants.length > 0)
    {
        restaurantCards = restaurants.map(restaurant => {
        return <div key={restaurant.id} style={{width: '700px', textAlign:'center'}}>
                    <Link to={`restaurants/${restaurant._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurant.name}</h2></Link>
                    <p>
                        {(restaurant.rating).toFixed(1)} Stars <br/>
                        {restaurant.visitors} Visitors <br/>
                        Located at {restaurant.address} <br/>
                    </p>
                    <img src={`${restaurant.image}`} style={{ height: '350px', width: '550px'}}/>
                </div>
        })
    }


    let highlights
    if (restaurants.length > 0) 
    {
        highlights = <div style ={{display: 'flex', flexDirection:'row', flexWrap: 'wrap', margin:'10px'}}>

            <div style={{ textAlign: 'center', margin:'auto'}}>
                <Link to={`restaurants/${restaurants[12]._id}`}><h3 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[12].name}</h3></Link>
                <img src={`${restaurants[12].image}`} style={{ height:'300px', width: '300px'}} />
                <p>
                    {(restaurants[12].rating).toFixed(1)} Stars <br/>
                    Located at {restaurants[12].address}
                </p>
            </div>
               
            <div style={{ textAlign: 'center', margin:'auto'}}>
                <Link to={`restaurants/${restaurants[25]._id}`}><h3 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[25].name}</h3></Link>
                <img src={`${restaurants[25].image}`} style={{ height:'300px',  width: '300px'}}/>
                <p>
                    {(restaurants[25].rating).toFixed(1)} Stars <br/>
                    Located at {restaurants[25].address}
                </p>
            </div>

            <div style={{ textAlign: 'center', margin:'auto'}}>
                <Link to={`restaurants/${restaurants[8]._id}`}><h3 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[8].name}</h3></Link>
                <img src={`${restaurants[8].image}`} style={{ height:'300px', width: '300px'}}/>
                <p>
                    {(restaurants[8].rating).toFixed(1)} Stars <br/>
                    Located at {restaurants[8].address}
                </p>
            </div>
        </div>
    }

return (
    <>
    <div class='form'>
        <h1> Certified Fresh Restaurants of the Week </h1>
        <div class ='form2'>
            {highlights}
        </div>
        <h1>All Restaurants in NYC</h1><br/>
   

  
        <div class="scrollbar bordered-black square thin">
            <div class="force-overflow" style={style}>
            {restaurantCards}
            </div>
        </div>
        </div>
    </>
    )
}

export default IndexRestaurants