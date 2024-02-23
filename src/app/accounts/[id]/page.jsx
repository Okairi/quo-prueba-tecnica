"use client";

import { accountsList } from "@/app/services/bankService";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useMyContext } from "@/app/context/BankContext";
import { SpinerLoading } from "@/app/components/SpinerLoading";

function AccountsPage({ params }) {
  const [accounts, setAccounts] = useState([]);
  const router = useRouter();
  const { myState, updateState } = useMyContext();

  const redirectTransactions = (id, name) => {
    updateState({
      id: id,
      display_name: name,
    });

    router.push(`/transactions/${id}`);
  };
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const accountData = await accountsList(params.id);
        console.log(accountData.data.results);
        setAccounts(accountData.data.results);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al cargar las cuentas.",
        });
        console.error(error);
      }
    };
    fetchAccounts();
  }, [params.id]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {accounts.map((account) => (
          <div
            className="cursor-pointer"
            key={account.id}
            onClick={() => {
              redirectTransactions(account.link, account.institution.name);
            }}
          >
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-2">{account.name}</h2>
              <p className="text-gray-700"> Divisa : {account.currency}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountsPage;
