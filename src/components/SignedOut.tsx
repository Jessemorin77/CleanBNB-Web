import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/footer";
import Header from "~/components/header";
import Hero from "~/components/hero";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <div>
       <Header>
          <Hero />
          
        </Header> 
        <Footer />
      </div>
    </>
  );
}
