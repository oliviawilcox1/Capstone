import React from 'react'
import Alert from 'react-bootstrap/Alert'
import './AutoDismissAlert.scss'

// Auto Dismiss Alert Component Class Defined 
class AutoDismissAlert extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			show: true,
		}
		this.timeoutId = null
	}

	// Message Alert Displayed with handle close function displayed - and timeoutId returned 
	componentDidMount() {
		this.timeoutId = setTimeout(this.handleClose, 5000)
	}

	// clear timeout with Id
	componentWillUnmount() {
		clearTimeout(this.timeoutId)
	}

	// hides alert 
	handleClose = () => this.setState({ show: false })

	render() {
		const { variant, heading, message, deleteAlert, id } = this.props

		// Delete this alert after the fade animation time (300 ms by default)
		if (!this.state.show) {
			setTimeout(() => {
				deleteAlert(id)
			}, 300)
		}

		return (
			<Alert
				dismissible
				show={this.state.show}
				variant={variant}
				onClose={this.handleClose}>
				<div className='container'>
					<Alert.Heading>{heading}</Alert.Heading>
					<p className='alert-body'>{message}</p>
				</div>
			</Alert>
		)
	}
}

export default AutoDismissAlert
