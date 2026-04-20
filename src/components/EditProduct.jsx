import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import api from './fakeStoreAPI'
import Modal from 'react-bootstrap/Modal'
import { useParams } from 'react-router-dom'

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
        } catch (error) {
            setShowModal(true)
            setModalVariant('danger')
            setModalMessage('Error updating product.')
        } finally {
            setIsSubmitting(false)
        }
    }

    
    async function GetProductInfo() {
        await api.get(`/${id}`)
        .then(response => {
            const { title, price, description, category } = response.data
            setTitle(title)
            setPrice(price)
            setDescription(description)
            setCategory(category)
        })
    }
    useEffect(() => {
        GetProductInfo()
    }, [id])
    
    return (
        <div className="container mt-5">
            <h2>Edit Product</h2>
            <div className="container mt-4">
                <form noValidate onSubmit={handleSubmit}>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            if (errors.title) {
                                setErrors((prev) => ({ ...prev, title: '' }))
                            }
                        }}
                        className={`form-control bg-light ${errors.title ? 'is-invalid' : ''}`}
                        required
                    />
                    {errors.title && <div className="invalid-feedback d-block">{errors.title}</div>}
                    <label>Price</label>
                    <div className='input-group'>
                        <div className='input-group-text'>$</div>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value)
                                if (errors.price) {
                                    setErrors((prev) => ({ ...prev, price: '' }))
                                }
                            }}
                            className={`form-control bg-light ${errors.price ? 'is-invalid' : ''}`}
                            required
                        />
                    </div>
                    {errors.price && <div className="invalid-feedback d-block">{errors.price}</div>}
                    <label>Description</label>
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            if (errors.description) {
                                setErrors((prev) => ({ ...prev, description: '' }))
                            }
                        }}
                        className={`form-control bg-light ${errors.description ? 'is-invalid' : ''}`}
                        required
                    />
                    {errors.description && <div className="invalid-feedback d-block">{errors.description}</div>}
                    <label>Category</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                            if (errors.category) {
                                setErrors((prev) => ({ ...prev, category: '' }))
                            }
                        }}
                        className={`form-control bg-light ${errors.category ? 'is-invalid' : ''}`}
                        required
                    />
                    {errors.category && <div className="invalid-feedback d-block">{errors.category}</div>}

                    <div className="container justify-content-center d-flex mt-3">
                        <Button type="submit" className="btn btn-info" disabled={isSubmitting}>
                            {isSubmitting ? 'Updating...' : 'Update Product'}
                        </Button>
                    </div>
                </form>
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
    )
}
