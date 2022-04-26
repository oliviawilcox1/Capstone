import React, {useState} from 'react'
import {Form, Container, FormControl, FormLabel, Button} from 'react-bootstrap'

const ReviewForm = (props) => {
    const { user, review, handleChange, handleSubmit, heading } = props
    console.log('USER', user)

    return (
        <Container>
            <h1>{heading}</h1>
            <Form onSubmit={handleSubmit}>
                <FormLabel>Rating: </FormLabel>
                <FormControl 
                        placeholder="Pick from 1 through 5"
                        value={review.rating}
                        name='rating'
                        onChange={handleChange}
                />
                <FormLabel>Description: </FormLabel>
                <FormControl
                    placeholder="This was the most delicious meal I've had in ages! I am dreaming of coming back."
                    value={review.review}
                    name='review'
                    onChange={handleSubmit}
                />
                <Button type='submit'>Submit</Button>
            </Form>

        </Container>


    )
}

export default ReviewForm