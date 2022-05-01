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
    // console.log("ID", id)

    const handleChange = (e) => {

        e.persist()

        addUser()

        setReview(prevReview => {

            const name = e.target.name
            let value = e.target.value

            if(e.target.type === 'number') 
            {
                value = parseInt(e.target.value)
            }

            const update = { [name]: value }
            // console.log(update)
            return {...prevReview, ...update}
        })  
    }
    
    console.log(review)

    const addUser = () => {

        setReview(prevReview => {
            const update = {'owner': user._id}
            return {...prevReview, ...update}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault ()
        // console.log('This is the Review',review)
        createReview(user, id, review)
            .then(() => {
                setUpdated(prev => !prev)
                navigate(`/restaurants/${id}`); 
            })

            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Please try again.',
                    variant: 'danger',
                }))
    }

    return (
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