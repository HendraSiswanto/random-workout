import { Box, Heading,Text } from "@chakra-ui/react";
import WorkoutCard from "../components/WorkoutCard";
import type { Exercise } from "../data/exercise";

interface Props {
  program: string | null;
  exercises: Exercise[];
}

const WorkoutDisplay = ({ program, exercises }: Props) => {
  return (
    <Box mt={3} flex="!">
      {program ? (
        <WorkoutCard program={program} exercises={exercises} />
      ) : (
        <>
          <Heading size="md" mb={4} textAlign="center" mt={7}>
            🚀 Pick a Program & Let’s Go!
          </Heading>
          <Text fontSize="sm" color="gray.500" textAlign="center" mb={2} marginLeft={1}>
            Choose what type of workout you want today
          </Text>
        </>
      )}
    </Box>
  );
};

export default WorkoutDisplay;
