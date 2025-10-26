# Audio Conversation App

A Granola-style mobile PWA that records audio conversations, transcribes them using OpenAI Whisper, and generates AI-powered summaries using Groq's free LLM API.

## Features

- High-quality audio recording with pause/resume functionality
- Automatic transcription using OpenAI Whisper API
- AI-powered summaries using Groq (Llama 3.3 70B) - **completely free!**
- Conversation history stored locally in the browser
- Mobile-optimized Progressive Web App (PWA)
- Dark mode support
- Works offline after initial load

## Tech Stack

- **Frontend**: Next.js 15 with React 19 and TypeScript
- **Styling**: Tailwind CSS 4
- **Transcription**: OpenAI Whisper API
- **AI Summaries**: Groq API (free tier)
- **Storage**: Browser localStorage
- **Deployment**: Cloudflare Pages (free tier)

## Getting Started

### Prerequisites

1. **Node.js** (v20 or higher)
2. **OpenAI API Key** - Get one at [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
   - Note: Whisper API is very affordable (~$0.006 per minute of audio)
3. **Groq API Key** - Get one at [https://console.groq.com/keys](https://console.groq.com/keys)
   - **100% FREE** with generous rate limits!

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd red-sheep-new
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Edit `.env.local` and add your API keys:
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
GROQ_API_KEY=gsk_your-groq-api-key-here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Click "Start Recording"** to begin capturing audio
2. **Click "Pause"** to temporarily pause recording
3. **Click "Stop & Process"** to finish recording
4. Wait for automatic transcription and AI summary generation
5. View your conversation history in the left sidebar
6. Click any conversation to view its details
7. Click "Delete" to remove a conversation

## Mobile Use

### Adding to Home Screen

**iOS (Safari):**
1. Open the app in Safari
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

**Android (Chrome):**
1. Open the app in Chrome
2. Tap the three-dot menu
3. Tap "Add to Home Screen"
4. Tap "Add"

The app will now work like a native app on your phone!

## Deploying to Cloudflare Pages (Free)

Cloudflare Pages offers a generous free tier that's perfect for this app.

### Option 1: Using Wrangler CLI (Recommended)

1. Install Wrangler globally:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Build the app:
```bash
npm run build
```

4. Deploy to Cloudflare Pages:
```bash
npx wrangler pages deploy .next
```

5. Add your environment variables in the Cloudflare dashboard:
   - Go to your Pages project
   - Navigate to Settings > Environment Variables
   - Add `OPENAI_API_KEY` and `GROQ_API_KEY`

### Option 2: Using Cloudflare Dashboard

1. Build your app:
```bash
npm run build
```

2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Click "Workers & Pages" > "Create Application" > "Pages"
4. Connect your Git repository or upload the `.next` folder
5. Set build command: `npm run build`
6. Set build output directory: `.next`
7. Add environment variables:
   - `OPENAI_API_KEY`
   - `GROQ_API_KEY`
8. Click "Save and Deploy"

Your app will be live at `https://your-project.pages.dev`!

## Cost Breakdown

- **Cloudflare Pages**: FREE (unlimited static requests)
- **Cloudflare Workers**: FREE (100,000 requests/day)
- **Groq API (AI Summaries)**: FREE (very generous rate limits)
- **OpenAI Whisper API**: ~$0.006 per minute of audio
  - Example: 100 minutes of audio = ~$0.60

## Architecture

```
┌─────────────────┐
│   Mobile PWA    │
│   (Next.js)     │
└────────┬────────┘
         │
         ├──────► /api/transcribe ──► OpenAI Whisper API
         │
         └──────► /api/summarize ──► Groq API (Llama 3.3 70B)
```

- Audio recorded in browser using MediaRecorder API
- Transcription via OpenAI Whisper (industry-leading accuracy)
- Summaries via Groq's free Llama 3.3 70B model
- Conversations stored in browser localStorage (no database needed)

## Privacy & Security

- All conversations stored **locally** in your browser
- Audio files sent only to OpenAI and Groq for processing
- No data stored on the server
- No third-party analytics or tracking

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Safari iOS: ✅ Full support
- Firefox: ✅ Full support
- Samsung Internet: ✅ Full support

## Troubleshooting

### Microphone Access Denied
- Make sure you've granted microphone permissions to your browser
- On iOS, check Settings > Safari > Microphone

### API Errors
- Verify your API keys are correct in `.env.local`
- Check that you have credits/quota remaining on OpenAI
- Groq API is free but has rate limits (very generous)

### PWA Not Installing
- Ensure you're using HTTPS (required for PWA)
- Clear browser cache and try again

## Future Enhancements

- [ ] Speaker diarization (identify different speakers)
- [ ] Multiple language support
- [ ] Export conversations as PDF/TXT
- [ ] Cloud sync (optional)
- [ ] Voice activity detection
- [ ] Custom AI summary prompts

## License

MIT

## Contributing

Pull requests welcome! Please feel free to submit issues and enhancement requests.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Transcription by [OpenAI Whisper](https://openai.com/research/whisper)
- AI Summaries by [Groq](https://groq.com)
- Inspired by [Granola](https://www.granola.so)
