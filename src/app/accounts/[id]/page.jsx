"use client";

import { accountsList } from "@/app/services/bankService";
import { useEffect, useState } from "react";

function AccountsPage({ params }) {
  const [account, setaccount] = useState([]);

  useEffect(() => {
    const listAccount = async () => {
      const listDataAccount = await accountsList(params.id);

      console.log(listDataAccount.data.results);

      setaccount(listDataAccount.data.results);
    };
    listAccount();
  }, []);

  console.log(params);
  return (
    <>
      {account.map((val) => {
        return <div key={val.id}>{val.name}</div>;
      })}
    </>
  );
}

export default AccountsPage;
