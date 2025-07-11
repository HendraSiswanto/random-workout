import { useState, type FormEvent } from "react";
import { auth, googleProvider } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  Text,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionBox = motion(Box);

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    setEmailError(false);
    setPasswordError(false);

    if (!email) setEmailError(true);
    if (!password) setPasswordError(true);
    if (!email || !password) return;

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registered!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onLogin();
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      googleProvider.setCustomParameters({
        prompt: "select_account", 
      });

      await signInWithPopup(auth, googleProvider);
      onLogin();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Flex height="100vh" align="center" justify="center">
      <Container maxW="sm" p={6} boxShadow="lg" borderRadius="md">
        <MotionBox
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading>{isRegister ? "Register" : "Login"}</Heading>
          <form onSubmit={handleEmailAuth}>
            <VStack spacing={1} mt={4}>
              <FormControl isInvalid={emailError}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  mb={2}
                />
                {emailError && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={passwordError}>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  mb={2}
                />
                {passwordError && (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </FormControl>
              <Button mb={1} colorScheme="teal" width="full" type="submit">
                {isRegister ? "Register" : "Login"}
              </Button>
              <Button
                onClick={handleGoogleLogin}
                leftIcon={
                  <Box boxShadow="md" borderRadius="full">
                    <FcGoogle size="24px" />
                  </Box>
                }
                colorScheme="red"
                width="full"
              >
                Login with Google
              </Button>
            </VStack>
          </form>

          <Text mt={4} textAlign="center">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <Button
              variant="link"
              colorScheme="teal"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login" : "Register"}
            </Button>
          </Text>
        </MotionBox>
      </Container>
    </Flex>
  );
}
