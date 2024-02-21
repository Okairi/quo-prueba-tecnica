"use client";
import { useSearchParams } from "next/navigation";
function TransactionsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  console.log(searchParams.get("id"));
  console.log(searchParams.get("name"));

  return <div>TransactionsPage</div>;
}

export default TransactionsPage;
