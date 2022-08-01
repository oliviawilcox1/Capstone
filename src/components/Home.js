import IndexRestaurants from "./restaurants/IndexRestaurants"

const Home = (props) => {
	const {msgAlert, user} = props

	return (
		<>
			<IndexRestaurants user={user} msgAlert={msgAlert}/>
		</>
	)
}

export default Home
