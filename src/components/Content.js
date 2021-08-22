import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Tasks from "./Tasks";

const Content = () => {
  const [selectedTab, setSelectedTab] = useState("INBOX");
  return (
    <article className="content">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <Tasks selectedTab={selectedTab} />
    </article>
  );
};

export default Content;
