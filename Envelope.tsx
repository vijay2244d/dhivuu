import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Layout />} />
      </Routes>
    </HashRouter>
  );
}
