"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import Swal from "sweetalert2";
import { useMyContext } from "../context/BankContext";
import { SpinerLoading } from "./SpinerLoading";

let count = 0;

function TransactionsClient({ listTransactions }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const { myState, updateState } = useMyContext();

  console.debug({ count });
  const getData = useCallback(() => {
    let totalInflows = 0;
    let totalOutflows = 0;
    listTransactions.forEach((transaction) => {
      if (transaction.type === "INFLOW") {
        totalInflows += transaction.amount;
      } else if (transaction.type === "OUTFLOW") {
        totalOutflows += transaction.amount;
      }
    });

    const balanceResult = totalInflows - totalOutflows;
    setBalance(balanceResult);
  }, [router]);

  console.debug({ listTransactions });

  useEffect(() => {
    getData();
    count++;

    if (listTransactions.length === 0 && count < 6) {
      router.refresh();
    }

    console.debug({ count });

    if (count === 6) {
      Swal.fire({
        title: "Advertencia",
        text: "La respuesta de la petición está tardando demasiado o está vacía",
        icon: "warning",
        confirmButtonText: "Cerrar",
      }).then((result) => {
        router.push("/");
      });
    }
  }, [router, listTransactions]);

  useLayoutEffect(() => {
    if (!sessionStorage.getItem("idToken")) {
      router.push("/login");
    }

    return () => {
      count = 0;
    };
  }, []);

  return (
    <section>
      {listTransactions.length === 0 ? (
        <SpinerLoading />
      ) : (
        <>
          <h2 className="text-[orange] font-bold text-[32px] ml-12">
            {myState.display_name}
          </h2>
          <span className="ml-12">KPI : {balance}</span>
          <br />
          <br />
          <div className="tabla overflow-x-scroll max-w-[70%] ">
            <div className="fila-header">
              <div className="celda">
                <b>Monto</b>
              </div>
              <div className="celda">
                <b>Fecha</b>
              </div>
              <div className="celda">
                <b>Tipo</b>
              </div>
              <div className="celda">
                <b>Moneda</b>
              </div>
            </div>

            {listTransactions.map((val) => (
              <div key={val.id} className="fila">
                <div className="celda">{val.amount}</div>
                <div className="celda">{val.value_date}</div>
                <div className="celda">{val.type}</div>
                <div className="celda">{val.currency}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export default TransactionsClient;
