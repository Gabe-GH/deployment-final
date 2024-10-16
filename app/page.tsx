"use server";

import { Searchbar, Table } from "./components";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const username = cookieStore.get("user")?.value;

  return (
    <>
      <div className="mx-32 pt-16">
        <Searchbar />
        <h2 className="my-12 text-2xl">{`Hello ${username}`}</h2>
        <Table />
      </div>
    </>
  );
}
