import { Flex, Box } from "@chakra-ui/react";
import { useState } from "react";
import { exercises, type Exercise } from "../data/exercise";
import AsidePanel from "../components/AsidePanel";
import WorkoutDisplay from "../components/WorkoutDisplay";
import { programIdeas } from "../data/programideas";

const WorkoutScreen = () => {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [workout, setWorkout] = useState<Exercise[]>([]);

  const handleSelectProgram = (type: string) => {
    setSelectedProgram(type);
    const shuffled = [...exercises].sort(() => 0.5 - Math.random());
    setWorkout(shuffled.slice(0, 5));
  };

  return (
    <Flex
      direction={["column", "row"]}
      p={[4, 6]}
      gap={[4, 6]}
      align="stretch"
      h="auto"
      minH="100vh"
    >
      <Box w={["100%", "250px"]} mb={[4, 0]}>
        <AsidePanel
          programIdeas={programIdeas}
          onSelect={handleSelectProgram}
        />
      </Box>

      <Box flex="1">  
        <WorkoutDisplay program={selectedProgram} exercises={workout} />
      </Box>
    </Flex>
  );
};

export default WorkoutScreen;
