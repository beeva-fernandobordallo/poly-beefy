module.exports = {

	googleAuth: {
		clientID: '288179133923-bb6s17tl9f3f60m77ma4mbmve1fuu7f0.apps.googleusercontent.com',
		clientSecret: '5QVuOlVLjUFpd2jNoYfhXFUv',
		callbackURL: (process.env.NODE_ENV === 'dev') ? 'http://localhost:3000/api/auth/google/callback' : 'http://beeva-externa.westeurope.cloudapp.azure.com:8080/api/auth/google/callback'
	}

};