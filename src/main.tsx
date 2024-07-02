import ReactDOM from "react-dom/client"
import Provider from "./Provider"
import Router from "./Router"
import Container from "./Container"
import "./styles/styles.css"
import "./styles/index.css"
import React from 'react';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <Container>
      <Router />
    </Container>
  </Provider>
)


const App: React.FC = () => {
  return (
    <div className="bg-red-500 text-white p-4">
      Tailwind CSS is working!
    </div>
  );
};