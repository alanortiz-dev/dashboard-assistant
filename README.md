# Dashboard Chat Assistant - Technical challenge project!

![Vue Badge](https://img.shields.io/badge/Vue_3-42B883?logo=vue.js&logoColor=fff&style=flat)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat)
![Vite Badge](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=flat)

**Dashboard Assistant** is a small chat widget built as part of a candidate challenge.
It behaves like an assistant embedded in a dashboard: you can open/close the chat, load a mocked history, send messages, and receive a polymorphic assistant response (text or an interactive Reward Card).

The project intentionally runs **without a backend**. All responses are simulated on the client side to keep the scope focused on UI, state management, and clean architecture.

## Features

- Floating button to open/close the assistant
- Chat window with header, scrollable message list, and input footer
- Mocked history loaded on open (simulated network delay)
- Send message via button or Enter key
- Assistant “typing/loading” state
- Polymorphic assistant responses:
  - Plain text messages
  - Reward Card widget (hardcoded, interactive)


## Tech stack

- **Vue 3** (Composition API)
- **TypeScript**
- **Vite**



## Getting started

1. Clone the repository:
```bash
git clone https://github.com/alanortiz-dev/dashboard-assistant
```
2. Go to the project folder:
```bash
cd dashboard-assistant
```
3. Install the dependencies and run in development mode:
```bash
npm install
npm run dev
```

* No external API is required to run this project. Everything runs locally.

## Project structure
The code is organized around three goals:
1. Keep UI components small and focused
2. Keep state + actions in a single place
3. Enforce polymorphism through TypeScript types

```text
src/
├── components/
│   └── chat/
│       ├── ChatFabButton.vue      # Floating open/close button
│       ├── ChatWindow.vue         # Popup container (header/body/footer)
│       ├── MessageList.vue        # Scrollable list wrapper
│       ├── MessageItem.vue        # Polymorphic renderer (text vs reward)
│       ├── MessageBubble.vue      # Text message bubble (user/assistant)
│       └── RewardCard.vue         # Widget message (interactive card)
├── composables/
│   └── useChat.ts                 # Single source of truth for state + actions
└── types/
    └── chat.ts                    # Discriminated unions for message types
```


## Notes
This project is intentionally small and focused.
The goal is to show clean component boundaries, predictable state, and type-safe polymorphic rendering rather than visual polish.

## Key decisions (and why)

### 1. Keep logic in one place:
All chat state and actions live in `src/composables/useChat.ts` (history loading, sending messages, typing/loading flags).  
This keeps components easier to read and prevents duplicated logic.

### 2. Type-safe polymorphic messages;
Messages are defined as discriminated unions in `src/types/chat.ts`.  
Each message has a `type`, so the UI can reliably render either a text bubble or a Reward Card without guesswork.

### 3. Clear responsibility per component:
- `ChatWindow` handles layout and user input
- `MessageList` renders the list
- `MessageItem` decides what to render based on message `type`
- `MessageBubble` renders text messages
- `RewardCard` renders the widget message

### 4. Mocked delays on purpose:
The assistant behavior is simulated with `setTimeout` to match the challenge scope (no backend) while still showing real UI states like history loading and typing.


## Live demo

You can try the app here:
[Dashboard Assistant on Vercel](https://dashboard-assistant-chi.vercel.app/)

If you enjoyed this project, feel free to connect with me:  
📧 alan.omar.ortz@gmail.com  
🌐 [LinkedIn](https://www.linkedin.com/in/alanortizdev/)

Built with care by Alan Ortiz (alanortizdev).

