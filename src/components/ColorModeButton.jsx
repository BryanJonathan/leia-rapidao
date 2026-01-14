import { IconButton } from '@chakra-ui/react';

export function ColorModeButton() {
  // Chakra UI v3 doesn't have useColorMode hook
  // For now, we'll just show the button without functionality
  // TODO: Implement with Chakra v3 color mode system
  return (
    <IconButton
      aria-label="Toggle color mode"
      variant="ghost"
      size="sm"
      disabled
    >
      🌙
    </IconButton>
  );
}
