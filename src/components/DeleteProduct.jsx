import { useState, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import api from "./fakeStoreAPI"
import Button from 'react-bootstrap/esm/Button'
import Modal from 'react-bootstrap/Modal'

export default function DeleteProduct({ productId, onDeleteSuccess }) {
    const navigate = useNavigate()
    const [deleteMessage, setDeleteMessage] = useState('')
    const [isDeleting, setIsDeleting] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const timeoutRef = useRef(null)

    const handleDelete = () => {
        setShowModal(true)
    }

    const confirmDelete = async () => {
        setShowModal(false)
        setIsDeleting(true)
        try {
            await api.delete(`${productId}`)
            setDeleteMessage('Product deleted successfully!')
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = window.setTimeout(() => {
                setDeleteMessage('')
                setIsDeleting(false)
                onDeleteSuccess?.()
                navigate('/productpage')
                timeoutRef.current = null
            }, 2000)
        } catch (error) {
            console.error("Error deleting product:", error)
            setDeleteMessage('Error deleting product. Please try again.')
            setIsDeleting(false)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            timeoutRef.current = window.setTimeout(() => {
                setDeleteMessage('')
                timeoutRef.current = null
            }, 3500)
        }
    }

    const cancelDelete = () => {
        setShowModal(false)
    }

    return (
        <div className="position-relative justify-content-center d-flex">
            {deleteMessage && (
                <div className={deleteMessage.includes('Error') ? 'delete-error-toast' : 'delete-success-toast'}>
                    {deleteMessage}
                </div>
            )}
            <Button 
                variant="danger" 
                onClick={handleDelete}
                disabled={isDeleting}
            >
                {isDeleting ? 'Deleting...' : 'Delete Product'}
            </Button>

            <Modal show={showModal} onHide={cancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this product? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cancelDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
