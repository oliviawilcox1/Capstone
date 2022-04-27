import React, {useState} from 'react'
import {Form, Container, Button} from 'react-bootstrap'
// import { useParams } from 'react-router-dom'

const ReviewForm = (props) => {
    const { user, review, handleChange, handleSubmit, heading } = props
    console.log('USER', user)


    return (
        <Container>
            <h1>{heading}</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Rating: </Form.Label>
                <Form.Control 
                        placeholder="Pick from 1 through 5"
                        value={review.rating}
                        name='rating'
                        onChange={handleChange}
                />
                <Form.Label>Description: </Form.Label>
                <Form.Control
                    placeholder="This was the most delicious meal I've had in ages! I am dreaming of coming back."
                    value={review.review}
                    name='review'
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>

        </Container>


    )
}

export default ReviewForm