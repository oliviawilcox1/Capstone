let apiUrl
const apiUrls = {
    // Production url changes during deployment 
	production: 'https://aqueous-atoll-85096.herokuapp.com',
	development: 'http://localhost:8000',
}
// Chooses which ApiUrl to use
if (window.location.hostname === 'localhost') {
	apiUrl = apiUrls.development
} else {
	apiUrl = apiUrls.production
}

export default apiUrl
