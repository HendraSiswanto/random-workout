import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import type { Exercise } from "../data/exercise";

interface Props {
  program: string;
  exercises: Exercise[];
}

const WorkoutCard = ({ program, exercises }: Props) => {
  const muscleGroups = [...new Set(exercises.map(e => e.muscleGroup))].join(", ");

  return (
    <Box borderWidth="1px" borderRadius="xl" p={6} shadow="md" w="100%">
      <Heading size="md" mb={2}>
        🏋️ {program.charAt(0).toUpperCase() + program.slice(1)} Program
      </Heading>
      <Text color="gray.500" fontSize="sm" mb={4}>
        Muscle groups: {muscleGroups}
      </Text>

      <Stack spacing={3}>
        {exercises.map((ex, idx) => (
          <Box key={idx}>
            <Text fontWeight="bold">{ex.name}</Text>
            <Text fontSize="sm" color="gray.500">
              {ex.sets} × {ex.reps} {ex.name.toLowerCase().includes("plank") ? "sec" : "reps"}
              {ex.equipment ? ` • ${ex.equipment}` : ""}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default WorkoutCard;