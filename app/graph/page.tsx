import React from "react";
import LineChart from "@/app/_components/LineChart";

export default function Graph() {
  return (
    <>
      <h1>Graph</h1>
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <LineChart></LineChart>
        </div>
        <div className="col-span-1">
          <LineChart></LineChart>
        </div>
      </div>
    </>
  );
}
