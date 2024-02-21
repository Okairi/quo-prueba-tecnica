"use client";
import { useSearchParams } from "next/navigation";
import { transactionList } from "../services/bankService";
import { useEffect, useState } from "react";
import "./transactions.css";
function TransactionsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const transactionListRespuesta = await transactionList(id);
      setdata(transactionListRespuesta.data.results);
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <section>
      <h2 className="text-white text-[30px] ml-12">{name}</h2>
      {/*       KPI : {balance} */}
      <br />
      <br />
      <div className="tabla ">
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

        {data.map((val) => {
          return (
            <div className="fila">
              <div className="celda">{val.amount}</div>
              <div className="celda">{val.value_date}</div>
              <div className="celda">{val.type}</div>
              <div className="celda">{val.currency}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TransactionsPage;
