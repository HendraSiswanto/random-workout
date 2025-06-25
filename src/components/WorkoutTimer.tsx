import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const WorkoutTimer = () => {
  const INITIAL_TIME = 60 * 5;
  const [seconds, setSeconds] = useState(INITIAL_TIME);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setSeconds(INITIAL_TIME);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const secsLeft = secs % 60;
    return `${String(mins).padStart(2, "0")}:${String(secsLeft).padStart(2, "0")}`;
  };

  return (
    <Box textAlign="center" mt={6}>
      <Text fontSize="2xl" fontWeight="bold">
        ⏳ {formatTime(seconds)}
      </Text>
      <HStack justify="center" mt={2}>
        <Button size="sm" onClick={toggleTimer} colorScheme={isActive ? "red" : "green"} isDisabled={seconds === 0}>
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button size="sm" onClick={resetTimer} variant="outline">
          Reset
        </Button>
      </HStack>
    </Box>
  );
};

export default WorkoutTimer;
