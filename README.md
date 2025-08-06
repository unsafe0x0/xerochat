# XeroChat 🚀

A modern, responsive AI chat interface built with Next.js and React. XeroChat provides a sleek ChatGPT-like experience with support for multiple AI models, conversation management, and real-time streaming responses.

![XeroChat Interface](https://img.shields.io/badge/Next.js-15.4.5-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC)

## ✨ Features

### 🎯 Core Features
- **Real-time AI Conversations** - Streaming responses with typing indicators
- **Multiple AI Models** - Support for various models including Llama, GPT-OSS, and more
- **Conversation Management** - Save, load, and delete chat histories
- **Responsive Design** - Mobile-first responsive UI with collapsible sidebar
- **Dark Theme** - Beautiful dark mode interface with neutral color palette

### 🛠️ Advanced Features
- **Markdown Support** - Rich text rendering with syntax highlighting for code blocks
- **Message Actions** - Copy, regenerate, and feedback options for each message
- **Settings Modal** - Secure API key management with local storage
- **Auto-save** - Automatic conversation saving to localStorage
- **Model Switching** - Easy switching between different AI models during conversations

### 🎨 UI/UX Features
- **Clean Interface** - Minimalist design inspired by modern chat applications
- **Perfect Alignment** - Pixel-perfect header and sidebar border alignment
- **Mobile Responsive** - Optimized for desktop, tablet, and mobile devices
- **Accessibility** - Keyboard navigation and screen reader friendly

## 🏗️ Tech Stack

- **Framework**: [Next.js 15.4.5](https://nextjs.org/) with App Router
- **Frontend**: [React 19.1.0](https://reactjs.org/) with TypeScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Markdown**: [React Markdown](https://github.com/remarkjs/react-markdown) with GFM support
- **Syntax Highlighting**: [Highlight.js](https://highlightjs.org/)
- **AI Integration**: [OpenAI SDK](https://github.com/openai/openai-node) with Groq API
- **Runtime**: [Bun](https://bun.sh/) for fast package management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- A Groq API key ([Get one here](https://console.groq.com/))

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
   - Enter your Groq API key
   - Start chatting!

## 🎛️ Available Models

XeroChat supports multiple AI models:

- **GPT-OSS 20B** - OpenAI's open-weight model (20B parameters)
- **GPT-OSS 120B** - OpenAI's powerful model (120B parameters)
- **Llama 4 Scout** - Meta's high-performance instruction model
- **Llama 3.3 70B** - Meta's versatile reasoning model
- **Gemma 2 9B** - Google's efficient language model
- **Mixtral 8x7B** - Mistral's mixture of experts model

## 📁 Project Structure

```
xerochat/
├── app/                          # Next.js App Router
│   ├── api/chat/route.ts        # Chat API endpoint
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/                   # React components
│   ├── ChatInterface.tsx        # Main chat interface
│   ├── Header.tsx               # Top navigation bar
│   ├── Sidebar.tsx              # Chat history sidebar
│   ├── MessageArea.tsx          # Message display area
│   ├── MessageInput.tsx         # Message input form
│   ├── MessageActions.tsx       # Message action buttons
│   ├── MarkdownRenderer.tsx     # Markdown content renderer
│   └── SettingsModal.tsx        # Settings configuration modal
├── data/
│   └── Models.tsx               # Available AI models configuration
└── public/                      # Static assets
```

## 🔧 Configuration

### Environment Variables
No environment variables required! XeroChat uses client-side API key storage for security and convenience.

### Customization
- **Models**: Edit `data/Models.tsx` to add or modify available AI models
- **Styling**: Modify Tailwind classes in components for custom theming
- **API**: Customize the chat API in `app/api/chat/route.ts`

## 🎯 Usage

1. **Start a Conversation**: Click "New Chat" or start typing in the input field
2. **Switch Models**: Use the dropdown in the header to select different AI models
3. **Manage Chats**: View, load, or delete previous conversations from the sidebar
4. **Message Actions**: 
   - Copy message content
   - Regenerate AI responses
   - Provide feedback (thumbs up/down)
5. **Settings**: Configure your API key through the settings modal

## 🔌 API Integration

XeroChat uses the Groq API for AI completions:

```typescript
// Example API call structure
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: conversationHistory,
    model: selectedModel.id,
    accessToken: apiKey,
  }),
});
```

## 🛡️ Security

- **Client-side API Keys**: API keys are stored securely in browser localStorage
- **No Server-side Storage**: No sensitive data is stored on the server
- **HTTPS Required**: API communications use secure HTTPS connections

## 🚀 Build & Deploy

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Groq](https://groq.com/) for providing fast AI inference
- [Lucide](https://lucide.dev/) for the beautiful icon set
- [Vercel](https://vercel.com/) for the deployment platform

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Check existing discussions and issues
- Review the documentation

---

**Built with ❤️ by unsafe0x0**

*XeroChat - Where conversations meet cutting-edge AI technology*
