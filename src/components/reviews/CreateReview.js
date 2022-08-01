import React, {useState} from "react";
import ReviewForm from '../shared/ReviewForm'
import { createReview } from "../../api/reviews";
import { useParams, useNavigate} from 'react-router-dom'

const CreateReview = (props) => {
    const { user, triggerRefresh, handleClose, msgAlert} = props
    const [review, setReview] = useState({})
    const [updated, setUpdated] = useState(false);
    const { id } = useParams()
    const navigate = useNavigate();

    // Handle Change Function to store data user is typing 
    const handleChange = (e) => {
        e.persist()
        // First Add User 
        addUser()
        // Then update state and set new review from previous reviews
        setReview(prevReview => {
            // add review to correct target name and value
            const name = e.target.name
            let value = e.target.value
            // If the type is a number, turn string to number
            if(e.target.type === 'number') 
            {
                value = parseInt(e.target.value)
            }
            // Update the review with correct values
            const update = { [name]: value }
            return {...prevReview, ...update}
        })  
    }

    // Add User Function  to add owner and user id to the review 
    const addUser = () => {
        setReview(prevReview => {
            const update = {'owner': user._id}
            return {...prevReview, ...update}
        })
    }

    // Handle Submit function for when review form is submitted
    const handleSubmit = (e) => {
        e.preventDefault ()
        // Create Review Route called and params passed in
        createReview(user, id, review)
            .then(() => {
                // change state and update is now true
                setUpdated(prev => !prev)
                // then navigate to show page of restaurant 
                navigate(`/restaurants/${id}`); 
            })
            // if error send message alert
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Please try again.',
                    variant: 'danger',
                }))
    }

    return (
        // pass props down and functions to review form component
        <ReviewForm
            review={review}
            id={id}
            user={user}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Write Your Review"
        />
    )
}

export default CreateReview