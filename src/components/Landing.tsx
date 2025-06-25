import {
  Box,
  Button,
  Heading,
  VStack,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

const MotionVStack = motion.create(VStack);

const Landing = ({ onStart }: Props) => {
  return (
    <Box height="100vh">
      
      <MotionVStack
        spacing={6}
        justify="center"
        align="center"
        height="75vh"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <Heading size="xl" textAlign="center">
          Random Workout Generator 💪
        </Heading>
        <Text fontSize="lg" color="gray.500" textAlign="center" maxW="300px">
          Get a quick full-body workout in seconds — no planning needed!
        </Text>
        <Button size="lg" colorScheme="brand" onClick={onStart}>
          Start Workout
        </Button>
      </MotionVStack>
    </Box>
    
  );
};

export default Landing;
