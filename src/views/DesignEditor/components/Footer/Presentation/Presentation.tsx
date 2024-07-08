import React from "react";
import Common from "./Common";
import Scenes from "./Scenes";

const MyComponent: React.FC = () => {
  return (
    <div className="bg-white">
      <Scenes />
      <Common />
    </div>
  );
};

export default MyComponent;
