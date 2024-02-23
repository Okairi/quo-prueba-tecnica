"use client";

import { useEffect, useLayoutEffect, useState } from "react";
import { createLink, getBanks } from "./services/bankService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SpinerLoading } from "./components/SpinerLoading";
import Swal from "sweetalert2";
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
      username: myState?.username ?? "alessandro",
    };
    try {
      const create = await createLink(objLink);

      if (create) {
        const result = {
          id: create.data.id,
          display_name,
        };
        updateState(result);
        router.push(`/transactions/${result?.id}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
        confirmButtonText: "Cerrar",
      }).then((result) => {
        location.reload();
      });
    }
  };

  const redirectAccountsBank = async (name, display_name) => {
    setIsLoading(true);
    const objLink = {
      institution: name,
      username: myState?.username ?? "alessandro",
      password: "full",
      external_id: "security-testing",
      access_mode: "single",
      credentials_storage: "5d",
      stale_in: "30d",
      fetch_resources: ["ACCOUNTS", "OWNERS", "TRANSACTIONS"],
    };
    try {
      const create = await createLink(objLink);

      if (create) {
        const result = {
          id: create.data.id,
          display_name,
        };
        updateState(result);
        router.push(`/accounts/${result?.id}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
        confirmButtonText: "Cerrar",
      }).then((result) => {
        location.reload();
      });
    }
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
    <section className="container mx-auto">
      {isLoading ? (
        <SpinerLoading></SpinerLoading>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 container-list-bank">
          {data.map((val) => (
            <article
              className="bank-card cursor-pointer bg-[white] p-4 rounded-md card-bank-list"
              key={val.id}
              onClick={() => {
                redirectAccountsBank(val.name, val.display_name);
              }}
            >
              <span className="text-lg font-bold">{val.display_name}</span>
              {val.logo && (
                <div className="mt-2 max-w-[200px] mx-auto">
                  <Image
                    src={val.logo}
                    width={200}
                    height={92}
                    alt=""
                    className="object-contain"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default HomePage;
