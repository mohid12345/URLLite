URL Shortener Application

This is a URL shortener application built using Nest.js (TypeScript) as the backend with REPOSITORY PATTERN. It allows users to shorten long URLs into compact, shareable links.
Features

    Repostory Pattern make sure app is loosley coupled, better testable and scalable.

    Shorten long URLs into concise, unique short URLs.

    Redirect users from the short URL to the original URL.

    Basic analytics (e.g., click count for each short URL).

    RESTful API for managing URLs.

Technologies Used

    Architectur: Repostory Pattern usign Interface and Repostory functions act as connection between services function and Database model.

    Backend Framework: Nest.js

    Programming Language: TypeScript

    Database: (e.g., PostgreSQL, MySQL, MongoDB, or any preferred database)

    Caching: (Optional, e.g., Redis for faster lookups)

    API Documentation: Swagger (optional)

Prerequisites

Before running the application, ensure you have the following installed:

    Node.js (v16 or higher)

    npm or yarn

    A database system (e.g., PostgreSQL, MySQL, MongoDB)

    (Optional) Redis for caching

Installation

    Clone the repository:
    bash
    Copy

    git clone https://github.com/your-username/url-shortener.git
    cd url-shortener

    Install dependencies:
    bash
    Copy

    npm install
    # or
    yarn install

    Set up environment variables:
    Create a .env file in the root directory and add the following variables:
    env
    Copy

    DATABASE_URL=your_database_connection_string
    PORT=3000
    BASE_URL=http://localhost:3000
    # Add other environment variables as needed

    Run database migrations (if applicable):
    bash
    Copy

    npm run migration:run
    # or
    yarn migration:run

Running the Application

    Start the development server:
    bash
    Copy

    npm run start:dev
    # or
    yarn start:dev

    Access the API:
    The application will be running at http://localhost:3000.

API Endpoints
Shorten a URL

    POST /api/v1/url/shorten

        Request Body:
        json
        Copy

        {
          "originalUrl": "https://example.com/very-long-url"
        }

        Response:
        json
        Copy

        {
          "shortUrl": "http://localhost:3000/abc123",
          "originalUrl": "https://example.com/very-long-url"
        }

Redirect to Original URL

    GET /:shortCode

        Redirects to the original URL associated with the short code.

Get URL Analytics

    GET /api/v1/url/analytics/:shortCode

        Response:
        json
        Copy

        {
          "shortCode": "abc123",
          "originalUrl": "https://localhost:3000/url",
          "clickCount": 10,
          "createdAt": "2023-10-01T12:00:00Z"
        }

Testing

To run unit and integration tests:
bash
Copy

npm run test
# or
yarn test

For end-to-end testing:
bash
Copy

npm run test:e2e
# or
yarn test:e2e

Deployment
Docker Deployment

    Build the Docker image:
    bash
    Copy

    docker build -t url-shortener .

    Run the Docker container:
    bash
    Copy

    docker run -p 3000:3000 url-shortener

Deploy to a Cloud Platform

    Follow the deployment instructions for your preferred cloud platform (e.g., AWS, Heroku, Vercel).

Documentation
Swagger API Documentation

If Swagger is enabled, access the API documentation at:
Copy

http://localhost:3000/api

Contributing

Contributions are welcome! Please follow these steps:

    Fork the repository.

    Create a new branch for your feature or bugfix.

    Submit a pull request.

License

This project is licensed under the MIT License. See the LICENSE file for details.
Contact

For questions or feedback, please contact:

    Your Name

    Email: mohidmohan8482@gmail.com

    GitHub: mohid12345