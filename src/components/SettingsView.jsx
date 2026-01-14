import { VStack, Text, Box, Input, Button, HStack } from '@chakra-ui/react';
import { useSettings } from '../context/SettingsContext';

export function SettingsView() {
  const { settings, updateSettings, resetSettings } = useSettings();

  return (
    <VStack gap={8} py={8} px={4} maxW="500px" mx="auto" w="100%">
      <Text fontSize="xl" fontWeight="bold">
        Settings
      </Text>

      {/* Speed Setting */}
      <Box w="100%">
        <Text fontWeight="medium" mb={2}>
          Speed (milliseconds per word)
        </Text>
        <Input
          type="number"
          value={settings.speed}
          onChange={(e) => updateSettings({ speed: parseInt(e.target.value) || 200 })}
          min={50}
          max={2000}
          step={10}
        />
        <Text fontSize="sm" color="fg.muted" mt={1}>
          Lower = faster. Recommended: 150-300ms
        </Text>
      </Box>

      {/* Text Color Setting */}
      <Box w="100%">
        <Text fontWeight="medium" mb={2}>
          Text Color
        </Text>
        <HStack>
          <Input
            type="color"
            value={settings.textColor}
            onChange={(e) => updateSettings({ textColor: e.target.value })}
            w="60px"
            h="40px"
            p={1}
            cursor="pointer"
          />
          <Input
            type="text"
            value={settings.textColor}
            onChange={(e) => updateSettings({ textColor: e.target.value })}
            placeholder="#ffffff"
            flex={1}
          />
        </HStack>
      </Box>

      {/* Highlight Color Setting */}
      <Box w="100%">
        <Text fontWeight="medium" mb={2}>
          ORP Highlight Color
        </Text>
        <HStack>
          <Input
            type="color"
            value={settings.highlightColor}
            onChange={(e) => updateSettings({ highlightColor: e.target.value })}
            w="60px"
            h="40px"
            p={1}
            cursor="pointer"
          />
          <Input
            type="text"
            value={settings.highlightColor}
            onChange={(e) => updateSettings({ highlightColor: e.target.value })}
            placeholder="#ff6b6b"
            flex={1}
          />
        </HStack>
      </Box>

      {/* Preview */}
      <Box
        w="100%"
        p={6}
        borderRadius="md"
        bg="bg.muted"
        textAlign="center"
      >
        <Text fontSize="sm" color="fg.muted" mb={2}>
          Preview
        </Text>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          style={{ color: settings.textColor }}
        >
          re
          <Box as="span" style={{ color: settings.highlightColor }}>
            a
          </Box>
          der
        </Text>
      </Box>

      {/* Reset Button */}
      <Button variant="outline" onClick={resetSettings}>
        Reset to Defaults
      </Button>
    </VStack>
  );
}
