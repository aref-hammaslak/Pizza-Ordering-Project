# Pizzaria

![Pizzaria Logo](https://img.freepik.com/premium-vector/pizzaria-cartoon-logo_142499-109.jpg)

Pizzaria is a web application that allows users to customize their favorite pizzas and place orders conveniently. This repository contains the codebase for the Pizzaria project, which is built using React for the frontend and Django for the backend.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Pizza Customization:** Users can customize their pizzas by choosing toppings, crust types, and sizes.
- **Shopping Cart:** Add customized pizzas to the cart and proceed to checkout for order placement.
- **User Authentication:** Secure user authentication and authorization for placing orders.
- **Order Management:** View order history and manage current orders.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Django
- **Database:** SQLite (Development), PostgreSQL (Production)
- **Deployment:** Docker, etc.

## Getting Started

### Prerequisites

- Node.js
- Python 3.x
- Docker (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aref-hammaslak/Pizza-Ordering-Project.git
   ```

2. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add necessary variables (e.g., database credentials, secret key).

5. Run the development server:
   - Frontend:
     ```bash
     cd ../frontend
     npm start
     ```
   - Backend:
     ```bash
     cd ../backend
     python manage.py runserver
     ```

6. Access the application at `http://localhost:3000` in your browser.

## Project Structure

- **`frontend/`**: Contains the React.js frontend code.
- **`backend/`**: Contains the Django backend code.
- **`docs/`**: Documentation related files.
- **`requirements.txt`**: Python dependencies for the backend.

## Contributing

We welcome contributions to improve Pizzaria! To contribute, follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-xyz`).
5. Create a new Pull Request.

Sure, here’s a polished version for the Credits section:

---

## Credits

This project was brought to life by the collaborative efforts of our talented team members:

- **Aref Hammaslak** - Frontend Development Extraordinaire
- **Hassan Kalantari** - Backend Mastermind
- **Mobin Kheibary** - Operations Guru and Documentation Maestro

We greatly appreciate their dedication and expertise in crafting and managing the various aspects of the Pizzaria project, ensuring its success and smooth operation.

---

## License

This project is licensed under the [MIT License](LICENSE).
