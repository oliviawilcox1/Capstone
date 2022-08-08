import React, {useEffect, useState} from 'react'
import ScrollToTop from 'react-scroll-to-top'
import { getAllRestaurants, getRestaurantSum, getRestaurantFilter } from '../../api/restaurants'
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
    const [sorted, setSorted] = useState(null)
    const [updated, setUpdated] = useState(false);
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
        // getRestaurantSum()
        //     .then(res => {
        //         // Update State and set restaurants as the res.data.sum
        //         setRestaurantTotal(res.data.sum)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        getRestaurantFilter()
            .then(res => {
                // Update State and set restaurants as the res.data.filter
                setSorted(res.data.filter)
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


    let highlight1

    for (const i in restaurants){
        if(restaurants[i].name === "Spicy Moon" ){
            highlight1 = <div style ={{display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection:'row', flexWrap: 'wrap', margin:'10px', height:'500px', width: '650px'}}>
           <Carousel fade variant="dark" >
            {console.log(restaurants[i])}
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={`${restaurants[i].image}`} 
                alt="First Restaurant"
                style={{ height:'450px', width: '600px'}}
                />
                <Carousel.Caption>
                    <Link to={`restaurants/${restaurants[i]._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[i].name}</h2></Link>
                </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
            </div>
        }
        // else if (restaurants[i].name === "Beyond Sushi"){
        //     <Carousel.Item>
        //     <img
        //     className="d-block w-100"
        //     src={`${restaurants[i].image}`}
        //     alt="Second slide"
        //     style={{ height:'450px',  width: '600px'}}
        //     />
        //     <Carousel.Caption>
        //         <Link to={`restaurants/${restaurants[i]._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[i].name}</h2></Link>
        //     </Carousel.Caption>
        // </Carousel.Item>
        // } else if (restaurants[i].name === "Modern Love"){
        //     <Carousel.Item>
        //     <img
        //     className="d-block w-100"
        //     src={`${restaurants[i].image}`}
        //     alt="Third slide"
        //     style={{ height: '450px', width: '600px'}}
        //     />
        //     <Carousel.Caption>
        //     <Link to={`restaurants/${restaurants[i]._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[i].name}</h2></Link>
        //     </Carousel.Caption>
        //     </Carousel.Item>
        // }

    }

    // // Assign Highlights to be shown
    // let highlights
    // if (restaurants.length > 0) 
    // {
    //     highlights = <div style ={{display: 'flex', justifyContent: 'center', alignItems: "center", flexDirection:'row', flexWrap: 'wrap', margin:'10px', height:'500px', width: '650px'}}>
    //         {/* Restaurant One  */}
    //         <Carousel fade variant="dark" >
    //             <Carousel.Item>
    //                 <img
    //                 className="d-block w-100"
    //                 src={`${restaurants[12].image}`} 
    //                 alt="First Restaurant"
    //                 style={{ height:'450px', width: '600px'}}
    //                 />
    //                 <Carousel.Caption>
    //                     <Link to={`restaurants/${restaurants[12]._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[12].name}</h2></Link>
    //                 </Carousel.Caption>
    //             </Carousel.Item>
         
    //         {/* Restaurant Two  */}
    //             <Carousel.Item>
    //                 <img
    //                 className="d-block w-100"
    //                 src={`${restaurants[5].image}`}
    //                 alt="Second slide"
    //                 style={{ height:'450px',  width: '600px'}}
    //                 />
    //                 <Carousel.Caption>
    //                     <Link to={`restaurants/${restaurants[5]._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[5].name}</h2></Link>
    //                 </Carousel.Caption>
    //             </Carousel.Item>

    //             {/* Restaurant Three  */}
    //             <Carousel.Item>
    //                 <img
    //                 className="d-block w-100"
    //                 src={`${restaurants[1].image}`}
    //                 alt="Third slide"
    //                 style={{ height: '450px', width: '600px'}}
    //                 />
    //                 <Carousel.Caption>
    //                     <Link to={`restaurants/${restaurants[8]._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{restaurants[8].name}</h2></Link>
    //                 </Carousel.Caption>
    //             </Carousel.Item>
    //         </Carousel>
    //     </div>

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
        
    // }


    // Map through Restaurants if they are present and assign them to restaurant cards in Sorted Order
    if(!sorted) 
    {
        return <h1>Loading...</h1>
    } 

    // Sorted Information to be displayed if user chooses to sort by highest rating
    let sortedCards
    if (sorted.length > 0)
    {
        sortedCards = sorted.map(r=> {
            return <div key={r.id} style={{width: '700px', textAlign:'center'}}>
            <Link to={`restaurants/${r._id}`}>
                <h2 style={{color: 'black', textDecorationLine: 'underline'}}>{r.name}</h2>
            </Link>
            <p>
                {(r.rating).toFixed(1)} Stars <br/>
                {r.visitors} Visitors <br/>
                Located at {r.address} <br/>
            </p>
            <img src={`${r.image}`} style={{ height: '350px', width: '550px'}}/>
        </div>
        })
    }

  // Function to set State to Change the restaurants to sorted restaurants
  const handleClick = (e) => {
    setRestaurants(sorted)
}

return (
    <>
    <div className ='form'style={style}>
        <h1> Certified Fresh Restaurants of the Week </h1>
        <h3 style={{textAlign: 'center'}}> Top Restaurant To Try This Week </h3>
        {/* Highlight Here */}
            <div className='form3' style={style}>
                {highlight1}
            </div>
            <div className='index'>
                <h1>All Restaurants in NYC</h1><br/>
                <span> Total Restaurants: {restaurants.length}</span>
             </div> <br/>
       <button onClick={handleClick}> Sort By Highest Rating</button>
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