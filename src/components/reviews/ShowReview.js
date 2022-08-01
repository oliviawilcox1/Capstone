import React, {useState} from 'react'
import {Card, Button } from 'react-bootstrap'
import EditReview from './EditReview'
import {deleteReview} from '../../api/reviews.js'

const ShowReviewModal = (props) => {
    const {user, review, restaurant, triggerRefresh, id, msgAlert} = props
    const [showEditModal, setShowEditModal]= useState(false)

    // Delete Review Function Called on Delete Review Button 
    const destroyReview = () => {
        // Helpful to double check you are deleting the correct review 
        // console.log('DESTROYING REVIEW', review._id)
        // Delete Review Route Called 
        deleteReview(user, review._id)
            // then console log successful 
            .then(()=> console.log('Success'))
            .then(() => triggerRefresh())
            // console log errors if .then is not succesful 
            .catch((error) => console.log(error))
    }

    let cards
    for (const i in review) {
        // for each review object in review array 
        if (review.restaurant_id == id) 
        // if the review restaurant id matches the id in the show page which is the restaurant id then show that restaurants reviews 
        {
            return (
                // set cards as JSX Element to return review cards 
                cards =  <>
                <Card className="m-2">
                    <Card.Header >Rating: {review.rating}</Card.Header>
                    <Card.Body> <small>{review.review}</small> <br/>
                        {/* Ternary Operator */}
                        {/* If there is a user and the user id matches the review owner id */}
                        { user && (user._id === review.owner._id) ?
                            <>
                                {/* Then allow them to edit and delete their own review */}
                                <button variant="warning" onClick={() => setShowEditModal(true)}> Edit Review </button>
                                <button onClick={() => destroyReview()}> Delete Review </button>
                            </>
                            // else 
                            : null
                        }
                    </Card.Body>
                </Card>

                {/* Pass Props and Functions */}
                <EditReview
                    user={user}
                    restaurant={restaurant}
                    review={review}
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    msgAlert={msgAlert}
                    triggerRefresh={triggerRefresh}
                />
            </>
            )
        }
    }

    return (
        <>
            {cards}
        </>
    )
}

export default ShowReviewModal