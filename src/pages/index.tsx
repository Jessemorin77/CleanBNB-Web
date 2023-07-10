import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import HomeHero from "~/components/HomeHero";
import Card from "~/components/card";
import Footer from "~/components/footer";
import Header from "~/components/header";
import Hero from "~/components/hero";
import Statistics from "~/components/statistics";
import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <div>
      <Header>
        <div>
          <HomeHero />
        </div>
        <div>
          <Hero />
        </div>
        <div>
          <Statistics />
        </div>
        <div>
          <Footer />
        </div>
      </Header>
    </div>
  );
}
