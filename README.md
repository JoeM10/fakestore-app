# FakeStore App

A React + Vite single-page store app built with React Router, Axios, React Bootstrap, and the [FakeStoreAPI](https://fakestoreapi.com/).

This project was created as a final project to practice:

- React component structure
- Client-side routing with React Router
- API requests with Axios
- Forms and layout with React Bootstrap
- Loading states and error handling
- CRUD-style interactions against a mock API

## Features

- Home page with a welcome message and quick navigation
- Product listing page that fetches all products from FakeStoreAPI
- Product details page for an individual product
- Add Product form with validation and success/error feedback
- Edit Product form with pre-filled values from the API
- Delete Product flow with a confirmation modal
- Responsive navigation bar built with React Bootstrap
- Loading indicators and user-friendly API error messages

## Tech Stack

- React
- Vite
- React Router DOM
- Axios
- React Bootstrap
- Bootstrap 5

## API Used

This app uses the FakeStoreAPI:

- All products: `https://fakestoreapi.com/products`
- Single product: `https://fakestoreapi.com/products/:id`

Important note:

- FakeStoreAPI is a mock/testing API.
- `POST`, `PUT`, and `DELETE` requests return successful responses for testing purposes.
- Those changes do not persist when you refresh or fetch data again.

## Routes

- `/` - Home page
- `/products` - Product listing page
- `/products/:id` - Product details page
- `/add-product` - Add Product page
- `/edit-product/:id` - Edit Product page

## Project Structure

```text
src/
  components/
    AddProduct.jsx
    DeleteProduct.jsx
    EditProduct.jsx
    fakeStoreAPI.jsx
    Home.jsx
    LoadingSpinner.jsx
    NavBar.jsx
    ProductDetails.jsx
    ProductPage.jsx
    Products.jsx
  App.jsx
  App.css
  index.css
  main.jsx
```

## Key Functionality

### Home Page

- Displays a welcome message and hero image
- Includes navigation buttons to browse products or add a product

### Product Listing

- Fetches products from FakeStoreAPI using Axios
- Displays product image, title, and price
- Includes a button to view full product details

### Product Details

- Uses `useParams()` to read the product ID from the URL
- Fetches a single product from the API
- Displays image, title, price, category, and description
- Includes buttons to add to cart, edit, and delete

### Add Product

- Uses a React Bootstrap form
- Validates title, price, description, and category
- Sends a `POST` request to FakeStoreAPI
- Shows success or error feedback in a modal

### Edit Product

- Preloads the selected product data into the form
- Sends a `PUT` request to FakeStoreAPI
- Shows loading and error states while fetching
- Shows success or error feedback in a modal

### Delete Product

- Opens a confirmation modal before deleting
- Sends a `DELETE` request to FakeStoreAPI
- Redirects the user back to the product listing page after success

## Responsiveness and UI

- Built with React Bootstrap components and Bootstrap utility classes
- Mobile-friendly navigation bar with collapsible menu
- Responsive product cards and layout

## Future Improvements

- Add a real shopping cart with global state
- Add category filtering and search
- Add toast notifications for create/update/delete actions
- Improve accessibility and keyboard navigation
- Add automated tests

## Author

Created by Joseph McDaniel
Github: https://github.com/JoeM10/