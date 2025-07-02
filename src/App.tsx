import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./components/Landing";
import WorkoutScreen from "./components/WorkoutScreen";
import WorkoutHistory from "./components/WorkoutHistory";
import { Flex, Heading, HStack, Button } from "@chakra-ui/react";
import ColorModeSwitcher from "./components/ColorModeSwitcher";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Flex justify="space-between" align="center" px={4} py={3}>
        <HStack>
          <Heading size="md">🏋️WorkoutGen</Heading>
        </HStack>
        <HStack>
          <Button size="sm" onClick={() => navigate("/")}>Home</Button>
          <Button size="sm" onClick={() => navigate("/history")}>History</Button>
          <ColorModeSwitcher />
        </HStack>
      </Flex>

      <Routes>
        <Route path="/" element={<Landing onStart={() => navigate("/workout")} />} />
        <Route path="/workout" element={<WorkoutScreen />} />
        <Route path="/history" element={<WorkoutHistory />} />
      </Routes>
    </>
  );
}

export default App;
