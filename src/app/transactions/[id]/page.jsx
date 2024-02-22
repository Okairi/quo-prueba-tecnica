import TransactionsClient from "@/app/components/TransactionsClient";
import "../transactions.css";

const getListTransactions = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/transactions?&page=1&page_size=20&link=${id}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Basic ${process.env.NEXT_PUBLIC_BEAR}`,
        },
      }
    );
    console.log({ response });
    if (response?.status !== 200) {
      return [];
    }

    const listTransactions = await response.json();
    console.log({ list: listTransactions });
    if (!listTransactions?.results?.length) return [];
    return listTransactions?.results;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const Transactions = async ({ params: { id } }) => {
  const listTransactions = await getListTransactions(id);

  return <TransactionsClient listTransactions={listTransactions} />;
};

export default Transactions;
