```md
# Leitura Rápida com RSVP + ORP

## Ideia Principal

Criar um site que permita ao usuário **ler textos de forma mais rápida e eficiente**, reduzindo o esforço visual e cognitivo, utilizando duas técnicas comprovadas:

1. **RSVP (Rapid Serial Visual Presentation)**
2. **ORP (Optimal Recognition Point)**

O objetivo é transformar a leitura em um fluxo contínuo de palavras, apresentadas uma a uma, sempre no mesmo ponto da tela.

---

## Conceitos Fundamentais

### 1. RSVP — Rapid Serial Visual Presentation
- Exibe **uma palavra por vez**
- Sempre na **mesma posição da tela**
- Elimina movimentos sacádicos dos olhos
- Aumenta a velocidade de leitura

### 2. ORP — Optimal Recognition Point
- Cada palavra possui um ponto ideal de reconhecimento pelo cérebro
- Esse ponto é destacado visualmente
- Todos os ORPs ficam alinhados, facilitando o processamento

Exemplo visual simplificado:

```

|     |
| reAder |
|     |

```

(A letra em destaque representa o ORP)

---

## Regra Prática de ORP

Índice do ORP baseado no tamanho da palavra (0-based):

| Tamanho da palavra | Índice do ORP |
|-------------------|--------------|
| 1–2 letras        | 0 |
| 3–5 letras        | 1 |
| 6–9 letras        | 2 |
| 10–13 letras      | 3 |
| 14+ letras        | 4 |

---

## Funcionamento do Site

### Fluxo Básico
1. Usuário insere um texto (colar texto ou link)
2. Texto é tokenizado em palavras
3. As palavras são exibidas em sequência (RSVP)
4. O ORP de cada palavra é destacado
5. Pausas inteligentes são aplicadas conforme pontuação

---

## Pausas Inteligentes

Para melhorar a compreensão:

- `,` → pequena pausa extra
- `.`, `!`, `?` → pausa maior
- Quebra de parágrafo → pausa prolongada

---

## Interface do Usuário (UX)

### Elemento Central
- Caixa fixa no centro da tela
- Apenas a palavra muda
- ORP sempre alinhado

### Controles
- Velocidade (palavras por minuto)
- Pausar / continuar
- Retroceder algumas palavras
- Ajuste de fonte
- Modo claro / escuro

---

## Stack Sugerida

### Frontend
- React + Vite
- Controle de tempo via `setTimeout` ou `requestAnimationFrame`

### Tipografia
- Fontes legíveis e estáveis:
  - Inter
  - Roboto Mono
  - IBM Plex Mono

---

## Diferenciais Futuramente

- Modo treino (aumento gradual de WPM)
- Testes rápidos de compreensão
- Estatísticas de leitura
- Foco em experiência mobile

---

## Objetivo Final

Prover uma ferramenta de leitura rápida que:
- Reduza esforço ocular
- Aumente velocidade de leitura
- Preserve compreensão
- Seja simples, acessível e eficiente
```
