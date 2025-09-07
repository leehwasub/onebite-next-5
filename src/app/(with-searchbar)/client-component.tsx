"use client";

export default function ClientComponent({children} : {children: React.ReactNode})
{
  console.log("Client Component");
  return (
    <div>
      {children}
    </div>
  )
}