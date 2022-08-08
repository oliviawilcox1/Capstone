import React, {useState} from "react";
import RestaurantForm from '../shared/RestaurantForm'
import { useParams, useNavigate} from 'react-router-dom'

const CreateRestaurant = (props) => {
    const { user, triggerRefresh, handleClose, restaurant, msgAlert} = props
    const {id} = useParams()

    return (
        // pass props down and functions to review form component
        <RestaurantForm
            id={id}
            user={user}
            // handleChange={handleChange}
            // handleSubmit={handleSubmit}
            heading="Submit Your Restaurant Info For Review"
        />
        // <>
        // <h1>Need to create a post for your website?</h1>
        // </>
    )
}

export default CreateRestaurant