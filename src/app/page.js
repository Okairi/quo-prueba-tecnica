"use client";
import { useEffect } from "react";
import { getBanks } from "./services/bankService";

const getBaknsList = async () => {
  const data = await getBanks();
  console.log(data);
};

function HomePage() {
  useEffect(() => {
    getBaknsList();
  }, []);

  return <div>HomePage</div>;
}

export default HomePage;
