import React, {useEffect, useState} from 'react'
import { getOneUser } from '../../api/profile'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const ShowProfile = (props) => {
    const { user } = props
    const { id } = useParams

    useEffect(()=> {
        getOneUser(id)
        .then((res) => {
            console.log(res.data.user)
        .catch(err => console.log(err))
    })
})


// going to need to map both the future eats and reviews

let futureEats
if(user) {
if (user.favorites.length > 0) {
futureEats = user.favorites.map(favorite => {
   return <div key={favorite.id} style={{width: '700px', textAlign:'center'}}>
        <Link to={`restaurants/${id}`}><h2 style={{color: 'black', textDecorationLine: 'underline'}}>{favorite}</h2></Link>
    </div>
})
}
}


return (
        <>
        <div style={{width: '40%', textAlign:'left', display:'inline-block'}}>
         <h1 style={{textAlign: 'left', margin: '20px'}}> User Profile </h1>
        <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'alt="" style={{height: '300px', borderRadius: '35px', margin: '0 0 0 15px'}}/>
        <h3 style={{margin: ' 25px'}}>Name: {user.name}</h3>
        <h3 style={{margin: ' 25px'}}>Date Joined: {user.timestamps}</h3>
        </div>
        <div style={{ textAlign:'right', display:'inline-block'}}>
        <h3 style={{textAlign: 'right'}}> Future Eats </h3>
        <ul>
            <li>
                {futureEats}
            </li>
        </ul>
        <h3 style={{textAlign: 'right'}}> Previous Reviews </h3>
        </div>

    </>
    )
}

export default ShowProfile