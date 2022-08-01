import { useNavigate } from 'react-router-dom'

import {Button, ButtonGroup} from 'react-bootstrap'

import { signOut } from '../../api/auth'
import messages from '../shared/AutoDismissAlert/messages'


const SignOut = (props) => {
	const { msgAlert, clearUser, user } = props
    const navigate = useNavigate()
    // function called in form submission 
    const onSignOut = () => {
		signOut(user)
        // calls delete route to sign out user
			.finally(() => navigate('/'))
			.finally(() => clearUser())
    }
    // function called if cancel button clicked 
    const onCancel = () => {
        navigate('/')
    }

	return (
		<>
            <div className='row' class ='form'>
                <div style={{textAlign: 'center'}} >
                    <h2>Signing off?</h2>
                    <small>We look forward to welcoming you back!</small><br/>
                        <button onClick={onSignOut}>
                            Sign Out
                        </button>
                        <button onClick={onCancel}>
                            Cancel
                        </button>
                </div>
            </div>
		</>
	)
}

export default SignOut
