import React, {useState} from 'react'
import {Form, Container, FormControl, FormLabel} from 'react-bootstrap'

const ReviewForm = (props) => {
    const { user, review, handleChange, handleSubmit, heading } = props
    console.log('USER', user)

    return (
        <Container>
            <h1>{heading}</h1>

            <FormLabel>Rating: </FormLabel>
            <FormControl 
                    placeholder="Pick from 1 through 5"
                    value={review.rating}
                    name='rating'
                    onChange={handleChange}
            />
            <FormLabel>Write Your Review: </FormLabel>
            <FormControl
            placeholder="This was the most delicious meal I've had in ages! I am dreaming of coming back."
            value={review.review}
            name='review'
            onChange={handleSubmit}
            />



        </Container>


    )
}

export default ReviewForm