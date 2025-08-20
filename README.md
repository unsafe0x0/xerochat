# XeroChat

A modern, responsive AI chat interface built with Next.js and React. XeroChat provides a sleek ChatGPT-like experience with support for multiple AI models, conversation management, and real-time streaming responses.

![XeroChat Interface](https://img.shields.io/badge/Next.js-15.4.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)

## Features

### Core Features

- **Real-time AI Conversations** - Streaming responses with typing indicators
- **Multiple AI Models** - Support for various models including Llama, GPT-OSS, and more
- **Conversation Management** - Save, load, and delete chat histories
- **Responsive Design** - Mobile-first responsive UI with collapsible sidebar
- **Dark Theme** - Beautiful dark mode interface with neutral color palette

### Advanced Features

- **Markdown Support** - Rich text rendering with syntax highlighting for code blocks
- **Message Actions** - Copy, regenerate, and feedback options for each message
- **Settings Modal** - Secure API key management with local storage
- **Auto-save** - Automatic conversation saving to localStorage
- **Model Switching** - Easy switching between different AI models during conversations

### UI/UX Features

- **Clean Interface** - Minimalist design inspired by modern chat applications
- **Responsive Model Selection** - Desktop inline selector, mobile top navbar placement
- **Mobile Responsive** - Optimized for desktop, tablet, and mobile devices
- **Accessibility** - Keyboard navigation and screen reader friendly

## Tech Stack

- **Framework**: Next.js (App Router)
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Markdown**: React Markdown with GFM support
- **Syntax Highlighting**: Highlight.js
- **AI Integration**: OpenAI SDK, Open Router API, Google AI SDK
- **Runtime**: Bun for fast package management

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Open Router API key ([Get one here](https://console.Open Router.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/unsafe0x0/xerochat.git
   cd xerochat
   ```

2. **Install dependencies**

   ```bash
   # Using bun (recommended)
   bun install

   # Or using npm
   npm install
   ```

3. **Start the development server**

   ```bash
   # Using bun
   bun dev

   # Or using npm
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

5. **Configure API Key**
   - Click the Settings button in the sidebar
   - Enter your Open Router API key
   - Start chatting!

## Available Models

XeroChat supports the following AI models by default:

- **GPT-OSS 20B** – OpenAI’s open-weight model, optimized for performance
- **GLM-4.5 Air** – Z-AI’s lightweight, efficient model for real-time applications
- **DeepSeek R1** – Versatile model for chat and code generation
- **Qwen 3** – Powerful model for a wide range of tasks
- **MAI-DS R1** – Microsoft’s model for chat and code generation

You can add or modify models in `data/Models.tsx`.

## Project Structure

```
xerochat/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── open-router/
│   │       └── route.ts         # Open Router API endpoint
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Home page (main chat interface)
├── components/                   # React components
│   ├── ChatInterface.tsx        # Main chat interface orchestrator
│   ├── Sidebar.tsx              # Chat history sidebar
│   ├── MessageArea.tsx          # Message display area
│   ├── MessageInput.tsx         # Message input form
│   ├── ModelSelector.tsx        # Model selection dropdown
│   ├── MessageActions.tsx       # Message action buttons
│   ├── MarkdownRenderer.tsx     # Markdown content renderer
│   └── SettingsModal.tsx        # Settings modal for API keys
├── data/
│   └── Models.tsx               # Available AI models configuration
├── public/                      # Static assets (icons, images)
│   ├── favicon.ico
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── og.png
│   ├── vercel.svg
│   └── window.svg
├── bun.lock                     # Bun lockfile
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration for Tailwind
├── README.md                    # Project documentation
└── tsconfig.json                # TypeScript configuration
```

## Configuration

### Environment Variables

No environment variables required! XeroChat uses client-side API key storage for security and convenience.

### Customization

- **Models**: Edit `data/Models.tsx` to add or modify available AI models
- **Styling**: Modify Tailwind classes in components for custom theming
- **API**: Customize the chat API in `app/api/chat/route.ts`

## Usage

1. **Start a Conversation**: Click "New Chat" or start typing in the input field
2. **Switch Models**: Use the dropdown button inside the message input area to select different AI models
3. **Manage Chats**: View, load, or delete previous conversations from the sidebar
4. **Message Actions**:
   - Copy message content
   - Regenerate AI responses
   - Provide feedback (thumbs up/down)
5. **Settings**: Configure your API key through the settings modal

## API Integration

XeroChat uses the Open Router API for AI completions:

```typescript
// Example API call structure
const response = await fetch("/api/open-router", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: conversationHistory,
    model: selectedModel.id,
    accessToken: apiKey,
  }),
});
```

## Security

- **Client-side API Keys**: API keys are stored securely in browser localStorage
- **No Server-side Storage**: No sensitive data is stored on the server
- **HTTPS Required**: API communications use secure HTTPS connections

## Build & Deploy

### Build for Production

```bash
# Using bun
bun run build

# Using npm
npm run build
```

### Start Production Server

```bash
# Using bun
bun start

# Using npm
npm start
```

### Deploy

Deploy easily on platforms like:

- [Vercel](https://vercel.com/) (recommended for Next.js)
- [Netlify](https://netlify.com/)
- [Railway](https://railway.app/)
- Any Node.js hosting platform

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Open Router](https://openrouter.ai/) for providing fast AI inference
- [Lucide](https://lucide.dev/) for the beautiful icon set
- [Vercel](https://vercel.com/) for the deployment platform

## Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check existing discussions and issues
- Review the documentation

---

**Built with ❤️ by unsafe0x0**

_XeroChat - Where conversations meet cutting-edge AI technology_
