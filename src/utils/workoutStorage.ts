
import type { Exercise } from "../data/exercise";

export interface WorkoutHistoryEntry {
  date: string;
  program: string | null;
  exercises: Exercise[];
}

const STORAGE_KEY = "workoutHistory";

export const saveWorkoutToLocalStorage = (
  program: string | null,
  exercises: Exercise[]
) => {
  const previous: WorkoutHistoryEntry[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  const newEntry: WorkoutHistoryEntry = {
    date: new Date().toISOString(),
    program,
    exercises,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify([...previous, newEntry]));
};

export const getWorkoutHistory = (): WorkoutHistoryEntry[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const clearWorkoutHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
