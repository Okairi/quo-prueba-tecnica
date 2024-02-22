"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { createLink, getBanks } from "./services/bankService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SpinerLoading } from "./components/SpinerLoading";

import { useMyContext } from "../app/context/BankContext";

const getBaknsList = async () => {
  const data = await getBanks();
  return data.data.results;
};

function HomePage() {
  const [data, setdata] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { myState, updateState } = useMyContext();

  const redirectDetailsCreateLink = async (name, display_name) => {
    setIsLoading(true);
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

    const result = {
      id: create.data.id,
      display_name,
    };
    updateState(result);
    router.push(`/transactions`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const banksList = await getBaknsList();
      setdata(banksList);
      setIsLoading(false);
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
      {isLoading ? (
        <SpinerLoading></SpinerLoading>
      ) : (
        data.map((val) => {
          return (
            <article
              className="container-home text-white mb-4 w-[20px]"
              key={val.id}
            >
              <article
                className="bank mb-[20px]"
                onClick={() => {
                  redirectDetailsCreateLink(val.name, val.display_name);
                }}
              >
                <span className="text-[12px] sm:text-[20px]">
                  {" "}
                  {val.display_name}
                </span>
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
        })
      )}
    </section>
  );
}

export default HomePage;
