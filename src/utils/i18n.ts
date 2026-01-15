export type Language = 'pt' | 'en';

export interface Translations {
  // TextInputSection
  title: string;
  subtitle: string;
  placeholder: string;
  wordSingular: string;
  wordPlural: string;
  startReading: string;
  textInputAriaLabel: string;

  // SettingsPanel
  settings: string;
  speed: string;
  textColor: string;
  highlightColor: string;
  language: string;
  openSettings: string;
  closeSettings: string;

  // Controls
  rewind: string;
  play: string;
  pause: string;
  reset: string;

  // WordDisplay
  finished: string;

  // ReaderSection
  newText: string;
}

const pt: Translations = {
  // TextInputSection
  title: 'Leitura Rápida',
  subtitle: 'Cole seu texto e leia mais rápido',
  placeholder: 'Cole seu texto aqui...',
  wordSingular: 'palavra',
  wordPlural: 'palavras',
  startReading: 'Iniciar Leitura',
  textInputAriaLabel: 'Campo de texto para leitura',

  // SettingsPanel
  settings: 'Configurações',
  speed: 'Velocidade (ms)',
  textColor: 'Cor do Texto',
  highlightColor: 'Cor do Destaque',
  language: 'Idioma',
  openSettings: 'Abrir configurações',
  closeSettings: 'Fechar configurações',

  // Controls
  rewind: 'Voltar 5 palavras',
  play: 'Reproduzir',
  pause: 'Pausar',
  reset: 'Reiniciar',

  // WordDisplay
  finished: 'Concluído!',

  // ReaderSection
  newText: 'Novo Texto',
};

const en: Translations = {
  // TextInputSection
  title: 'Speed Reading',
  subtitle: 'Paste your text and read faster',
  placeholder: 'Paste your text here...',
  wordSingular: 'word',
  wordPlural: 'words',
  startReading: 'Start Reading',
  textInputAriaLabel: 'Text input for reading',

  // SettingsPanel
  settings: 'Settings',
  speed: 'Speed (ms)',
  textColor: 'Text Color',
  highlightColor: 'Highlight Color',
  language: 'Language',
  openSettings: 'Open settings',
  closeSettings: 'Close settings',

  // Controls
  rewind: 'Rewind 5 words',
  play: 'Play',
  pause: 'Pause',
  reset: 'Reset',

  // WordDisplay
  finished: 'Done!',

  // ReaderSection
  newText: 'New Text',
};

export const translations: Record<Language, Translations> = {
  pt,
  en,
};

export function getTranslations(language: Language): Translations {
  return translations[language];
}
