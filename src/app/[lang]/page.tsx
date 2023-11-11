// import Link from "next/link";
// import Image from 'next/image'
// import { api } from "~/trpc/server";
import styles from "./index.module.css";

import { api } from "~/trpc/server";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

    // const userTunings = await api.post.getUserTunings.query();

    // console.log(userTunings)



  return (
    <main className={styles.main}>
      Home
    </main>
  );
}