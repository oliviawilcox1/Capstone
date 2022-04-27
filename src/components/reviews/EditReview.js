import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm'
import { updateReview } from '../../api/reviews'

const EditReview = (props) => {
    const {user, restaurant, show, handleClose, triggerRefresh, msgAlert} = props
    const [review, setReview] = useState(props.review)


    const handleChange = (e) => {
        e.persist()

    setReview((prevReview)=> {
        const name = e.target.name
        let value = e.target.value

        if (e.target.type === 'number') {
            value = parseInt(e.target.value)
        }
        const updatedValue = { [name]: value }
        return { ...prevReview, ...updatedValue };
    })
    }

    const handleSubmit =(e)=> {
        e.preventDefault()

        updateReview(user,review._id, review, restaurant._id)
        .then(()=> handleClose())
        .then(() =>
        msgAlert({
          heading: 'Review updated!',
          message: 'Thank you for your update.',
          variant: 'success',
        })
      )
      .then(() => triggerRefresh())
      // if there is an error, we'll send an error message
      .catch(() =>
        msgAlert({
          heading: 'Oh No!',
          message: 'Please try again later.',
          variant: 'danger',
        })
      )
    }

    return (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <ReviewForm
              review={review}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              heading="Give a product a review!"
            />
          </Modal.Body>
        </Modal>
      );
}
export default EditReview;