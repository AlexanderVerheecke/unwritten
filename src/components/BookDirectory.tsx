"use client";
import React, { useState, useEffect } from "react";
import styles from "./BookDirectory.module.scss";

const BookDirectory: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Top 10 Books</h1>
        <p>List of books</p>
      </div>

      <div className={styles.rightSide}>
        <h1 className={styles.title}>Search for a Book</h1>
        <p>Found book </p>
      </div>
    </div>
  );
};

export default BookDirectory;
