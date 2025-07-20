import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { auth } from "./firebase";

import Landing from "./components/Landing";
import WorkoutScreen from "./components/WorkoutScreen";
import WorkoutHistory from "./components/WorkoutHistory";
import Login from "./components/Login";
import {
  Flex,
  Heading,
  HStack,
  Button,
  Box,
  useColorModeValue,
  Text,
  Stack,
} from "@chakra-ui/react";
import ColorModeSwitcher from "./components/ColorModeSwitcher";

function App() {
  const navigate = useNavigate();
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  if (!user) return <Login onLogin={() => navigate("/")} />;

  return (
    <Box minH="100vh">
      <Box
        position="relative"
        borderBottom="1px solid"
        borderColor={borderColor}
        px={4}
        py={3}
      >
        <Flex
          align="center"
          justify="space-between"
          w="100%"
          px={{ base: 2, sm: 4 }}
          py={2}
        >
          <HStack spacing={2}>
            <Text fontSize="xl">🏋️</Text>
            <Heading size="md">WorkoutGen</Heading>
          </HStack>

          <HStack spacing={2}>
            <ColorModeSwitcher />
            <Button size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </HStack>
        </Flex>

        <Stack direction="row" spacing={4} mt={3} justify="center" w="full">
          <Button size="sm" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button size="sm" onClick={() => navigate("/history")}>
            History
          </Button>
        </Stack>
      </Box>

      <Routes>
        <Route
          path="/"
          element={<Landing onStart={() => navigate("/workout")} />}
        />
        <Route path="/workout" element={<WorkoutScreen />} />
        <Route path="/history" element={<WorkoutHistory />} />
      </Routes>
    </Box>
  );
}

export default App;
