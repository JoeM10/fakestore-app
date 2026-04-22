import api from "./fakeStoreAPI";
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

export default function AddProduct() {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalVariant, setModalVariant] = useState('success')
    const [modalMessage, setModalMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [errors, setErrors] = useState({})

    const validateForm = () => {
        const newErrors = {}

        if (!title.trim()) {
            newErrors.title = 'Title is required'
        } else if (title.trim().length < 3) {
            newErrors.title = 'Title must be at least 3 characters'
        }

        if (!price) {
            newErrors.price = 'Price is required'
        } else if (isNaN(price) || Number(price) <= 0) {
            newErrors.price = 'Price must be a positive number'
        }

        if (!description.trim()) {
            newErrors.description = 'Description is required'
        } else if (description.trim().length < 10) {
            newErrors.description = 'Description must be at least 10 characters'
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
            await api.post('', {
                title: title.trim(),
                price: Number(price),
                description: description.trim(),
                category: category.trim()
            })
            setTitle('')
            setPrice('')
            setDescription('')
            setCategory('')
            setErrors({})
            setModalVariant('success')
            setModalMessage('Product added successfully!')
        } catch (error) {
            console.error("Error adding product:", error)
            setModalVariant('danger')
            setModalMessage('Failed to add product. Please try again.')
        } finally {
            setIsSubmitting(false)
            setShowModal(true)
        }
    }

    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <h2>Add New Product</h2>
                <Alert variant="info">
                    FakeStoreAPI will accept the POST request, but the new product will not persist after future fetches.
                </Alert>
                <Form noValidate onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            className="bg-light"
                            type="text"
                            value={title}
                            isInvalid={Boolean(errors.title)}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                if (errors.title) {
                                    setErrors((prev) => ({ ...prev, title: '' }))
                                }
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            className="bg-light"
                            type="number"
                            min="0"
                            step="0.01"
                            value={price}
                            isInvalid={Boolean(errors.price)}
                            onChange={(e) => {
                                setPrice(e.target.value)
                                if (errors.price) {
                                    setErrors((prev) => ({ ...prev, price: '' }))
                                }
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.price}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            className="bg-light"
                            as="textarea"
                            rows={4}
                            value={description}
                            isInvalid={Boolean(errors.description)}
                            onChange={(e) => {
                                setDescription(e.target.value)
                                if (errors.description) {
                                    setErrors((prev) => ({ ...prev, description: '' }))
                                }
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            className="bg-light"
                            type="text"
                            value={category}
                            isInvalid={Boolean(errors.category)}
                            onChange={(e) => {
                                setCategory(e.target.value)
                                if (errors.category) {
                                    setErrors((prev) => ({ ...prev, category: '' }))
                                }
                            }}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.category}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex flex-wrap gap-2">
                        <Button type="submit" variant="primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add Product'}
                        </Button>
                        <Button as={Link} to="/products" variant="secondary">
                            Back to Products
                        </Button>
                    </div>
                </Form>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{modalVariant === 'success' ? 'Success' : 'Error'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className={`text-${modalVariant}`}>
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
