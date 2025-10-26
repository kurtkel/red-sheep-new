'use client';

import { useState, useEffect } from 'react';
import AudioRecorder from '@/components/AudioRecorder';

interface Conversation {
  id: string;
  date: string;
  transcription: string;
  summary: string;
}

export default function Home() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentTranscription, setCurrentTranscription] = useState('');
  const [currentSummary, setCurrentSummary] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [error, setError] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('conversations');
    if (stored) {
      try {
        setConversations(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load conversations:', e);
      }
    }
  }, []);

  // Save conversations to localStorage whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      localStorage.setItem('conversations', JSON.stringify(conversations));
    }
  }, [conversations]);

  const handleRecordingComplete = async (audioBlob: Blob) => {
    setIsProcessing(true);
    setError('');
    setCurrentTranscription('');
    setCurrentSummary('');

    try {
      // Step 1: Transcribe the audio
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');

      const transcribeResponse = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!transcribeResponse.ok) {
        const errorData = await transcribeResponse.json();
        throw new Error(errorData.error || 'Transcription failed');
      }

      const { text } = await transcribeResponse.json();
      setCurrentTranscription(text);

      // Step 2: Generate summary
      const summaryResponse = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!summaryResponse.ok) {
        const errorData = await summaryResponse.json();
        throw new Error(errorData.error || 'Summarization failed');
      }

      const { summary } = await summaryResponse.json();
      setCurrentSummary(summary);

      // Step 3: Save to conversation history
      const newConversation: Conversation = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        transcription: text,
        summary: summary,
      };

      setConversations(prev => [newConversation, ...prev]);
      setSelectedConversation(newConversation.id);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Processing error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectConversation = (id: string) => {
    const conversation = conversations.find(c => c.id === id);
    if (conversation) {
      setSelectedConversation(id);
      setCurrentTranscription(conversation.transcription);
      setCurrentSummary(conversation.summary);
      setError('');
    }
  };

  const handleDeleteConversation = (id: string) => {
    setConversations(prev => prev.filter(c => c.id !== id));
    if (selectedConversation === id) {
      setSelectedConversation(null);
      setCurrentTranscription('');
      setCurrentSummary('');
    }
  };

  const handleNewRecording = () => {
    setSelectedConversation(null);
    setCurrentTranscription('');
    setCurrentSummary('');
    setError('');
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Audio Conversation App
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Record conversations, get transcriptions & AI-powered summaries
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Conversation History */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  History
                </h2>
                <button
                  onClick={handleNewRecording}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
                >
                  + New
                </button>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {conversations.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
                    No conversations yet. Start recording!
                  </p>
                ) : (
                  conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedConversation === conversation.id
                          ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500'
                          : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div
                          className="flex-1"
                          onClick={() => handleSelectConversation(conversation.id)}
                        >
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                            {formatDate(conversation.date)}
                          </p>
                          <p className="text-sm text-gray-900 dark:text-white line-clamp-2">
                            {conversation.transcription.substring(0, 100)}...
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteConversation(conversation.id);
                          }}
                          className="ml-2 text-red-500 hover:text-red-700 text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Audio Recorder */}
            <AudioRecorder
              onRecordingComplete={handleRecordingComplete}
              isProcessing={isProcessing}
            />

            {/* Error Display */}
            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded-lg">
                <p className="font-bold">Error</p>
                <p>{error}</p>
              </div>
            )}

            {/* Transcription Display */}
            {currentTranscription && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Transcription
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {currentTranscription}
                  </p>
                </div>
              </div>
            )}

            {/* Summary Display */}
            {currentSummary && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  AI Summary
                  <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-2">
                    (Powered by Groq Llama 3.3 70B)
                  </span>
                </h2>
                <div className="prose dark:prose-invert max-w-none">
                  <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                    {currentSummary}
                  </div>
                </div>
              </div>
            )}

            {/* Welcome Message */}
            {!currentTranscription && !currentSummary && !error && !isProcessing && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Ready to Record
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Click the &quot;Start Recording&quot; button above to begin capturing your conversation.
                </p>
                <div className="text-left max-w-md mx-auto">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-semibold">
                    Features:
                  </p>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>✓ High-quality audio recording</li>
                    <li>✓ Automatic transcription with OpenAI Whisper</li>
                    <li>✓ AI-powered summaries with Groq (free!)</li>
                    <li>✓ Conversation history saved locally</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
