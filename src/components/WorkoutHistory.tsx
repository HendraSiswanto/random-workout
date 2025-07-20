import {
  Box,
  Heading,
  Stack,
  Text,
  Divider,
  Button,
  Flex,
} from "@chakra-ui/react";
import { getWorkoutHistory } from "../utils/workoutStorage";
import { clearWorkoutHistory } from "../utils/workoutStorage";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import type { WorkoutHistoryEntry } from "../utils/workoutStorage";

const WorkoutHistory = () => {
  const [history, setHistory] = useState<WorkoutHistoryEntry[]>([]);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    const data = getWorkoutHistory();
    setHistory(data);
  }, []);

  if (history.length === 0) {
    return (
      <Box p={6}>
        <Heading textAlign="center" size="md" mb={4}>
          Workout History
        </Heading>
        <Text textAlign="center">No workouts recorded yet.</Text>
      </Box>
    );
  }

  if (isClearing) {
    return (
      <Box p={6} textAlign="center">
        <Spinner size="md" />
        <Text mt={4}>Clearing history...</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Flex justify="space-between">
        <Heading textAlign="center" size="md" mb={6}>
          🏋️ Workout History
        </Heading>
        <Button
          size="sm"
          colorScheme="red"
          onClick={async () => {
            setIsClearing(true);
            await new Promise((res) => setTimeout(res, 500));
            clearWorkoutHistory();
            setHistory([]);
            setIsClearing(false);
          }}
          mb={4}
        >
          <Box display={{ base: "inline", sm: "none" }}>🗑</Box>
          <Box display={{ base: "none", md: "inline" }}>🗑 Clear History</Box>
        </Button>
      </Flex>
      <Stack spacing={6}>
        {history.map((entry, index) => (
          <Box key={index}>
            <Box borderWidth="1px" p={4} borderRadius="md" boxShadow="sm">
              <Text fontWeight="bold" mb={2}>
                {new Date(entry.date).toLocaleString()}
              </Text>
              <Text fontSize="sm" mb={2}>
                Program: <strong>{entry.program?.toUpperCase()}</strong>
              </Text>
              <Stack spacing={1}>
                {entry.exercises.map((ex, i) => (
                  <Text key={i} fontSize="sm">
                    • {ex.name} — {ex.reps} reps × {ex.sets} sets
                  </Text>
                ))}
              </Stack>
            </Box>

            {index !== history.length - 1 && <Divider my={4} />}
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default WorkoutHistory;
