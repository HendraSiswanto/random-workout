export interface Exercise {
  name: string;
  muscleGroup: string;
  equipment?: string;
  sets?: number;
  reps?: number;
}

export const exercises: Exercise[] = [
  { name: "Push-ups", muscleGroup: "Chest", sets: 3, reps: 12 },
  { name: "Squats", muscleGroup: "Legs", sets: 4, reps: 10 },
  { name: "Plank", muscleGroup: "Core", sets: 3, reps: 30 }, 
  { name: "Jumping Jacks", muscleGroup: "Full Body", sets: 3, reps: 20 },
  { name: "Lunges", muscleGroup: "Legs", sets: 3, reps: 12 },
  { name: "Burpees", muscleGroup: "Full Body", sets: 3, reps: 15 },
  { name: "Mountain Climbers", muscleGroup: "Core", sets: 3, reps: 20 },
  { name: "Pull-ups", muscleGroup: "Back", equipment: "Bar", sets: 3, reps: 8 },
  { name: "Bicep Curls", muscleGroup: "Arms", equipment: "Dumbbells", sets: 3, reps: 10 },
  { name: "Shoulder Press", muscleGroup: "Shoulders", equipment: "Dumbbells", sets: 3, reps: 10 },
];
