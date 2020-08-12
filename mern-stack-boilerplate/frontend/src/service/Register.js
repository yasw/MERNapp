import axios from 'axios';

const Register = data => (
	axios.post('http://localhost:4000/register', data)
		.then(res => res.status)
)

export default Register;