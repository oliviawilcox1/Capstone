import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import ReviewForm from '../shared/ReviewForm'
import { updateReview } from '../../api/reviews'

const EditReview = (props) => {
  const {user, restaurant, show, handleClose, triggerRefresh, msgAlert, setModalOpen} = props
  const [review, setReview] = useState(props.review)

  // Function to handle user continuing to type 
  const handleChange = (e) => {
    e.persist()
    // Set State and new review to updated value 
    setReview((prevReview)=> {
      const name = e.target.name
      let value = e.target.value
      // If the type is a number set it to a string 
      if (e.target.type === 'number') 
      {
        value = parseInt(e.target.value)
      }
      // Set Updated Value at correct key 
      const updatedValue = { [name]: value }
      // return the updated review 
      return { ...prevReview, ...updatedValue };
    })
  }

  
  const handleSubmit =(e)=> {
    
      e.preventDefault()
      // Update Route Called with user and review passed in 
      updateReview(user,review)
      // handle close and refresh 
        .then(()=> handleClose())
        .then(() => triggerRefresh())
        .catch((err) => console.log(err))
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