// import React, { Component } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignUp = (props) => {
    // For reference - before hooks 
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 		passwordConfirmation: '',
	// 	}
	// }    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate()

    // Function to be called on Form Submission 
	const onSignUp = (event) => {
		event.preventDefault()
        // prevents default and allows user to continue filling out text
		const { msgAlert, setUser } = props
        const credentials = {email, name, password, passwordConfirmation}

        // Hits sign Up route with credentials 
		signUp(credentials)
        // if successful signs in 
			.then(() => signIn(credentials))
            // then sets user and user.data
			.then((res) => setUser(res.data.user))
			.then(() =>
            // alerts successful 
				msgAlert({
					heading: 'Sign Up Success',
					message: messages.signUpSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
            // if error reset state and send error
			.catch((error) => {
                setEmail('')
                setName('')
                setPassword('')
                setPasswordConfirmation('')
				msgAlert({
					heading: 'Sign Up Failed with error: ' + error.message,
					message: messages.signUpFailure,
					variant: 'danger',
				})
			})
	}


    return (
        <div className='row' class='form'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3 style={{textAlign: 'center'}}class = 'form2'>Sign Up</h3>
                <Form  onSubmit={onSignUp}>
                    <Form.Group controlId='email'>
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            type='email'
                            name='email'
                            value={email}
                            placeholder='Enter email'
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='name'>
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            type='name'
                            name='name'
                            value={name}
                            placeholder='Enter name'
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            name='password'
                            value={password}
                            type='password'
                            placeholder='Password'
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='passwordConfirmation'>
                        <Form.Label></Form.Label>
                        <Form.Control
                            required
                            name='passwordConfirmation'
                            value={passwordConfirmation}
                            type='password'
                            placeholder='Confirm Password'
                            onChange={e => setPasswordConfirmation(e.target.value)}
                        />
                    </Form.Group>
                    <br/>
                    <div style={{textAlign:'center'}}>
                    <button type='submit'>
                        Submit
                    </button>
                    </div>
                </Form>
            </div>
        </div>
    )

}

export default SignUp