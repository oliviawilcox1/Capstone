import React, {useState} from 'react'
import {Form, Container, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const RestaurantForm = (props) => {
    // props received from create or edit review 
    const { user, id, restaurant, heading } = props

    return (
        <Container style={{ margin: 'auto'}}>
       
        <h1>{heading}</h1>
       {/* Submit Form  on clicking button */}
        {/* <Form >
            <Form.Label></Form.Label>
            <Form.Control 
                    placeholder="Pick from 1 through 5"
                    value={review.rating}
                    name='rating'
            
            />
            <Form.Label >Description: </Form.Label>
            <Form.Control
                placeholder="This was the most delicious meal I've had in ages! I am dreaming of coming back."
                value={review.review}
                name='review'
            
            />
            <button type='submit'>Submit</button>  
        </Form> */}
        <Form>
            <Form.Label> Name </Form.Label>
            <Form.Control 
                    placeholder="Your Restaurant Name"
                    value={restaurant.name}
                    name='Name'
            />
        </Form>
        </Container>
    )
}

export default RestaurantForm