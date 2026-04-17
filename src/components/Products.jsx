import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom'
import Axios from 'axios'
import api from './fakeStoreAPI'
import { useState, useEffect } from 'react';

export default function Products() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get();
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);



    if (loading) {
        return <div className="container mt-5"><h2>Loading products...</h2></div>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                {products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body justify-content-between d-flex flex-column">
                                <div className="bg-light rounded p-2 mb-3 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                                    <img src={product.image} alt={product.title} className="card-img-top bg-none rounded mb-3 w-100 h-100" style={{ objectFit: 'contain' }} />
                                </div>
                                <div className="container">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                                    <Button as={Link} to={`/product/${product.id}`} variant="success" className="btn">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}