"use client";

import { DarkThemeToggle } from "flowbite-react";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [post, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setPosts(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <main>
      <h1 className="text-2xl dark:text-white">Flowbite React + Next.js</h1>
      <DarkThemeToggle />
      <div>
        {post.map((val) => {
          return <div key={val.id}>{val.id}</div>;
        })}
      </div>
    </main>
  );
}
