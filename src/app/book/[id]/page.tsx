import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";
import { createReviewAction } from "@/actions/create-review-action"; 

//export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ];
}

export async function BookDetail({bookId} : {bookId : string})
{
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`);
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>Error: {response.statusText}</div>;
  }
  const book : BookData = await response.json();
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

function ReviewEditor({bookId} : {bookId: string})
{
  return (
    <section>
      <form action={createReviewAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <input name="content" placeholder="리뷰 내용" required/>
        <input name="author" placeholder="작성자" required/>
        <button type="submit">작성하기</button>
      </form>
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const {id} = await params;
  return (
  <div className={style.container}>
    <BookDetail bookId={id}/>
    <ReviewEditor bookId={id} />
  </div>
  );
}
