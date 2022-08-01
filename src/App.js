// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import ShowRestaurant from './components/restaurants/ShowRestaurant'
import CreateReview from './components/reviews/CreateReview'
import ShowProfile from './components/user/ShowProfile'
import { Link } from 'react-router-dom'

const App = () => {

  const [user, setUser] = useState(null)
  const [msgAlerts, setMsgAlerts] = useState([])

//   Sets User to Null when user logs out
  const clearUser = () => {
    console.log('clear user ran')
    setUser(null)
  }

// Delete function passed to Auto dismiss Alert Component
	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	// Sets Message Alerts 
	const msgAlert = ({ heading, message, variant }) => {
		// creates unique id identified
		const id = uuid()
		setMsgAlerts(() => {
			// set message alert with params 
			return (
				[{ heading, message, variant, id }]
      )
		})
	}

		return (
			<Fragment>
				{/* Header Component */}
				<Header user={user} />
				
				<Routes>
					{/* Home Component */}
					<Route path='/' element={
						<Home msgAlert={msgAlert} user={user} />}
					/>
					{/* Sign Up Component */}
					<Route
						path='/sign-up'
						element={
							<SignUp msgAlert={msgAlert} setUser={setUser} 
						/>}
					/>
					{/* Sign In Component */}
					<Route
						path='/sign-in'
						element={
							<SignIn msgAlert={msgAlert} setUser={setUser} 
						/>}
					/>
					{/* Show Restaurant Component */}
					<Route 
						path="restaurants/:id"
						element={
							<ShowRestaurant user ={user} 
						/>}
					/>
					{/* ShowPorfile Component */}
					<Route 
						path="profile/:id"
						element={
						<RequireAuth user={user}>
							<ShowProfile user ={user} />
						</RequireAuth>}
					/>
					{/* Sign Out Component */}
					<Route
						path='/sign-out'
						element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
						}
					/>
					{/* Change Password Component  */}
					<Route
						path='/change-password'
						element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					{/* Create Review Component */}
					<Route 
						path='/reviews/:id'
						element={
							<RequireAuth user={user}>
								<CreateReview msgAlert={msgAlert} user={user}/>
							</RequireAuth>
						}
					/>
					</Routes>
					{/* Map across Message alerts to pass to auto dismiss alert which mounts and unmounts the alert */}
					{msgAlerts.map((msgAlert) => (
						// define props passed down
						<AutoDismissAlert
							key={msgAlert.id}
							heading={msgAlert.heading}
							variant={msgAlert.variant}
							message={msgAlert.message}
							id={msgAlert.id}
							deleteAlert={deleteAlert}
						/>
					))}
			</Fragment>
		)
}

export default App
