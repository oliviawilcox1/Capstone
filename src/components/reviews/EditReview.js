import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm'
import { updateReview } from '../../api/reviews'

const EditReview = (props) => {
    const {user, restaurant, show, handleClose, triggerRefresh, msgAlert, setModalOpen} = props
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
        console.log('UPDATED VALUE', updatedValue)
        return { ...prevReview, ...updatedValue };
    })
    }

    const handleSubmit =(e)=> {
        e.preventDefault()

        updateReview(user,review)
          .then(()=> handleClose())
         .then(() => triggerRefresh())
        // if there is an error, we'll send an error message
        .catch((err) =>
            console.log(err)
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