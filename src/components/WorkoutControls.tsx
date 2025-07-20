import { Button, HStack } from "@chakra-ui/react";

interface Props {
  isPaused: boolean;
  onPauseToggle: () => void;
  onSkip: () => void;
}


const WorkoutControls = ({ isPaused, onPauseToggle, onSkip }: Props) => {
  return (
    <HStack mt={4} justify="center">
      <Button colorScheme="yellow" onClick={onPauseToggle}>
        {isPaused ? "Resume" : "Pause"}
      </Button>
      <Button colorScheme="red" onClick={onSkip}>
        Skip
      </Button>
    </HStack>
  );
};

export default WorkoutControls;
