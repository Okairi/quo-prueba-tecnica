"use client";

import { useEffect, useState } from "react";
import { createLink, getBanks } from "./services/bankService";

import Image from "next/image";

const getBaknsList = async () => {
  const data = await getBanks();
  console.log(data.data.results);
  return data.data.results;
};

function HomePage() {
  const [data, setdata] = useState([]);

  const redirectDetailsCreateLink = async (name, display_name) => {
    /*     const objLink = {
      institution: name,
      username: "bnk100",
      password: "full",
      code: 1,
    }; */
    console.log("name", name);
    const objLink = {
      institution: name,
      username: "bnk100",
      password: "full",
    };

    const create = await createLink(objLink);
    console.log(create);
  };

  useEffect(() => {
    const fetchData = async () => {
      const banksList = await getBaknsList();
      setdata(banksList);
    };

    fetchData();
  }, []);

  return (
    <section>
      <h1 className="text-white">HomePage</h1>

      {data.map((val) => {
        return (
          <article className="container text-white" key={val.id}>
            <article
              className="bank"
              onClick={() => {
                redirectDetailsCreateLink(val.name, val.display_name);
              }}
            >
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
