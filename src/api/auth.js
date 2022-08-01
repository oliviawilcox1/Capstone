import apiUrl from '../apiConfig'
import axios from 'axios'
// Axios: Axios is a Javascript library used to make HTTP requests from node. js or XMLHttpRequests from the browser
//  and it supports the Promise API that is native to JS ES6. 
// It can be used intercept HTTP requests and responses and enables client-side protection against XSRF. 
// It also has the ability to cancel requests.

// *********** POST Route for Signing Up  **************
export const signUp = (credentials) => {
	return axios({
		method: 'POST',
		url: apiUrl + '/sign-up',
		data: {
			credentials: {
				email: credentials.email,
				name: credentials.name,
				password: credentials.password,
				password_confirmation: credentials.passwordConfirmation,
			},
		},
	})
}

// *********** POST Route for Signing In **************
export const signIn = (credentials) => {
	return axios({
		url: apiUrl + '/sign-in',
		method: 'POST',
		data: {
			credentials: {
				email: credentials.email,
				password: credentials.password,
			},
		},
	})
}

// *********** DELETE Route for Signing Out **************
export const signOut = (user) => {
	return axios({
		url: apiUrl + '/sign-out',
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
	})
}

// *********** UPDATE Route for Password	 **************
export const changePassword = (passwords, user) => {
	return axios({
		url: apiUrl + '/change-password',
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: {
			passwords: {
				old: passwords.oldPassword,
				new: passwords.newPassword,
			},
		},
	})
}
