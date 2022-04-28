import React, {useEffect, useState} from 'react'
import { getOneUser } from '../../api/profile'
import { useParams } from 'react-router-dom'


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

return (
        <>
      <p> {user.name}</p>
    </>
    )
}

export default ShowProfile