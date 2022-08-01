import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const linkStyle = {
    color: 'black',
    textDecoration: 'none'
}

// Signed In 
const authenticatedOptions = (
	<>
		{/* <Nav.Link>
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Link> */}
		<Nav.Link >
			<Link to="/" style={linkStyle}>
				Home
			</Link> 
		</Nav.Link>
		<Nav.Link >
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Link>	
	</>
)

// Not Signed In 
const unauthenticatedOptions = (
	<>
        <Nav.Link >
		    <Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Link>
        <Nav.Link>
		    <Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Link>
	</>
)

// const alwaysOptions = (
// 	<>
// 		<Nav.Link>
// 			<Link to='/' style={linkStyle}>
// 				Restaurants
// 			</Link>
// 		</Nav.Link>
// 	</>
// )


const Header = ({ user }) => (

	<Navbar bg='white' variant='dark' class="d-flex ">
		<Navbar.Brand>
            <Link to='/' style={linkStyle}>
                VeganFoodie
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse className="ml-auto m-2 justify-content-end" id='basic-navbar-nav' >
			{/* if user is true show welcome {user.name} with link to their profile */}
			{user && ( <span class="m-2">Welcome, {user.name}!<Link to={`profile/${user._id}`} className='ml-auto m-2' style={linkStyle}>
			Your Profile </Link></span> )}
		</Navbar.Collapse>
		{/* {alwaysOptions} */}
		{/* if user is true show auth options else show unauth options */}
		{user ? authenticatedOptions : unauthenticatedOptions}
	</Navbar>
)

export default Header
