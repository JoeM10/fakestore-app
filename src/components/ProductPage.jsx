import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Products from './Products';
import NavBar from './NavBar';

export default function ProductPage() {

    return (
        <>
            <NavBar />
            <div className="container text-center bg-light p-3 rounded shadow">
                <h1 className="p-3 rounded shadow">Welcome to the Product Page!</h1>
                <div className="container">
                    <h2 className="pt-3">Product List</h2>
                    <Products />
                </div>
                <div className="container">
                    <Button as={Link} to="/" variant="primary" className="mt-3">
                        Back to Home
                    </Button>
                </div>
            </div>
        </>
    )
}
