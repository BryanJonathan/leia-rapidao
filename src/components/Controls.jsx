import { HStack, IconButton, Button } from '@chakra-ui/react';

export function Controls({
  isPlaying,
  onTogglePlayPause,
  onRewind,
  onReset,
  disabled,
}) {
  return (
    <HStack gap={3} justify="center">
      <IconButton
        aria-label="Rewind 5 words"
        variant="outline"
        size="lg"
        onClick={onRewind}
        disabled={disabled}
      >
        ⏪
      </IconButton>

      <Button
        size="lg"
        colorPalette={isPlaying ? 'orange' : 'green'}
        onClick={onTogglePlayPause}
        disabled={disabled}
        minW="120px"
      >
        {isPlaying ? '⏸ Pause' : '▶ Play'}
      </Button>

      <IconButton
        aria-label="Reset"
        variant="outline"
        size="lg"
        onClick={onReset}
        disabled={disabled}
      >
        ⏹
      </IconButton>
    </HStack>
  );
}
