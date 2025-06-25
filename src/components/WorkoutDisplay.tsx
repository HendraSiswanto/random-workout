import { Box, Text } from "@chakra-ui/react";
import WorkoutCard from "../components/WorkoutCard";
import type { Exercise } from "../data/exercise";


interface Props {
  program: string | null;
  exercises: Exercise[];
}

const WorkoutDisplay = ({ program, exercises }: Props) => {
  return (
    <Box mt={3} flex="1">
      {program ? (
        <WorkoutCard program={program} exercises={exercises} />
      
      ) : (
        <Text fontSize="lg" color="gray.500">
          👈 Choose a program to get started
        </Text>
      )}
    </Box>
  );
};

export default WorkoutDisplay;