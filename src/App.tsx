import { HashRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./Layout";
import { LockScreen } from "./components/LockScreen";
import { useAppStore } from "./store";
import { AnimatePresence } from "framer-motion";

export default function App() {
  const { isUnlocked, setUnlocked } = useAppStore();

  return (
    <>
      <AnimatePresence>
        {!isUnlocked && <LockScreen onUnlock={() => setUnlocked(true)} />}
      </AnimatePresence>
      <HashRouter>
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
      </HashRouter>
    </>
  );
}
