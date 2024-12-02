# Product Builder

A React application for managing and displaying product listings.

## Description

Product Builder is a web application built with React, TypeScript, and Vite. It allows users to view, add, edit, and delete product listings. The application features a responsive grid layout for product display and modal forms for adding and editing products.

## Features

- Display products in a responsive grid layout
- Add new products
- Edit existing products
- Delete products
- Color selection for products
- Category selection for products
- Form validation for product input

## Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- UUID for generating unique IDs

## Project Structure

The main `App.tsx` file contains the core functionality of the application, including:

- State management for products, modals, and form data
- Functions for adding, editing, and deleting products
- Form rendering and validation
- Product grid display

Key components and data files include:

- `Product`: Component for displaying individual product cards
- `Button`, `ColorCircle`, `Input`, `MyModal`, `Select`: Reusable UI components
- `Colors`, `FormInputs`, `ProductList`, `CategoryList`: Data files for colors, form fields, initial products, and categories

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/product-builder.git
   ```

2. Navigate to the project directory:

   ```
   cd product-builder
   ```

3. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

4. Run the development server:

   ```
   npm run dev
   ```

   or

   ```
   yarn dev
   ```

5. Open your browser and visit `http://localhost:5173` to view the application.

## Usage

- Click the "Add" button to open a modal for adding a new product.
- Fill in the product details, select colors and a category, then submit the form.
- Click "Edit" on a product card to modify its details.
- Click "Delete" to remove a product from the list.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
