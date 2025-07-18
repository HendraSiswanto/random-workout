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
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
const MotionBox = motion.create(Box);

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const toast = useToast();

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
        toast({
          title: "Logged in",
          description: "Successfully logged in with Email.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      const errorCode = err.code;
      if (errorCode === "auth/invalid-credential") {
        toast({
          title: "Login failed",
          description: "Email or password is incorrect.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (errorCode === "auth/email-already-in-use") {
        toast({
          title: "Email already used",
          description:
            "This email is already registered. Please log in instead.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      } else if (errorCode === "auth/invalid-email") {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (errorCode === "auth/weak-password") {
        toast({
          title: "Weak password",
          description: "Password should be at least 6 characters.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Authentication error",
          description: err.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onLogin();
      toast({
        title: "Logged in",
        description: "Successfully logged in with Google.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      const code = err.code;

      if (code === "auth/popup-closed-by-user") {
        toast({
          title: "Login canceled",
          description: "You closed the Google login popup.",
          status: "warning",
          duration: 4000,
          isClosable: true,
        });
      } else if (code === "auth/unauthorized-domain") {
        toast({
          title: "Unauthorized domain",
          description:
            "Check Firebase Authentication settings for allowed domains.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else if (code === "auth/account-exists-with-different-credential") {
        toast({
          title: "Account conflict",
          description: "This email is already registered with another method.",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login failed",
          description: err.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
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
