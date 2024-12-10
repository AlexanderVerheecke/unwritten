"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BookDirectory.module.scss";

interface Book {
  id: string;
  volumeInfo: {
    title: string | null;
    authors: string[] | null;
    description: string | null;
    imageLinks?: { thumbnail: string | null };
  };
}

const BookDirectory: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Book | null>(null);
  const [query, setQuery] = useState("");

  // Fetch Top 5 Books on initial render
  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=scuba+divign&maxResults=5`
        );
        setBooks(response.data.items || []);
      } catch (err) {
        setError("Failed to fetch books. Please try again.");
      }
    };
    fetchTopBooks();
  }, []);

  // Search for a book
  const fetchBook = async () => {
    if (!query.trim()) {
      setSearchError("Please enter a book title.");
      return;
    }

    if (query.length > 100) {
      setSearchError("Title is too long, limit to 100 characters.");
      return;
    }
    setSearchError(null); 

    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`
      );
      if (response.status === 200) {
        setSearchResults(response.data.items ? response.data.items[0] : null);
      } else {
        setSearchError("Failed to fetch books. Please try again.");
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 404) {
          setSearchError("No books found for this title.");
        } else if (err.response.status === 500) {
          setSearchError("The server encountered an error.");
        } else {
          setSearchError(
            `Error: ${err.response.status} - ${err.response.statusText}`
          );
        }
      } else {
        setSearchError("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Top 5 Books</h1>
        {error && <p className={styles.error}>{error}</p>}
        {books.length === 0 ? (
          <p>No books found.</p>
        ) : (
          <div className={styles.bookList}>
            {books.map((book) => (
              <div key={book.id} className={styles.bookCard}>
                <div className={styles.bookInfo}>
                  {book.volumeInfo.imageLinks?.thumbnail ? (
                    <img
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt={book.volumeInfo.title || "No title available"}
                      className={styles.thumbnail}
                    />
                  ) : (
                    <div className={styles.noImage}>No Image Available</div>
                  )}
                  <div className={styles.bookDetails}>
                    <h2 className={styles.bookTitle}>
                      {book.volumeInfo.title || "No title available"}
                    </h2>
                    <p className={styles.authors}>
                      <strong>Author:</strong>{" "}
                      {book.volumeInfo.authors?.join(", ") ||
                        "No authors available"}
                    </p>
                    <p className={styles.description}>
                      {book.volumeInfo.description
                        ? `${book.volumeInfo.description.substring(0, 100)}...`
                        : "No description available."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.rightSide}>
        <h1 className={styles.title}>Search a Book</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchBook();
          }}
          className={styles.form}
        >
          <input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
        {searchError && <p className={styles.error}>{searchError}</p>}{" "}
        {searchResults ? (
          <div className={styles.bookCard}>
            <div className={styles.bookInfo}>
              {searchResults.volumeInfo.imageLinks?.thumbnail ? (
                <img
                  src={searchResults.volumeInfo.imageLinks.thumbnail}
                  alt={searchResults.volumeInfo.title || "No title available"}
                  className={styles.thumbnail}
                />
              ) : (
                <div className={styles.noImage}>No Image Available</div>
              )}
              <div className={styles.bookDetails}>
                <h2 className={styles.bookTitle}>
                  {searchResults.volumeInfo.title || "No title available"}
                </h2>
                <p className={styles.authors}>
                  <strong>Author(s):</strong>{" "}
                  {searchResults.volumeInfo.authors?.join(", ") ||
                    "No authors available"}
                </p>
                <p className={styles.description}>
                  {searchResults.volumeInfo.description
                    ? `${searchResults.volumeInfo.description.substring(
                        0,
                        100
                      )}...`
                    : "No description available."}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p>No search results available.</p>
        )}
      </div>
    </div>
  );
};

export default BookDirectory;
