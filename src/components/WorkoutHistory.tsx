import { Box, Heading, Stack, Text, Divider, Button, Flex } from "@chakra-ui/react";
import { getWorkoutHistory } from "../utils/workoutStorage";
import { clearWorkoutHistory } from "../utils/workoutStorage";

const WorkoutHistory = () => {
  const history = getWorkoutHistory();

  if (history.length === 0) {
    return (
      <Box p={6}>
        <Heading textAlign='center' size="md" mb={4}>
          Workout History
        </Heading>
        <Text textAlign='center'>No workouts recorded yet.</Text>
      </Box>
    );
  }

  return (
    <Box p={6}>
      <Flex justify='space-between'>
        
        <Heading textAlign="center" size="md" mb={6}>
          🏋️ Workout History
        </Heading>
        <Button
          size="sm"
          colorScheme="red"
          onClick={() => {
            clearWorkoutHistory();
            window.location.reload();
          }}
          mb={4}
        >
          🗑 Clear History
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
