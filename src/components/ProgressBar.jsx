import { Box, Text, HStack } from '@chakra-ui/react';

export function ProgressBar({ current, total, progress }) {
  return (
    <Box w="100%" maxW="600px" mx="auto">
      <HStack justify="space-between" mb={2}>
        <Text fontSize="sm" color="fg.muted">
          Word {current} of {total}
        </Text>
        <Text fontSize="sm" color="fg.muted">
          {Math.round(progress)}%
        </Text>
      </HStack>
      <Box
        w="100%"
        h="8px"
        bg="bg.muted"
        borderRadius="full"
        overflow="hidden"
      >
        <Box
          h="100%"
          bg="blue.500"
          borderRadius="full"
          transition="width 0.1s ease-out"
          style={{ width: `${progress}%` }}
        />
      </Box>
    </Box>
  );
}
