import styles from "./page.module.css";
import BookDirectory from "@/components/BookDirectory";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <BookDirectory />
      </main>
    </div>
  );
}
