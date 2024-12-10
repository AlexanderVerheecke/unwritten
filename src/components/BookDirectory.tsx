"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./BookDirectory.module.scss";

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    description: string;
    imageLinks?: { thumbnail: string };
  };
}

const BookDirectory: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch Top 5 Books on initial render
  useEffect(() => {
    const fetchTopBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=top+10&maxResults=10`
        );
        setBooks(response.data.items || []);
      } catch (err) {
        setError("Failed to fetch books. Please try again.");
      }
    };
    fetchTopBooks();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Top 5 Books</h1>

        <div className={styles.bookList}>
          {books.map((book) => (
            <div key={book.id} className={styles.bookCard}>
              <div className={styles.bookInfo}>
                {book.volumeInfo.imageLinks?.thumbnail ? (
                  <img
                    src={book.volumeInfo.imageLinks.thumbnail}
                    alt={book.volumeInfo.title}
                    className={styles.thumbnail}
                  />
                ) : (
                  <div className={styles.noImage}>No Image Available</div>
                )}
                <div className={styles.bookDetails}>
                  <h2 className={styles.bookTitle}>{book.volumeInfo.title}</h2>
                  <p className={styles.authors}>
                    <strong>Author:</strong>{" "}
                    {book.volumeInfo.authors?.join(", ")}
                  </p>
                  <p className={styles.description}>
                    `${book.volumeInfo.description.substring(0, 100)}...`
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.rightSide}>
        <h1 className={styles.title}>Search a Book</h1>
      </div>
    </div>
  );
};

export default BookDirectory;
