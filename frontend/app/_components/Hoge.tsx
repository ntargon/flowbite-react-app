"use client";
import { useSerial } from "@/app/_components/SerialProvider";

import { Button } from "flowbite-react";
import { useState, useEffect } from "react";

export default function Hoge() {
  const hoge = useSerial();
  let [str, setStr] = useState("");

  const onClickConnectHandler = () => {
    console.log("connect");
    console.log(hoge.canUseSerial);
    hoge.connect();
    console.log(hoge.canUseSerial);
  };

  const onClickDisconnectHandler = () => {
    console.log("disconnect");
    console.log(hoge.canUseSerial);
    hoge.disconnect();
    console.log(hoge.canUseSerial);
  };

  useEffect(() => {
    let unsubscribe = hoge.subscribe((e: any) => {
      console.log("read");
      console.log(e);
      setStr((str) => str + e.value);
    });

    return () => {
      unsubscribe();
      hoge.disconnect();
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl dark:text-white">Inbox</h1>
      <Button onClick={onClickConnectHandler}>connect</Button>
      <Button onClick={onClickDisconnectHandler}>disconnect</Button>
      portstate: {hoge.portState}
      str: {str}
    </>
  );
}
