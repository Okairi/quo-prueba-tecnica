"use client";
import { useRouter } from "next/navigation";
import { transactionList } from "../services/bankService";
import { useEffect, useLayoutEffect, useState } from "react";
import "./transactions.css";
import { SpinerLoading } from "../components/SpinerLoading";
import { useMyContext } from "../context/BankContext";
import Swal from "sweetalert2";

function TransactionsPage() {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const { myState, updateState } = useMyContext();

  console.log(myState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const transactionListRespuesta = await transactionList(myState.id);
        setData(transactionListRespuesta.data.results);

        let totalInflows = 0;
        let totalOutflows = 0;

        transactionListRespuesta.data.results.forEach((transaction) => {
          if (transaction.type === "INFLOW") {
            totalInflows += transaction.amount;
          } else if (transaction.type === "OUTFLOW") {
            totalOutflows += transaction.amount;
          }
        });

        const balanceResult = totalInflows - totalOutflows;
        setBalance(balanceResult);
      } catch (error) {
        console.error("Error al obtener transacciones:", error);

        Swal.fire({
          title: "Error!",
          text: error.response.data.resp,
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    if (!sessionStorage.getItem("idToken")) {
      router.push("/login");
    }
  }, []);

  return (
    <section>
      {loading || data.length === 0 ? (
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

            {data.map((val) => (
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

export default TransactionsPage;