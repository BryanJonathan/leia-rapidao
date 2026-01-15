import { useState, useEffect, useCallback, useRef } from 'react';
import { tokenize, Token } from '../utils/tokenizer';
import { useSettings } from '../context/SettingsContext';

export interface RSVPState {
  currentWord: string;
  currentIndex: number;
  totalWords: number;
  isPlaying: boolean;
  progress: number;
  isFinished: boolean;
  hasText: boolean;
}

export interface RSVPActions {
  setText: (text: string) => void;
  play: () => void;
  pause: () => void;
  togglePlayPause: () => void;
  reset: () => void;
  rewind: (n?: number) => void;
  forward: (n?: number) => void;
  goToIndex: (index: number) => void;
}

export type RSVPHook = RSVPState & RSVPActions;

export function useRSVP(): RSVPHook {
  const { settings } = useSettings();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Tokenize text when it changes
  useEffect(() => {
    const newTokens = tokenize(text);
    setTokens(newTokens);
    setCurrentIndex(0);
    setIsPlaying(false);
  }, [text]);

  // Timer logic
  useEffect(() => {
    if (!isPlaying || tokens.length === 0) {
      return;
    }

    if (currentIndex >= tokens.length) {
      setIsPlaying(false);
      return;
    }

    const currentToken = tokens[currentIndex];
    const delay = settings.speed * (currentToken?.pauseMultiplier || 1);

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, currentIndex, tokens, settings.speed]);

  const play = useCallback(() => {
    if (tokens.length === 0) return;
    if (currentIndex >= tokens.length) {
      setCurrentIndex(0);
    }
    setIsPlaying(true);
  }, [tokens.length, currentIndex]);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentIndex(0);
  }, []);

  const rewind = useCallback((n = 5) => {
    setCurrentIndex((prev) => Math.max(0, prev - n));
  }, []);

  const forward = useCallback((n = 5) => {
    setCurrentIndex((prev) => Math.min(tokens.length - 1, prev + n));
  }, [tokens.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(Math.max(0, Math.min(tokens.length - 1, index)));
  }, [tokens.length]);

  const currentWord = tokens[currentIndex]?.word || '';
  const progress = tokens.length > 0 ? (currentIndex / tokens.length) * 100 : 0;
  const isFinished = currentIndex >= tokens.length && tokens.length > 0;

  return {
    // State
    currentWord,
    currentIndex,
    totalWords: tokens.length,
    isPlaying,
    progress,
    isFinished,
    hasText: tokens.length > 0,

    // Actions
    setText,
    play,
    pause,
    togglePlayPause,
    reset,
    rewind,
    forward,
    goToIndex,
  };
}
