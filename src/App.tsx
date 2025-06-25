import { useState } from "react";
import Landing from "./components/Landing";
import WorkoutScreen from "./components/WorkoutScreen";
import { Flex, Heading, HStack } from "@chakra-ui/react";
import ColorModeSwitcher from "./components/ColorModeSwitcher";

function App() {

  const [started, setStarted] = useState(false);

  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        px={4}
        py={3}
      >
        <HStack>
          <Heading size="md">🏋️WorkoutGen</Heading>
        </HStack>
        <ColorModeSwitcher />
      </Flex>

    {!started ? <Landing onStart={() => setStarted(true)} /> : <WorkoutScreen />}
  </>
  );
}

export default App;
