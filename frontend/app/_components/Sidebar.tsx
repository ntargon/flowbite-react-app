"use client";

import { Sidebar as FlowbiteSidebar } from "flowbite-react";
import { HiInbox, HiHome, HiChartBar } from "react-icons/hi";
import Link from "next/link";

export function Sidebar() {
  return (
    <FlowbiteSidebar>
      <FlowbiteSidebar.Items>
        <FlowbiteSidebar.ItemGroup>
          <FlowbiteSidebar.Item as={Link} href="/" icon={HiHome}>
            Home
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item as={Link} href="/inbox" icon={HiInbox}>
            Inbox
          </FlowbiteSidebar.Item>
          <FlowbiteSidebar.Item as={Link} href="/graph" icon={HiChartBar}>
            Graph
          </FlowbiteSidebar.Item>
        </FlowbiteSidebar.ItemGroup>
      </FlowbiteSidebar.Items>
    </FlowbiteSidebar>
  );
}
