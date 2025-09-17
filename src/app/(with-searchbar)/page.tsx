import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";

async function AllBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, {cache: "force-cache"});
  if (!response.ok) {
    return <div>Error: {response.statusText}</div>;
  }
  const allBooks : BookData[] = await response.json();
  return allBooks.map((book) => (
    <BookItem key={book.id} {...book} />
  ));
}

async function RecoBooks() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, 
    {next : {revalidate: 3}}
  );
  if (!response.ok) {
    return <div>Error: {response.statusText}</div>;
  }
  const recoBooks : BookData[] = await response.json();
  return recoBooks.map((book) => (
    <BookItem key={book.id} {...book} />
  ));
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
