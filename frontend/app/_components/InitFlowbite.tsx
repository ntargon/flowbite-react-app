"use client";

import { useEffect } from "react";
// import { initFlowbite } from "flowbite"; <-- don't do that!

export function InitFlowbite() {
  useEffect(() => {
    import("flowbite").then((module) => module.initFlowbite());
  }, []);

  return null;
}
