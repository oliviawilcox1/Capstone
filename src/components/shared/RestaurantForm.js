import React, {useState} from 'react'
import {Form, Container, Button} from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const RestaurantForm = (props) => {
    // props received from create or edit review 
    const { user, id, heading } = props


    return (
        <Container style={{ margin: 'auto'}}>
        <h1>{heading}</h1>
       {/* Submit Form  on clicking button */}
        <Form >
            <Form.Label> Name: </Form.Label>
            <Form.Control 
                    placeholder="Restaurant Name"
                    // value={restaurant.name}
                    name='Name'
            />
            <Form.Label> Image: </Form.Label>
            <Form.Control
                placeholder="Image Link"
                name='review'
            />
            <Form.Label> Description: </Form.Label>
            <Form.Control
                placeholder="Restaurant Description"
                name='review'
            /> 
            <Form.Label> Cuisine: </Form.Label>
            <Form.Control
                placeholder="Restaurant Cuisine"
                name='review'
            /> 
            <Form.Label> Address: </Form.Label>
            <Form.Control
                placeholder="Restaurant Address"
                name='review'
            /> 
            <Form.Label> Number: </Form.Label>
            <Form.Control
                placeholder="Restaurant Number"
                name='review'
            />
            <button type='submit'>Submit</button>  
        </Form>
        </Container>
    )
}

export default RestaurantForm