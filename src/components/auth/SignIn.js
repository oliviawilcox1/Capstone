import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const SignIn = (props) => {
    // For reference for React before Hooks
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		email: '',
	// 		password: '',
	// 	}
	// }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    // For reference 
	// handleChange = (event) =>
	// 	this.setState({
	// 		[event.target.name]: event.target.value,
	// 	})


    // Sign In Function to be called on form submission 
	const onSignIn = (event) => {
        // allows user to type and prevents default 
		event.preventDefault()
		const { msgAlert, setUser } = props
        const credentials = {email, password}
        // Sign In Route called with credentials passed in 
		signIn(credentials)
        // if successful set user with data 
			.then((res) => setUser(res.data.user))
			// .then(() =>
			// 	msgAlert({
			// 		heading: 'Sign In Success',
			// 		message: messages.signInSuccess,
			// 		variant: 'success',
			// 	})
			// )
			.then(() => navigate('/'))
            // else re-set state and send error message alert 
			.catch((error) => {
                setEmail('')
                setPassword('')
				msgAlert({
					heading: 'Sign In Failed with error: ' + error.message,
					message: messages.signInFailure,
					variant: 'danger',
				})
			})
	}

    return (
        <div className='row' class='form'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3 style={{textAlign: 'center'}}class='form2'>Sign In</h3>
                <Form onSubmit={onSignIn}>
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
                    <br/>
                    <div style={{textAlign:'center'}}>
                        <button  type='submit'>
                            Submit
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default SignIn
