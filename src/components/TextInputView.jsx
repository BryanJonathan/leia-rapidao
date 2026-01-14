import { useState } from 'react';
import { VStack, Textarea, Button, Text, Box } from '@chakra-ui/react';

export function TextInputView({ onSubmit, currentText }) {
  const [text, setText] = useState(currentText || '');

  const handleSubmit = () => {
    if (text.trim()) {
      onSubmit(text.trim());
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <VStack gap={6} py={8} px={4} maxW="800px" mx="auto" w="100%">
      <Text fontSize="xl" fontWeight="bold">
        Paste your text
      </Text>

      <Box w="100%">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          size="lg"
          minH="300px"
          resize="vertical"
          fontFamily="'Inter', system-ui, sans-serif"
        />
        <Text fontSize="sm" color="fg.muted" mt={2} textAlign="right">
          {wordCount} words
        </Text>
      </Box>

      <Button
        colorPalette="blue"
        size="lg"
        onClick={handleSubmit}
        disabled={!text.trim()}
      >
        Start Reading
      </Button>
    </VStack>
  );
}
