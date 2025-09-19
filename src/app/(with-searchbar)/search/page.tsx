import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import delay from "@/util/delay";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-seleton";
import { Metadata } from "next";

async function SearchResult({ q }: { q: string })
{
  await delay(1500);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, 
    {cache: "force-cache"});
  if (!response.ok) {
    return <div>Error: {response.statusText}</div>;
  }
  const books : BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return {
    title: `한입 북스 - 검색 결과: ${q}`,
    description: `한입 북스에 등록된 도서를 검색하세요: ${q}`,
    openGraph: {
      title: `한입 북스 - 검색 결과: ${q}`,
      description: `한입 북스에 등록된 도서를 검색하세요: ${q}`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
