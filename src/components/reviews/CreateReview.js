import React, {useState} from "react";
import ReviewForm from '../shared/ReviewForm'
import { createReview } from "../../api/reviews";
import { useParams, useNavigate} from 'react-router-dom'

const CreateReview = (props) => {
    const { user, triggerRefresh, handleClose, msgAlert} = props
    const [review, setReview] = useState({})
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
            return {...prevReview, ...update}

        })

    }
    

    const addUser = () => {
        setReview(prevReview => {
            const update = {'owner': user._id}
            return {...prevReview, ...update}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault ()
        
        createReview(user._id, id, review)
            .then(() =>
            msgAlert({
                heading: 'Review Created',
                message: 'Thank you for your feedback!',
                variant: 'success',
            }))

            .catch(err => 
                console.log(err)
            )
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