import React, {useState} from "react";
import ReviewForm from '../shared/ReviewForm'
import { createReview } from "../../api/reviews";


const CreateReview = (props) => {
    const { user, restaurants, triggerRefresh} = props
    const [review, setReview] = useState(null)

    addUser()





    

    const addUser = () => {
        setReview(prevReview => {
            const update = {'owner': user._id}
            return {...prevReview, ...update}
        })
    }

    return (
        <ReviewForm
            review={review}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Write A Review for This Restaurant"
        />
    )

}

export default CreateReview