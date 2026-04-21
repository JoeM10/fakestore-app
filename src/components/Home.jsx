import Button from 'react-bootstrap/Button';
import fakeStoreImage from '../assets/hero_image.png'
import { Link } from 'react-router-dom'
import NavBar from './NavBar';

export default function Home() {

    return (
        <>
            <NavBar />
            <div className="container text-center">
                <h1 className="bg-light p-3 rounded shadow">Welcome to the Online Store Homepage!</h1>
                <img src={fakeStoreImage} alt="Online Store" className="img-fluid rounded mb-3 mt-3 shadow w-50" />
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <Button as={Link} to="/productpage" variant="primary" className="mt-3">
                                View Product List
                            </Button>
                        </div>
                        <div className="col-md-6">
                            <Button as={Link} to="/addproduct" variant="secondary" className="mt-3 ml-2">
                                Add New Product
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}