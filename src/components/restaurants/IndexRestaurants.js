import React, {useEffect, useState} from 'react'
import ScrollToTop from 'react-scroll-to-top'
import { getAllRestaurants, getRestaurantSum } from '../../api/restaurants'
import {Link, useNavigate } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'

const style = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: '30px'
}

const style2 = {
    display: 'flex',
    justifyContent: 'center',
    fontSize: '15px'
}

const IndexRestaurants = (props) => {
    const [restaurants, setRestaurants] = useState(null)
    const [restauranttotal, setRestaurantTotal] = useState(null)
    const {msgAlert, user } = props

    // Mount Component with UseEffect Hook 
    useEffect(()=> {
        // Call Get Route to get all restaurants
        getAllRestaurants()
            .then(res => {
                // Update State and set restaurants as the res.data.restaurants
                setRestaurants(res.data.restaurants)
            })
            .catch(err => {
                console.log(err)
            })
        getRestaurantSum()
            .then(res => {
                // Update State and set restaurants as the res.data.restaurants
                console.log("data", res.data)
                setRestaurantTotal(res.data.sum)
            })
            .catch(err => {
                console.log(err)
            })
    },[])

    // If there are no restaurants 
    if(!restaurants) 
    {
        return <h1>Loading...</h1>
    } 

    // Map through Restaurants if they are present and assign them to restaurant cards
    let restaurantCards 
    if (restaurants.length > 0)
    {
        restaurantCards = restaurants.map(restaurant => {
        return <div key={restaurant.id} style={{width: '700px', textAlign:'center'}}>
                    <Link to={`restaurants/${restaurant._id}`}>
                        <h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurant.name}</h2>
                    </Link>
                    <p>
                        {(restaurant.rating).toFixed(1)} Stars <br/>
                        {restaurant.visitors} Visitors <br/>
                        Located at {restaurant.address} <br/>
                    </p>
                    <img src={`${restaurant.image}`} style={{ height: '350px', width: '550px'}}/>
                </div>
        })
    }

    console.log(restauranttotal)
    // Assign Highlights to be shown
    let highlights
    if (restaurants.length > 0) 
    {
        highlights = <div style ={{display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection:'row', flexWrap: 'wrap', margin:'10px', height:'500px', width: '650px'}}>
            {/* Restaurant One  */}
            <Carousel fade variant="dark" >
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={`${restaurants[12].image}`} 
                    alt="First Restaurant"
                    style={{ height:'450px', width: '600px'}}
                    />
                    <Carousel.Caption>
                        <Link to={`restaurants/${restaurants[12]._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[12].name}</h2></Link>
                    </Carousel.Caption>
                </Carousel.Item>
                
            {/* Restaurant Two  */}
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={`${restaurants[5].image}`}
                    alt="Second slide"
                    style={{ height:'450px',  width: '600px'}}
                    />
                    <Carousel.Caption>
                        <Link to={`restaurants/${restaurants[5]._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[5].name}</h2></Link>
                    </Carousel.Caption>
                </Carousel.Item>

                {/* Restaurant Three  */}
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={`${restaurants[1].image}`}
                    alt="Third slide"
                    style={{ height: '450px', width: '600px'}}
                    />
                    <Carousel.Caption>
                        <Link to={`restaurants/${restaurants[8]._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[8].name}</h2></Link>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>

// Previous Style
            // {/* <div style={{ textAlign: 'center', margin:'auto'}}> */}
            //     {/* <Link to={`restaurants/${restaurants[12]._id}`}><h3 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[12].name}</h3></Link> */}
            //     {/* <img src={`${restaurants[12].image}`} style={{ height:'300px', width: '300px'}} /> */}
            //     {/* <p>
            //         {(restaurants[12].rating).toFixed(1)} Stars <br/>
            //         Located at {restaurants[12].address}
            //     </p> */}
            // {/* </div> */}
               
            // {/* <div style={{ textAlign: 'center', margin:'auto'}}> */}
            //     {/* <Link to={`restaurants/${restaurants[5]._id}`}><h3 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[5].name}</h3></Link>
            //     <img src={`${restaurants[5].image}`} style={{ height:'300px',  width: '300px'}}/>
            //     <p>
            //         {(restaurants[5].rating).toFixed(1)} Stars <br/>
            //         Located at {restaurants[5].address}
            //     </p> */}
            // {/* </div> */}

            // {/* <div style={{ textAlign: 'center', margin:'auto'}}> */}
            //     {/* <Link to={`restaurants/${restaurants[8]._id}`}><h3 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[8].name}</h3></Link> */}
            //     {/* <img src={`${restaurants[8].image}`} style={{ height:'300px', width: '300px'}}/>
            //     <p> */}
            //         {/* {(restaurants[8].rating).toFixed(1)} Stars <br/>
            //         Located at {restaurants[8].address} */}
            //     {/* </p> */}
            // {/* </div> */}
       
    }

return (
    <>
    <div className ='form'style={style}>
        <h1> Certified Fresh Restaurants of the Week </h1>
        <h3 style={{textAlign: 'center'}}> Top Three Places To Try This Week </h3>
        {/* Highlighs Here */}
            <div className='form3' style={style}>
                {highlights}
            </div>
            <div className='index'>
                <h1>All Restaurants in NYC</h1><br/>
                <span> Total Restaurants: {restauranttotal}</span>
             </div> <br/>
       <button> Sort By Highest Rating</button>
        <div className="scrollbar bordered-black square thin">
            <div className="force-overflow" style={style}>
                <ScrollToTop style={style2}/>
                {/* All restaurants */}
                {restaurantCards}
            </div>
        </div>
    </div>
    </>
    )
}

export default IndexRestaurants