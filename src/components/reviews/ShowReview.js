import React, {useState} from 'react'
import {Card, Button } from 'react-bootstrap'
import EditReview from './EditReview'
import {deleteReview} from '../../api/reviews.js'

const ShowReviewModal = (props) => {
    const {review, restaurant, user, triggerRefresh, msgAlert} = props

    const [showEditModal, setEditModel]= useState(false)

    const destroyReview = () => {
        console.log('DESTROYING REVIEW')
        console.log('PRODUCT: ', restaurant._id)
        console.log('REVIEW: ', review._id)
        deleteReview(user, restaurant._id, review._id)
            .then(()=> 
                msgAlert({
                    heading: 'Review Deleted!',
                    message: 'Thank you for your input.',
                    variant: 'success',
                }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch((error) =>
                console.log('ERROR IS: ', error)
            //     msgAlert({
            //         heading: 'Oh No!',
            //         message: error,
            //         variant: 'danger',
            // })
            )
    }


        return (
            <>
            <Card className="m-2">
                <Card.Header >Rating: {review.rating}</Card.Header>
                <Card.Body >
                    <small>{review.review}</small><br/>
                    {
                        user && (user._id === review.owner) 
                        ?
                            <>
                                <Button variant="warning" onClick={() => setShowEditModal(true)}>
                                    Edit Review
                                </Button>
                                <Button onClick={() => destroyReview()}>
                                    Delete Review
                                </Button>
                            </>
                        :
                        null
                    }
                </Card.Body>
            </Card>
            <EditReviewModal 
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