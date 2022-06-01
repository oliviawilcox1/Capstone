import React, {useEffect, useState} from 'react'
import { getOneUser } from '../../api/profile'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const ShowProfile = (props) => {
    const { user } = props
  
    const style = {
        display: 'flex',
        width: "50%",
  
    }

    let time = user.createdAt.toString().slice(0,10)  
           console.log("date",time)

    const date = new Date(time).toDateString().slice(3,10)
    const year = new Date(time).toDateString().slice(10,15)
    console.log(date)
    
    let futureEats
    // console.log(user)
    if(user) 
    {
        console.log(user.favorites)
        if (user.favorites.length > 0) 
        {
            futureEats = user.favorites.map(favorite => {
                return <li>
                    <div key={favorite.id} >
                        <Link to={`/restaurants/${favorite._id}`}><h5 style={{color: 'black', textDecorationLine: 'underline'}}>{favorite.name}</h5>
                        </Link>
                    </div>
                </li>
            })
        } 
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
                        {/* <h4 style={{margin: ' 25px'}}>Name: {user.name}</h4> */}
                        <h4 style={{margin: ' 20px'}}>Date Joined: {date}th, {year}</h4>
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