import IndexRestaurants from "./restaurants/IndexRestaurants"

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)
	const {msgAlert, user} = props
	

	return (
		<>
			<h2 class="d-flex justify-content-center">Restaurants</h2>
			<IndexRestaurants user={user} msgAlert={msgAlert}/>
		</>
	)
}

export default Home
