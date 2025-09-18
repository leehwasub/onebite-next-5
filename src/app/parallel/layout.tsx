import Link from "next/link";
import { ReactNode } from "react";

export default function layout({children, sidebar, feed} : {children : ReactNode, sidebar: ReactNode, feed : ReactNode})
{
  return (
  <div>
    <div>
      <Link href={"/parallel/setting"}>parallel/setting</Link>
    </div>
    {feed}
    {sidebar}
    {children}
  </div>
  );
}