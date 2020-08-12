import axios from 'axios';

const ProductService = data => (
	axios.post('http://localhost:4000/productservice', data)
		.then(res => res.status)
)

export default ProductService;