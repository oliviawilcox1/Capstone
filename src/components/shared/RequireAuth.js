import { Navigate } from 'react-router-dom'

// Function for requiring user and returning children if the user is not null else rerouting to sign in
export default function RequireAuth({ user, children }) {
	return user !== null ? children : <Navigate to='/sign-in' replace />
}
