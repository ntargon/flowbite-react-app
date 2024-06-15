"use client";
import {
  useSerial,
  SerialContextValue,
} from "@/app/_components/SerialProvider";

import { Button } from "flowbite-react";
import { createContext } from "react";

export default function Hoge() {
  const hoge = useSerial();

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
  return (
    <>
      <h1 className="text-2xl dark:text-white">Inbox</h1>
      <Button onClick={onClickConnectHandler}>connect</Button>
      <Button onClick={onClickDisconnectHandler}>disconnect</Button>
      portstate: {hoge.portState}
    </>
  );
}
