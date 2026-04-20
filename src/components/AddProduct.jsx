import api from "./fakeStoreAPI";
import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/esm/Button'

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
        <div className="container mt-5">
            <h2>Add New Product</h2>
            <form noValidate onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className={`form-control bg-light ${errors.title ? 'is-invalid' : ''}`}
                        id="title"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            if (errors.title) {
                                setErrors((prev) => ({ ...prev, title: '' }))
                            }
                        }}
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <div className="input-group">
                        <div className="input-group-text">$</div>
                        <input
                            type="number"
                            className={`form-control bg-light ${errors.price ? 'is-invalid' : ''}`}
                            id="price"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value)
                                if (errors.price) {
                                    setErrors((prev) => ({ ...prev, price: '' }))
                                }
                            }}
                        />
                    </div>
                    {errors.price && <div className="invalid-feedback d-block">{errors.price}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className={`form-control bg-light ${errors.description ? 'is-invalid' : ''}`}
                        id="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            if (errors.description) {
                                setErrors((prev) => ({ ...prev, description: '' }))
                            }
                        }}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        className={`form-control bg-light ${errors.category ? 'is-invalid' : ''}`}
                        id="category"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                            if (errors.category) {
                                setErrors((prev) => ({ ...prev, category: '' }))
                            }
                        }}
                    />
                    {errors.category && <div className="invalid-feedback">{errors.category}</div>}
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
            </form>

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
    )
}
