import React, {useState} from "react";
import ReviewForm from '../shared/ReviewForm'
import { createReview } from "../../api/reviews";
import { useParams, useNavigate} from 'react-router-dom'

const CreateReview = (props) => {
    const { user, triggerRefresh, handleClose, msgAlert} = props
    const [review, setReview] = useState({})
    // name: '',
    // image: '',
    // description: '',
    // price: '',
    // available: false,
    // category: ''
    const { id } = useParams()
    console.log("ID", id)


    const handleChange = (e) => {

        e.persist()

        addUser()

        setReview(prevReview => {
            const name = e.target.name
            let value = e.target.value

            if(e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const update = { [name]: value }
            console.log(update)
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
        console.log('REVIEW',review)
        createReview(user, id, review)
            .then(() =>
            msgAlert({
                heading: 'Review Created',
                message: 'Thank you for your feedback!',
                variant: 'success',
            }))

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
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Write Your Review"
        />
    )

}

export default CreateReview