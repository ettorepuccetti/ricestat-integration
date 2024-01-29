import Head from "next/head";
import { Container } from "~/components/Container";
import { DataProvider } from "~/components/DataProvider";
import Header from "~/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Estate-in Ricestat</title>
        <meta
          name="description"
          content="Estate-in integration portal for Ricestat"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DataProvider>
        <Header />
        <Container />
      </DataProvider>
    </>
  );
}
