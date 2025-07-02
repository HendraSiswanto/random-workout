import { Checkbox, Stack, Text } from "@chakra-ui/react";
import type { Exercise } from "../data/exercise";

interface Props {
  exercises: Exercise[];
  checked: boolean[];
  onToggle: (index: number) => void;
}

const WorkoutChecklist = ({ exercises, checked, onToggle }: Props) => {
  return (
    <Stack spacing={3} mb={6}>
      {exercises.map((exercise, index) => (
        <Checkbox
          key={exercise.name}
          isChecked={checked[index]}
          disabled
          onChange={() => onToggle(index)}
        >
          <Text fontWeight="medium">
            {exercise.name} - {exercise.reps} reps × {exercise.sets} sets
          </Text>
        </Checkbox>
      ))}
    </Stack>
  );
};

export default WorkoutChecklist;
