"use client";

import {
  useSerial,
  SerialContextValue,
} from "@/app/_components/SerialProvider";
import dynamic from "next/dynamic";
const SerialProvider = dynamic(
  () => import("@/app/_components/SerialProvider"),
  { ssr: false },
);
import Hoge from "@/app/_components/Hoge";

// 省略

export default function Inbox() {
  return (
    <>
      <SerialProvider>
        <Hoge />
      </SerialProvider>
    </>
  );
}
