import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import api from './fakeStoreAPI'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import { useParams, Link } from 'react-router-dom'
import NavBar from './NavBar'
import LoadingSpinner from './LoadingSpinner'

export default function EditProduct() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalVariant, setModalVariant] = useState('success')
    const [modalMessage, setModalMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState('')
    const { id } = useParams()

    const validateForm = () => {
        const newErrors = {}
        if (!title.trim()) {
            newErrors.title = 'Title is required'
        }
        if (!price || parseFloat(price) <= 0) {
            newErrors.price = 'Valid price is required'
        }
        if (!description.trim()) {
            newErrors.description = 'Description is required'
        }
        if (!category.trim()) {
            newErrors.category = 'Category is required'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!validateForm()) {
            return
        }
        setIsSubmitting(true)
        try {
            await api.put(`/${id}`, {
                title: title.trim(),
                price: parseFloat(price),
                description: description.trim(),
                category: category.trim()
            })
            setShowModal(true)
            setModalVariant('success')
            setModalMessage('Product updated successfully!')
        } catch {
            setShowModal(true)
            setModalVariant('danger')
            setModalMessage('Error updating product.')
        } finally {
            setIsSubmitting(false)
        }
    }

    
    useEffect(() => {
        const getProductInfo = async () => {
            setLoading(true)
            try {
                const response = await api.get(`/${id}`)
                const { title, price, description, category } = response.data
                setTitle(title)
                setPrice(price)
                setDescription(description)
                setCategory(category)
                setFetchError('')
            } catch (error) {
                console.error('Error fetching product for edit:', error)
                setFetchError('Unable to load this product for editing.')
            } finally {
                setLoading(false)
            }
        }

        getProductInfo()
    }, [id])

    if (loading) {
        return (
            <>
                <NavBar />
                <div className="container mt-5">
                    <LoadingSpinner label="Loading product form..." />
                </div>
            </>
        )
    }

    if (fetchError) {
        return (
            <>
                <NavBar />
                <div className="container mt-5">
                    <Alert variant="danger">{fetchError}</Alert>
                    <Button as={Link} to="/products" variant="secondary">
                        Back to Products
                    </Button>
                </div>
            </>
        )
    }
    
    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <h2>Edit Product</h2>
                <Alert variant="info">
                    FakeStoreAPI will respond as if the update succeeded, but the change will not persist.
                </Alert>
                <div className="container mt-4">
                    <Form noValidate onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="editTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                className="bg-light"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    if (errors.title) {
                                        setErrors((prev) => ({ ...prev, title: '' }))
                                    }
                                }}
                                isInvalid={Boolean(errors.title)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="editPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                className="bg-light"
                                type="number"
                                min="0"
                                step="0.01"
                                value={price}
                                onChange={(e) => {
                                    setPrice(e.target.value)
                                    if (errors.price) {
                                        setErrors((prev) => ({ ...prev, price: '' }))
                                    }
                                }}
                                isInvalid={Boolean(errors.price)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.price}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="editDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                className="bg-light"
                                as="textarea"
                                rows={4}
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                    if (errors.description) {
                                        setErrors((prev) => ({ ...prev, description: '' }))
                                    }
                                }}
                                isInvalid={Boolean(errors.description)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="editCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                className="bg-light"
                                type="text"
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                    if (errors.category) {
                                        setErrors((prev) => ({ ...prev, category: '' }))
                                    }
                                }}
                                isInvalid={Boolean(errors.category)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.category}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className="container justify-content-center d-flex mt-3 gap-3 flex-wrap">
                            <Button type="submit" className="btn btn-info" disabled={isSubmitting}>
                                {isSubmitting ? 'Updating...' : 'Update Product'}
                            </Button>
                            <Button as={Link} to={`/products/${id}`} variant="secondary">
                                Back to Product
                            </Button>
                        </div>
                    </Form>
                </div>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalVariant === 'success' ? 'Success' : 'Error'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className={`text-${modalVariant} mb-0`}>
                            {modalMessage}
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}
