import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const ChangePassword = (props) => {
    // For reference before Hooks - with classes
	// constructor(props) {
	// 	super(props)

	// 	this.state = {
	// 		oldPassword: '',
	// 		newPassword: '',
	// 	}
	// }

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const navigate = useNavigate()

    // Change Password Function to be called on Form Submission 
	const onChangePassword = (event) => {
		event.preventDefault()
        // prevents event default 
		const { msgAlert, user } = props
        const passwords = {oldPassword, newPassword}

        // call change passwor route with both passwords and user passed in as params
		changePassword(passwords, user)
        // then send success message 
			.then(() =>
				msgAlert({
					heading: 'Change Password Success',
					message: messages.changePasswordSuccess,
					variant: 'success',
				})
			)
			.then(() => navigate('/'))
            // if not successful, send error message 
			.catch((error) => {
				setOldPassword('')
                setNewPassword('')
				msgAlert({
					heading: 'Change Password Failed with error: ' + error.message,
					message: messages.changePasswordFailure,
					variant: 'danger',
				})
			})
	}



    return (
        <div className='row'>
            <div className='col-sm-10 col-md-8 mx-auto mt-5'>
                <h3>Change Password</h3>
                <Form onSubmit={onChangePassword}>
                    <Form.Group controlId='oldPassword'>
                        <Form.Label>Old password</Form.Label>
                        <Form.Control
                            required
                            name='oldPassword'
                            value={oldPassword}
                            type='password'
                            placeholder='Old Password'
                            onChange={e => setOldPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId='newPassword'>
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            required
                            name='newPassword'
                            value={newPassword}
                            type='password'
                            placeholder='New Password'
                            onChange={e => setNewPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default ChangePassword