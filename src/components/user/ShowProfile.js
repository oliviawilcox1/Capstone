import React, {useEffect, useState} from 'react'
import { getOneUser } from '../../api/profile'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ShowProfile = (props) => {
    const { user } = props
  

//     useEffect(()=> {
//         getOneUser(user.id)
//         .then((res) => {
//             console.log(res.data.user)
//         .catch(err => console.log(err))
//     })
// })

    
    let time = user.createdAt.toString().slice(0,10)  
           console.log("date",time)
          
   
    

console.log(user)
let futureEats
if(user) {
    console.log(user.favorites)
if (user.favorites.length > 0) {
futureEats = user.favorites.map(favorite => {
   return <div key={favorite.id} style={{width: '700px', textAlign:'center'}}>
       <Link to={`/restaurants/${favorite._id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{favorite.name}</h2>
       </Link>
    </div>
})
} else {
     futureEats = <div> <h6>See Restaurants You have Saved Here!</h6></div> 
}
}


return (
        <>
        <div style={{width: '40%', textAlign:'left', display:'inline-block'}}>
         <h1 style={{textAlign: 'left', margin: '20px', textDecoration: 'underline'}}> Your Profile </h1>
        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'alt="" style={{height: '300px', borderRadius: '35px', margin: '0 0 0 15px'}}/>
        <h3 style={{margin: ' 25px'}}>Name: {user.name}</h3>
        <h3 style={{margin: ' 25px'}}>Date Joined: {time}</h3>
        </div>
        <div style={{ textAlign:'right', display:'inline-block'}}>
        <h2 style={{textAlign: 'right'}}> Future Eats </h2>
        <ul style={{textAlign: 'right'}} >
            <li>
                {futureEats}
            </li>
        </ul>
        {/* <h3 style={{textAlign: 'right'}}> Previous Reviews </h3> */}
        </div>

    </>
    )
}

export default ShowProfile