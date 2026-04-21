import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from './fakeStoreAPI'
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal'
import LoadingSpinner from './LoadingSpinner'
import DeleteProduct from './DeleteProduct'
import EditProduct from './EditProduct'
import NavBar from './NavBar'

export default function ProductDetails() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [cartMessage, setCartMessage] = useState('')
    const [showEditModal, setShowEditModal] = useState(false)
    const timeoutRef = useRef(null)

    useEffect(() => {
        const fetchProduct = async () => {
        try {
            const response = await api.get(`${id}`)
            setProduct(response.data)
        } catch (err) {
            console.error('Error fetching product:', err)
            setError('Unable to load product details.')
        } finally {
            setLoading(false)
        }
        }

        if (id) {
        fetchProduct()
        }
    }, [id])

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
        }
    }, [])

    const handleEditSuccess = async () => {
        setShowEditModal(false)
        // Refetch the product to show updated data
        try {
            const response = await api.get(`${id}`)
            setProduct(response.data)
        } catch (err) {
            console.error('Error refetching product:', err)
        }
    }

    if (loading) {
        return (
            <div className="container mt-5">
                <LoadingSpinner label="Loading product..." />
            </div>
        )
    }

    if (error) {
        return <div className="container mt-5"><h2>{error}</h2></div>
    }

    if (!product) {
        return <div className="container mt-5"><h2>Product not found.</h2></div>
    }

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <div className="card shadow-sm">
                    <div className="row g-0">
                        <div className="col-md-4 p-3 d-flex align-items-center justify-content-center">
                            <div className="bg-light rounded p-2 w-100 h-100 d-flex align-items-center justify-content-center">
                                <img
                                src={product.image}
                                alt={product.title}
                                className="img-fluid bg-light rounded"
                                style={{ maxHeight: '400px', objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h1 className="card-title">{product.title}</h1>
                                <p className="card-text"><strong>Category:</strong> {product.category}</p>
                                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                                <p className="card-text"><strong>Description:</strong> {product.description}</p>
                                {product.rating && (
                                    <p className="card-text text-muted">
                                    Rating: {product.rating.rate} / 5 ({product.rating.count} reviews)
                                    </p>
                                )}
                                <div className="row text-center position-relative">
                                    {cartMessage && (
                                        <div className="add-cart-toast">
                                            {cartMessage}
                                        </div>
                                    )}
                                    <Link to="/productpage" className="btn col btn-secondary mt-3">
                                        Back to Products
                                    </Link>
                                    <Button
                                        variant="primary"
                                        className="btn col mt-3 ms-3"
                                        onClick={() => {
                                            setCartMessage('Added to cart!')
                                            if (timeoutRef.current) {
                                                clearTimeout(timeoutRef.current)
                                            }
                                            timeoutRef.current = window.setTimeout(() => {
                                                setCartMessage('')
                                                timeoutRef.current = null
                                            }, 2500)
                                        }}
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                                <div className="row mt-4">
                                    <div className="col">
                                        <Button variant="warning" as={Link} to={`/editproduct/${id}`} className="btn w-100">
                                            Edit Product
                                        </Button>
                                    </div>
                                    <div className="col">
                                        <DeleteProduct productId={ id } />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
