# Unwritten

This is a simple Next.js application demonstrating a GET function that retreieves data through the Google Books API.

### 1. Clone the Repository

Clone this repository to your local machine:

### 2. Install dependencies

Run `npm install` to install the required dependencies:

### 3. Run the application

Run the application with the command `npm run start` or ` npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Information

This application retrieves data from the Google Books API.

# Features

- Top 5 Books: Initially, the application fetches the top 5 books related to "scuba diving" from the Google Books API and displays them.
- Search Books: Users can search for a book by title, and the application will display details of the first book that matches the query.
- Error Handling: If an error occurs during data fetching or if no search results are found, appropriate error messages are displayed.

# Stack

- Next.js: A React framework for building web applications.
- Axios: A promise-based HTTP client for making requests to the Google Books API.
