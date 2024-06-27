# Contributing to Pizzaria 🍕

Thank you for considering contributing to Pizzaria! We welcome contributions from everyone. By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can You Contribute? 🤔

### Reporting Bugs 🐛

If you find a bug, please report it by opening an issue. Include detailed steps to reproduce the issue, any relevant error messages, and your environment details.

### Suggesting Enhancements 💡

If you have ideas for new features or enhancements, please open an issue with a clear description of the suggestion and any related benefits or use cases.

### Submitting Pull Requests 🔄

1. **Fork the Repository**: Click the "Fork" button at the top right of this page.
2. **Clone Your Fork**: 
    ```bash
    git clone https://github.com/your-username/Pizza-Ordering-Project.git
    cd Pizza-Ordering-Project
    ```
3. **Create a Branch**: 
    ```bash
    git checkout -b feature-name
    ```
4. **Make Your Changes**: Implement your feature or fix.
5. **Commit Your Changes**: 
    ```bash
    git commit -am 'Add some feature'
    ```
6. **Push to Your Branch**: 
    ```bash
    git push origin feature-name
    ```
7. **Open a Pull Request**: Navigate to the original repository and click the "New pull request" button.

### Writing Documentation 📝

Improving documentation is a valuable contribution. You can help by:

- Enhancing the README.
- Adding or updating docstrings in the code.
- Creating tutorials or guides.

### Reviewing Pull Requests 👀

We appreciate feedback and reviews on open pull requests. Constructive comments and suggestions are always welcome.

## Development Setup 🛠️

### Prerequisites

- **Node.js**
- **Python 3.x**
- **Docker** (optional)

### Installation

1. **Clone the Repository**: 
    ```bash
    git clone https://github.com/aref-hammaslak/Pizza-Ordering-Project.git
    cd Pizza-Ordering-Project
    ```
2. **Install Frontend Dependencies**: 
    ```bash
    cd frontend
    npm install
    ```
3. **Install Backend Dependencies**: 
    ```bash
    cd ../backend
    pip install -r requirements.txt
    ```
4. **Set Up Environment Variables**: Create a `.env` file in the `backend` directory with necessary variables (e.g., database credentials, secret key).

5. **Run the Development Server**:
    - **Frontend**:
      ```bash
      cd ../frontend
      npm start
      ```
    - **Backend**:
      ```bash
      cd ../backend
      python manage.py runserver
      ```

6. **Access the Application**: Open `http://localhost:3000` in your browser.

## Style Guides 🎨

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature").
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...").
- Limit the first line to 72 characters or less.

### Code Style

- **Frontend**: Follow [Airbnb's JavaScript Style Guide](https://github.com/airbnb/javascript).
- **Backend**: Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/).

## License 📜

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to Pizzaria! Your efforts help make this project better for everyone.
