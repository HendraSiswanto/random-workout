import { Box, Skeleton, Stack } from "@chakra-ui/react";

const AsideSkeleton = () => {
  return (
    <Box
      display={{ base: "flex", sm: "flex" }}
      justifyContent={{ base: "center", sm: "center" }}
      mt={6}
      w="100%"
    >
      <Box w="250px" p={4} borderRadius="lg">
        <Skeleton height="20px" mb={4} />
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      </Box>
    </Box>
  );
};

export default AsideSkeleton;
