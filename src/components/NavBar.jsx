
export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
            <div className="container">
                <a href="/" class="navbar-brand"><strong>FakeStore</strong></a>
                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-label="Expand Navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a href="/" className="nav-link">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="/productpage" className="nav-link">Products</a>
                        </li>
                        <li className="nav-item">
                            <a href="/addproduct" className="nav-link">Add Product</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}