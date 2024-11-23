import Head from "next/head";
import localFont from "next/font/local";
import GridEditor from "@/components/GridEditor";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Grid</title>
        <meta name="description" content="Dynamic Grid Editor" />
        <link rel="icon" href="/grid.ico" />
      </Head>
      <div className={` ${geistSans.variable} ${geistMono.variable}`}>
        <main>
          <Toaster />
          <GridEditor />
        </main>
      </div>
    </>
  );
}
