import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { LockScreen } from "./components/LockScreen";
import { useAppStore } from "./store";

export default function App() {
  const { isUnlocked, setUnlocked } = useAppStore();

  return (
    <>
      {!isUnlocked && <LockScreen onUnlock={() => setUnlocked(true)} />}
      <HashRouter>
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
      </HashRouter>
    </>
  );
}
