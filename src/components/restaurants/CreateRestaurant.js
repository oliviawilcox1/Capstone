import React, {useState} from "react";
import RestaurantForm from '../shared/ReviewForm'
import { useParams, useNavigate} from 'react-router-dom'

const CreateRestaurant = (props) => {
    const { user, triggerRefresh, handleClose, msgAlert} = props

    return (
        // pass props down and functions to review form component
        // <RestaurantForm
        //     restaurant={restaurant}
        //     id={id}
        //     user={user}
        //     handleChange={handleChange}
        //     handleSubmit={handleSubmit}
        //     heading="Write Your Review"
        // />
        <>
        <h1>Need to create a post for your website?</h1>
        </>
    )
}

export default CreateRestaurant