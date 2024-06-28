# Pizzaria 🍕

<p align="center">
  <img src="https://img.freepik.com/premium-vector/pizzaria-cartoon-logo_142499-109.jpg" alt="Pizzaria's Logo" width="600">
</p>

Pizzaria is a web application that allows users to customize their favorite pizzas and place orders conveniently. This repository contains the codebase for the Pizzaria project, which is built using React for the frontend and Django for the backend.

## Table of Contents

- [Pizzaria 🍕](#pizzaria-)
  - [Table of Contents](#table-of-contents)
  - [Features 🚀](#features-)
  - [Tech Stack 💻](#tech-stack-)
  - [Getting Started 🚀](#getting-started-)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running with Docker 🐳](#running-with-docker-)
  - [Project Structure 📁](#project-structure-)
  - [Contributing 🤝](#contributing-)
  - [Credits 🌟](#credits-)
  - [License 📜](#license-)

## Features 🚀

- **Pizza Customization:** Users can customize their pizzas by choosing toppings, crust types, and sizes.
- **Shopping Cart:** Add customized pizzas to the cart and proceed to checkout for order placement.
- **User Authentication:** Secure user authentication and authorization for placing orders.
- **Order Management:** View order history and manage current orders.

## Tech Stack 💻

- **Frontend:** React.js
- **Backend:** Django
- **Database:** SQLite (Development), PostgreSQL (Production)
- **Deployment:** Docker, etc.

## Getting Started 🚀

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
     npm run dev
     ```
   - Backend:
     ```bash
     cd ../backend
     python manage.py runserver
     ```

6. Access the application at `http://localhost:5173` in your browser.

### Running with Docker 🐳

To run the project using Docker, follow these steps:

1. Ensure Docker is installed and running on your machine. 🛠️

2. Build and run the Docker container:
   ```bash
   docker build -t pizzaria .
   docker run -d -p 8000:8000 pizzaria
   ```

  📦 This will build and run the application inside a Docker container.

3. 🌐 Access the application:
   Open your browser and navigate to `http://localhost:8000` to see the application running.

## Project Structure 📁

- **`frontend/`**: Contains the React.js frontend code.
- **`backend/`**: Contains the Django backend code.
- **`docs/`**: Documentation related files.
- **`requirements.txt`**: Python dependencies for the backend.

## Contributing 🤝

We welcome contributions to improve Pizzaria! To contribute, follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-xyz`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-xyz`).
5. Create a new Pull Request.

---

## Credits 🌟

This project was brought to life by the collaborative efforts of our talented team members:

- [**Aref Hammaslak**](https://github.com/aref-hammaslak) - Frontend Development Extraordinaire
- [**Hassan Kalantari**](https://github.com/HeisenbergHK) - Backend Mastermind
- [**Mobin Kheibary**](https://github.com/Mobiwn) - Operations Guru and Documentation Maestro, Roadmap and Strategic Planning Coordinator, Dockerization Lead
- **Anis Nabipour** - Validation and Quality Assurance Expert and Lead Designer of Design Diagrams
- **Mehran Mahmoudpour** - Customer Perspective Observer

We greatly appreciate their dedication and expertise in crafting and managing the various aspects of the Pizzaria project, ensuring its success and smooth operation.

---

## License 📜

This project is licensed under the [MIT License](LICENSE).
