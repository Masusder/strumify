// import Link from "next/link";
// import Image from 'next/image'
// import { api } from "~/trpc/server";
import styles from "./index.module.css";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  // const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className={styles.main}>
      Home
    </main>
  );
}