import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import type { Exercise } from "../data/exercise";
import WorkoutTimer from "./WorkoutTimer";
import { shuffleArray } from "../utils/shuffle";
import WorkoutChecklist from "./WorkoutChecklist";
import WorkoutControls from "./WorkoutControls";
import { saveWorkoutToLocalStorage } from "../utils/workoutStorage";
import { motion } from "framer-motion";
const MotionBox = motion.create(Box);

interface Props {
  program: string | null;
  exercises: Exercise[];
}

const WorkoutCard = ({ program, exercises }: Props) => {
  const [started, setStarted] = useState(false);
  const [shuffledExercises, setShuffledExercises] = useState<Exercise[]>([]);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [currentExercise, setCurrentExercise] = useState<number | null>(null);
  const [phase, setPhase] = useState<"workout" | "rest" | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [workoutComplete, setWorkoutComplete] = useState(false);

  useEffect(() => {
    setStarted(false);
    setChecked(Array(exercises.length).fill(false));
    setCurrentExercise(null);
    setPhase(null);
    setIsPaused(false);
    setTimerKey(0);
    setWorkoutComplete(false);
  }, [program]);

  const playBeep = () => {
    new Audio("/beep.mp3").play();
    if (navigator.vibrate) navigator.vibrate(200);
  };

  const toggleCheckbox = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const handleTimerComplete = () => {
    if (navigator.vibrate) navigator.vibrate(300);
    if (phase === "workout") {
      setPhase("rest");
      setTimerKey((prev) => prev + 1);
    } else if (phase === "rest") {
      if (currentExercise === null) return;
      const updated = [...checked];
      updated[currentExercise] = true;
      setChecked(updated);

      const nextIndex = checked.findIndex(
        (item, i) => !item && i > currentExercise
      );
      if (nextIndex !== -1) {
        setCurrentExercise(nextIndex);
        setPhase("workout");
        setTimerKey((prev) => prev + 1);
      } else {
        setCurrentExercise(null);
        setPhase(null);
        setWorkoutComplete(true);
        saveWorkoutToLocalStorage(program, shuffledExercises);
        playBeep();
      }
    }
  };

  const handleSkip = () => {
    if (phase === "workout" && currentExercise !== null) {
      const updated = [...checked];
      updated[currentExercise] = true;
      setChecked(updated);
      const nextIndex = checked.findIndex(
        (item, i) => !item && i > currentExercise
      );
      if (nextIndex !== -1) {
        setCurrentExercise(nextIndex);
        setPhase("workout");
        setTimerKey((prev) => prev + 1);
      } else {
        setCurrentExercise(null);
        setPhase(null);
        setWorkoutComplete(true);
        saveWorkoutToLocalStorage(program, shuffledExercises);
        playBeep();
      }
    } else if (phase === "rest") {
      handleTimerComplete();
    }
  };

  if (!program) return null;

  return (
    <MotionBox
      p={[4, 6]}
      borderRadius="lg"
      boxShadow="md"
      w="100%"
      maxW="600px"
      mx="auto"
      mt="0.5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heading size="md" mb={4} textAlign="center">
        Program: {program.toUpperCase()}
      </Heading>

      {!started ? (
        <Box textAlign="center">
          <Text mb={4}>Ready to crush your workout?</Text>
          <Button
            colorScheme="teal"
            onClick={() => {
              setStarted(true);
              setCurrentExercise(0);
              setPhase("workout");
              setTimerKey(1);
              const shuffled = shuffleArray(exercises).slice(0, 5);
              setShuffledExercises(shuffled);
            }}
          >
            Start Workout
          </Button>
        </Box>
      ) : (
        <>
          <WorkoutChecklist
            exercises={shuffledExercises}
            checked={checked}
            onToggle={toggleCheckbox}
          />
          {currentExercise !== null && phase !== null && (
            <>
              <WorkoutTimer
                key={timerKey}
                duration={phase === "workout" ? 60 : 2 * 60}
                onComplete={handleTimerComplete}
                isPaused={isPaused}
                children={phase === "workout" ? "Start" : "Rest"}
              />

              <WorkoutControls
                isPaused={isPaused}
                onPauseToggle={() => setIsPaused(!isPaused)}
                onSkip={handleSkip}
              />
            </>
          )}
          {workoutComplete && (
            <Box mt={4} justifySelf="center">
              <Text
                textAlign="center"
                fontWeight="medium"
                color="green.400"
                mb={2}
              >
                🎉 Workout completed!
              </Text>
              <Button
                colorScheme="teal"
                onClick={() => {
                  const shuffled = shuffleArray(exercises).slice(0, 5);
                  setShuffledExercises(shuffled);
                  setStarted(true);
                  setWorkoutComplete(false);
                  setChecked(Array(exercises.length).fill(false));
                  setCurrentExercise(0);
                  setPhase("workout");
                  setTimerKey((prev) => prev + 1);
                }}
              >
                🔁 Restart Workout
              </Button>
            </Box>
          )}
        </>
      )}
    </MotionBox>
  );
};

export default WorkoutCard;
