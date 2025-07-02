import { Box, Progress, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  duration: number;         
  onComplete: () => void;
  children: string;
  isPaused?: boolean;
}

const WorkoutTimer = ({ children,duration, onComplete }: Props) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);  
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const progress = (timeLeft / duration) * 100;

  
  return (
    <Box mt={4}>
      <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={2}>
        ⏱️ {children}: {formatTime(timeLeft)}
      </Text>
      <Progress value={progress} size="sm" colorScheme="teal" borderRadius="full" />
    </Box>
  );
};

export default WorkoutTimer;
