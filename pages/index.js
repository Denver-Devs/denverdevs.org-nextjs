import axios from "axios";
import Head from "next/head";
import Header from "../components/header";
import InviteForm from "../components/InviteForm";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Header />
      <section className="container m-auto py-6">
        <InviteForm />
      </section>
    </div>
  );
}
