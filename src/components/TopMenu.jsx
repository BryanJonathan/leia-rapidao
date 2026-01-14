import { HStack, Button, Box, Spacer } from '@chakra-ui/react';
import { ColorModeButton } from './ColorModeButton';

const VIEWS = {
  reader: 'Reader',
  input: 'Text Input',
  settings: 'Settings',
};

export function TopMenu({ activeView, onViewChange }) {
  return (
    <Box
      as="nav"
      w="100%"
      px={4}
      py={3}
      borderBottomWidth="1px"
      borderColor="border.muted"
    >
      <HStack gap={2}>
        {Object.entries(VIEWS).map(([key, label]) => (
          <Button
            key={key}
            variant={activeView === key ? 'solid' : 'ghost'}
            colorPalette={activeView === key ? 'blue' : 'gray'}
            size="sm"
            onClick={() => onViewChange(key)}
          >
            {label}
          </Button>
        ))}
        <Spacer />
        <ColorModeButton />
      </HStack>
    </Box>
  );
}
