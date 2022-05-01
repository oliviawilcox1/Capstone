import React, {useState} from 'react'
import {Card, Button } from 'react-bootstrap'
import EditReview from './EditReview'
import {deleteReview} from '../../api/reviews.js'

const ShowReviewModal = (props) => {
    const {user, review, restaurant, triggerRefresh, id, msgAlert} = props
    const [showEditModal, setShowEditModal]= useState(false)

    const destroyReview = () => {
        // console.log('DESTROYING REVIEW')
        // console.log('REVIEW: ', review._id)
        deleteReview(user, review._id)
            .then(()=> console.log('Success'))
            .then(() => triggerRefresh())
            .catch((error) => console.log(error))
    }

    let cards
    // console.log('USER ID',user._id)

    for (const i in review) {

        if (review.restaurant_id == id) 
        {
            // console.log('RESTAURANT ID',review.restaurant._id)
            return (
                cards =  <>
                <Card className="m-2">
                    <Card.Header >Rating: {review.rating}</Card.Header>
                    <Card.Body >
                        <small>{review.review}</small><br/>
                        {
                            user && (user._id === review.owner._id) 
                            
                            ?
                                <>
                                    <Button variant="warning" onClick={() => setShowEditModal(true)}>
                                        Edit Review
                                    </Button>
                                    <Button onClick={() => destroyReview()} >
                                        Delete Review
                                    </Button>
                                </>
                            :
                            null
                        }
                    </Card.Body>
                </Card>
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