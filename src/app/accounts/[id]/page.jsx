"use client";

import { accountsList } from "@/app/services/bankService";
import { useEffect, useState } from "react";

function AccountsPage({ params }) {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      const accountData = await accountsList(params.id);
      console.log(accountData.data.results);
      setAccounts(accountData.data.results);
    };
    fetchAccounts();
  }, [params.id]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div key={account.id}>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">{account.name}</h2>
              <p className="text-gray-700">{account.currency}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountsPage;
