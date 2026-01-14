import { Box, Text } from '@chakra-ui/react';
import { splitWordByORP } from '../utils/orp';
import { useSettings } from '../context/SettingsContext';

export function RSVPDisplay({ word }) {
  const { settings } = useSettings();
  const { before, orp, after } = splitWordByORP(word || '');

  if (!word) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        h="200px"
        w="100%"
      >
        <Text color="fg.muted" fontSize="lg">
          No text loaded
        </Text>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="200px"
      w="100%"
      position="relative"
    >
      {/* Center guide line */}
      <Box
        position="absolute"
        top="0"
        bottom="0"
        left="50%"
        w="2px"
        bg="border.muted"
        opacity={0.3}
      />

      {/* Word display */}
      <Text
        fontSize="5xl"
        fontWeight="bold"
        fontFamily="'Inter', system-ui, sans-serif"
        letterSpacing="0.02em"
        whiteSpace="nowrap"
        style={{
          color: settings.textColor,
        }}
      >
        <Box as="span" opacity={0.9}>
          {before}
        </Box>
        <Box
          as="span"
          style={{ color: settings.highlightColor }}
          fontWeight="extrabold"
        >
          {orp}
        </Box>
        <Box as="span" opacity={0.9}>
          {after}
        </Box>
      </Text>
    </Box>
  );
}
