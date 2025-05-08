"use client";
import axios from "axios";
import styles from "./page.module.css";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("http://localhost:3000/api/logout");
    localStorage.clear();
    router.push(
      "http://localhost:3000/login?redirect_uri=http://localhost:3002"
    );
  };

  const handleCheckSession = () => {
    // debugger;
    const savedToken = localStorage.getItem("accessToken");
    // if (savedToken) {
    //   setToken(savedToken);
    // } else {
    axios
      .get("http://localhost:3000/api/check-session", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("accessToken", res.data.token);
          setToken(res.data.token);
        } else {
          localStorage.removeItem("accessToken");
          window.location.href =
            "http://localhost:3000/login?redirect_uri=http://localhost:3002";
        }
      })
      .catch(() => {
        localStorage.removeItem("accessToken");
        window.location.href =
          "http://localhost:3000/login?redirect_uri=http://localhost:3002";
      });
    // }
  };

  useEffect(() => {
    handleCheckSession();
  }, []);
  return (
    <main className="">
      <h1>App 2</h1>
      <p>
        {token
          ? `Logged in with token: ${token.slice(0, 20)}...`
          : "Not logged in"}
      </p>
      <button onClick={handleLogout}>Logout</button>
    </main>
  );
}
