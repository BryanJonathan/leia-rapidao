import { VStack, Box, Text } from '@chakra-ui/react';
import { RSVPDisplay } from './RSVPDisplay';
import { Controls } from './Controls';
import { ProgressBar } from './ProgressBar';

export function ReaderView({ rsvp }) {
  const {
    currentWord,
    currentIndex,
    totalWords,
    isPlaying,
    progress,
    isFinished,
    hasText,
    togglePlayPause,
    rewind,
    reset,
  } = rsvp;

  if (!hasText) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="400px"
        flexDir="column"
        gap={4}
      >
        <Text fontSize="xl" color="fg.muted">
          No text loaded
        </Text>
        <Text fontSize="sm" color="fg.muted">
          Go to "Text Input" to paste your text
        </Text>
      </Box>
    );
  }

  return (
    <VStack gap={8} py={8} px={4}>
      <RSVPDisplay word={isFinished ? '' : currentWord} />

      {isFinished && (
        <Text fontSize="xl" color="green.500" fontWeight="bold">
          ✓ Finished!
        </Text>
      )}

      <Controls
        isPlaying={isPlaying}
        onTogglePlayPause={togglePlayPause}
        onRewind={() => rewind(5)}
        onReset={reset}
        disabled={!hasText}
      />

      <ProgressBar
        current={Math.min(currentIndex + 1, totalWords)}
        total={totalWords}
        progress={progress}
      />
    </VStack>
  );
}
