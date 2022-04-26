import React, {useState} from "react";
import ReviewForm from '../shared/ReviewForm'
import { createReview } from "../../api/reviews";


const CreateReview = (props) => {
    const { user, triggerRefresh, handleClose} = props
    const [review, setReview] = useState({})

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

        createReview(user, review)
            .then(() => handleClose())

            .then(()=> triggerRefresh())

            .catch(err => 
                console.log(err)
            )
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