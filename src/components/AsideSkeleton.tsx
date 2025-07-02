import { Box, Skeleton, Stack } from "@chakra-ui/react";

const AsideSkeleton = () => {
  return (
    <Box mt={6} w="250px" p={4} borderRadius="lg">
      <Skeleton height="20px" mb={4} />
      <Stack spacing={3}>
        <Skeleton height="40px" />
        <Skeleton height="40px" />
        <Skeleton height="40px" />
      </Stack>
    </Box>
  );
};

export default AsideSkeleton;
