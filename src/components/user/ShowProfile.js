import React, {useEffect, useState} from 'react'
import { getOneUser } from '../../api/profile'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ShowProfile = (props) => {
    const { user } = props
  
    let time = user.createdAt.toString().slice(0,10)  
           console.log("date",time)
          
    
    let futureEats
    // console.log(user)
    if(user) 
    {
        console.log(user.favorites)
        if (user.favorites.length > 0) 
        {
            futureEats = user.favorites.map(favorite => {
                return <li>
                    <div key={favorite.id} style={{width: '700px', textAlign:'center'}}>
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
            <div style={{ textAlign:'center', display:'inline-block'}}>
                <h1 style={{ textDecoration: 'underline'}}> Your Profile </h1>
                <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'alt="" style={{height: '300px', borderRadius: '35px', margin: '0 0 0 15px'}}/>
                <h4 style={{margin: ' 25px'}}>Name: {user.name}</h4>
                <h4 style={{margin: ' 25px'}}>Date Joined: {time}</h4>
            </div>

            <div style={{ textAlign:'right', display:'inline-block'}} class='form'>
                <h2 style={{textAlign: 'center', textDecoration: 'underline'}}> Future Eats </h2>
                    <ul>
                        {futureEats}
                    </ul>
            </div>
        </>
    )
}

export default ShowProfile