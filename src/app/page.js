"use client";

import { useEffect, useState } from "react";
import { getBanks } from "./services/bankService";

import Image from "next/image";

const getBaknsList = async () => {
  const data = await getBanks();

  console.log(data.data.results);
  return data.data.results;
};

function HomePage() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const banksList = await getBaknsList();
        setdata(banksList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <h1 className="text-white">HomePage</h1>

      {data.map((val) => {
        return (
          <article className="container text-white">
            <article class="bank">
              <span> {val.display_name}</span>
              <Image
                className="logo"
                src={val.logo || ""}
                width={200}
                height={92}
                alt=""
              />
            </article>
          </article>
        );
      })}
    </section>
  );
}

export default HomePage;
