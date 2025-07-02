import { Flex, Box } from "@chakra-ui/react";
import { useState } from "react";
import { exercises, type Exercise } from '../data/exercise';
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
    <Flex h="100vh" p={6} gap={6}>
      <Box>
        <AsidePanel programIdeas={programIdeas} onSelect={handleSelectProgram} />
      </Box>
                            
      <WorkoutDisplay program={selectedProgram} exercises={workout} />
    </Flex>
  );
};

export default WorkoutScreen;
