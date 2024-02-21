"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { createLink, getBanks } from "./services/bankService";
import { useRouter } from "next/navigation";

import Image from "next/image";

const getBaknsList = async () => {
  const data = await getBanks();
  console.log(data.data.results);
  return data.data.results;
};

function HomePage() {
  const [data, setdata] = useState([]);
  const router = useRouter();

  const redirectDetailsCreateLink = async (name, display_name) => {
    const objLink = {
      institution: name,
      username: "bnk100",
      password: "full",
      external_id: "security-testing",
      access_mode: "single",
      credentials_storage: "5d",
      stale_in: "30d",
      fetch_resources: ["ACCOUNTS", "OWNERS", "TRANSACTIONS"],
    };

    const create = await createLink(objLink);
    console.log(create);

    const result = {
      id: create.data.id,
      display_name,
    };

    router.push(`/transactions?id=${create.data.id}&name=${display_name}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const banksList = await getBaknsList();
      setdata(banksList);
    };

    fetchData();
  }, []);

  useLayoutEffect(() => {
    if (!sessionStorage.getItem("idToken")) {
      redirect("/login");
    }
  }, []);

  return (
    <section>
      <h1 className="text-white ml-4 text-[28px] text-center mb-10"></h1>

      {data.map((val) => {
        return (
          <article className="container text-white" key={val.id}>
            <article
              className="bank"
              onClick={() => {
                redirectDetailsCrea123123teLink(val.name, val.display_name);
              }}
            >
              <span className="text-[20px]"> {val.display_name}</span>
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
