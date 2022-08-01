import React, {useEffect, useState} from 'react'
// import { getOneUser } from '../../api/profile'
import { Link } from 'react-router-dom'

import { Container, Row, Col } from 'react-bootstrap'

const ShowProfile = (props) => {
    const { user } = props
    const style = {
        display: 'flex',
        width: "50%",
  
    }

    // To get the date joined of the user slice the created at data then turn it into a date then string then slice accordingly
    let time = user.createdAt.toString().slice(0,10)  
    const date = new Date(time).toDateString().slice(3,10)
    const year = new Date(time).toDateString().slice(10,15)
    
    // if there is a user then log their favorites
    let futureEats
    if(user) 
    {
        console.log(user.favorites)
        // if their favorites array is not empty
        if (user.favorites.length > 0) 
        {
            // map over the favorites array to return each restaurant info in their favorites
            futureEats = user.favorites.map(favorite => {
            return <li>
                <div key={favorite.id}>  
                  <Link to={`/restaurants/${favorite._id}`}><h3 style={{color: 'black', textDecorationLine: 'underline'}}>{favorite.name} </h3>
                    </Link>
                   <aside> <button style={{fontSize: '10px'}}>X</button></aside>
                </div>  
           </li>
            })
        } 
        // else if there are no favorites
        else 
        {
            futureEats = <li>
                <div style={{width: '700px', textAlign:'center'}}> 
                    <p>See Restaurants You have Saved Here!</p>
                </div> 
            </li>
        }
    }


    return (
        <>
            <Container>
                <Row>
                    <div  style={{width: "50%", margin: 'auto'}}>
                    <Col>
                        <h2 style={{ textDecoration: 'underline', margin: '20px'}}> {user.name}'s Profile </h2>
                        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'alt="" style={{height: '300px', borderRadius: '35px'}}/>
                        <h4 style={{margin: ' 20px'}}>Date Joined: {date}, {year}</h4>
                    </Col>
                    </div>
                    <div style={{width: "50%", textAlign: 'center', marginRight: '0px'}}>
                    <Col>
                        <h2 class='form'style={{ textDecoration: 'underline'}}> Future Eats </h2>
                            <ul >
                                {futureEats}
                            </ul>
                    </Col>
                    </div>
                </Row>
            </Container>
        </>
    )
}


export default ShowProfile