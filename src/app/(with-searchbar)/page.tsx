import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import { BookData } from "@/types";
import delay from "@/util/delay";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/skeleton/book-item-skeleton";
import BookListSkeleton from "@/components/skeleton/book-list-seleton";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';
//특정 페이지의 유형을 강제로 Static, Dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음. 페이지의 유형을 자동으로 설정
// 2. force-dynamic : 페이지의 유형을 Dynamic 페이지로 설정
// 3. force-static : 페이지의 유형을 Static 페이지로 설정
// 4. error : 페이지의 유형을 Static 페이지로 설정 (설정하면 안되는 이유 -> 빌드 오류)

export const metadata : Metadata = 
{
  title: "한입 북스",
  description: "한입 북스에 등록된 도서를 만나보세요",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스에 등록된 도서를 만나보세요",
    images: ["/thumbnail.png"],
  },
}


async function AllBooks() {
  await delay(1500);
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
  await delay(3000);
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
        <Suspense fallback={<BookListSkeleton count={3}/>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
