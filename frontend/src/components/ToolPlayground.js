'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';

export default function ToolPlayground({ tool }) {
  const [activeTab, setActiveTab] = useState('sandbox'); // 'sandbox' or 'debug'
  const slug = tool.slug || '';
  const category = tool.category || '';

  // Determine sandbox type based on slug or category
  const getSandboxType = () => {
    // Specific Slugs first
    if (['chatgpt', 'claude', 'gemini', 'poe'].includes(slug)) return 'chat';
    if (slug === 'perplexity') return 'search';
    if (['notion-ai', 'grammarly', 'mem'].includes(slug)) return 'editor';
    if (['otter-ai', 'fireflies-ai'].includes(slug)) return 'transcribe';
    if (['jasper', 'copy-ai', 'anyword', 'textio'].includes(slug)) return 'copywriter';
    if (['synthesia'].includes(slug)) return 'video-avatar';
    if (['runway', 'luma-dream-machine'].includes(slug)) return 'video-gen';
    if (['elevenlabs', 'murf-ai'].includes(slug)) return 'voice-tts';
    if (['beautiful-ai', 'tome', 'canva-magic-studio'].includes(slug)) return 'slides';
    if (slug === 'descript') return 'audio-editor';
    if (['suno', 'udio'].includes(slug)) return 'music-gen';
    if (['github-copilot', 'cursor'].includes(slug)) return 'code-editor';
    if (['pinecone'].includes(slug)) return 'vector-db';
    if (['baseten', 'replicate', 'langchain', 'scale-ai', 'hugging-face'].includes(slug)) return 'dev-api';
    if (['zapier-central', 'make'].includes(slug)) return 'automation';
    if (['datarobot', 'h2o-ai'].includes(slug)) return 'automl';
    if (slug === 'lavender') return 'email-coach';
    if (slug === 'gong') return 'sales-intel';
    if (slug === 'surfer-seo') return 'seo-coach';
    if (['alphasense', 'kensho'].includes(slug)) return 'finance';
    if (['paradox', 'eightfold-ai', 'seekout', 'beamery', 'hirevue'].includes(slug)) return 'hr-talent';

    // Custom unique tools slugs
    if (slug === 'silopulse') return 'silopulse';
    if (slug === 'prophetledger') return 'prophetledger';
    if (slug === 'echoaudit') return 'echoaudit';
    if (slug === 'vibecontract') return 'vibecontract';
    if (slug === 'carbonidle') return 'carbonidle';
    if (slug === 'memescale') return 'memescale';
    if (slug === 'shapeshifter-api') return 'shapeshifter-api';
    if (slug === 'resiliostress') return 'resiliostress';

    // Fallbacks by Category
    if (category === 'Productivity') return 'chat';
    if (category === 'Marketing') return 'copywriter';
    if (category === 'Design') return 'image-gen'; // Default Design to Image Gen
    if (category === 'Development') return 'dev-api';
    if (category === 'Automation') return 'automation';
    if (category === 'Finance') return 'finance';
    if (category === 'HR') return 'hr-talent';

    return 'chat'; // Absolute fallback
  };

  const sandboxType = getSandboxType();

  return (
    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden glow-purple">
      {/* Sandbox Header */}
      <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 absolute"></span>
          <h3 className="font-mono text-sm font-semibold text-gray-200 uppercase tracking-wider ml-1.5">
            {tool.name} Interactive Sandbox
          </h3>
        </div>
        <div className="flex bg-black/40 rounded-lg p-0.5 border border-white/10">
          <button
            onClick={() => setActiveTab('sandbox')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'sandbox'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Playground
          </button>
          <button
            onClick={() => setActiveTab('debug')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'debug'
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Console Logs
          </button>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="p-6 min-h-[380px] bg-slate-950/80 relative">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-20"></div>

        {activeTab === 'sandbox' ? (
          <SandboxContent type={sandboxType} tool={tool} />
        ) : (
          <ConsoleLogs tool={tool} type={sandboxType} />
        )}
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 1. CHAT SIMULATOR (ChatGPT, Claude, Gemini, Poe, Productivity)
// -------------------------------------------------------------
function ChatSandbox({ tool }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: `Hi there! I am your ${tool.name} sandbox assistant. How can I assist you with your business needs today?` }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response based on the tool's brand personality
    setTimeout(() => {
      let aiText = '';
      const promptLower = userMsg.toLowerCase();

      if (tool.slug === 'chatgpt') {
        aiText = `Here is a structured overview of what you requested:\n\n1. **Core Concept**: Analyzing "${userMsg}" requires key frameworks.\n2. **Action Plan**: Draft a roadmap, assign responsibilities, and start testing.\n3. **Recommendation**: Optimize metrics on a weekly sprint cycle.\n\nLet me know if you would like me to write a custom code snippet or draft a formal pitch letter!`;
      } else if (tool.slug === 'claude') {
        aiText = `I understand you are interested in "${userMsg}". Here is a detailed, balanced breakdown to consider:\n\n* **Primary Factors**: We must account for both immediate efficiency and long-term modular architecture.\n* **Nuances**: Many overlook hidden constraints, such as edge-case network latencies.\n* **Suggested Next Step**: Outline your constraints, and I can draft a detailed outline for you.`;
      } else if (tool.slug === 'gemini') {
        aiText = `Google Gemini here! I've processed your prompt about "${userMsg}". Here is a rapid solution:\n\n\`\`\`javascript\n// Fast solution snippet\nconst processTask = async (data) => {\n  console.log("Analyzing data for: " + data);\n  return { status: "Success", timestamp: Date.now() };\n};\n\`\`\`\nThis is multimodal-ready. Let me know if you need to ingest sheets, text documents, or images to cross-analyze.`;
      } else {
        aiText = `Processed request for "${userMsg}" on ${tool.name}. Based on custom knowledge filters, this tool suggests running automated workflows. Let's start with a basic template draft!`;
      }

      setMessages((prev) => [...prev, { role: 'assistant', text: aiText }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-[340px] relative z-10">
      <div className="flex-grow overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-white/10">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-purple-600 text-white rounded-tr-none'
                  : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none whitespace-pre-wrap'
              }`}
            >
              <div className="text-[10px] font-mono opacity-50 mb-1">
                {msg.role === 'user' ? 'YOU' : tool.name.toUpperCase()}
              </div>
              <div>{msg.text}</div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex space-x-1.5 items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Type a message to prompt ${tool.name}...`}
          className="flex-grow bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all"
        >
          Send
        </button>
      </form>
    </div>
  );
}

// -------------------------------------------------------------
// 2. AI WRITER & COPY EDITOR (Notion AI, Grammarly, Mem, Editor)
// -------------------------------------------------------------
function EditorSandbox({ tool }) {
  const [text, setText] = useState(
    "In order to scale the sales department, we need to leverage AI. AI is very helper to do automations, sending email sequences, and getting new lead generations. This makes sales people have more free times to close deals."
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastAction, setLastAction] = useState('');

  const runAssistant = (action) => {
    setIsProcessing(true);
    setLastAction(action);

    setTimeout(() => {
      if (action === 'grammar') {
        setText(
          "To scale the sales department, we need to leverage AI. Artificial intelligence is highly effective for automating workflows, sending email sequences, and generating leads. This allows sales professionals to focus their time on closing deals."
        );
      } else if (action === 'expand') {
        setText(
          text + "\n\nFurthermore, implementing these machine learning frameworks provides real-time predictive lead scoring, allowing representatives to focus strictly on high-intent accounts, resulting in an estimated 35% reduction in customer acquisition costs."
        );
      } else if (action === 'tone') {
        setText(
          "Strategic expansion of the sales department relies heavily on operational automation. By utilizing advanced machine learning pipelines for outreach and prospecting campaigns, sales executives maximize efficiency and accelerate customer acquisitions."
        );
      } else if (action === 'summarize') {
        setText(
          "Summary: Automating sales processes via AI email sequencing and lead generation maximizes reps' bandwidth, shifting their focus toward closing transactions."
        );
      }
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="space-y-4 relative z-10">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => runAssistant('grammar')}
          disabled={isProcessing}
          className="bg-white/5 hover:bg-white/10 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 text-purple-400 hover:text-purple-300 transition-all flex items-center gap-1.5"
        >
          ✨ Fix Grammar
        </button>
        <button
          onClick={() => runAssistant('expand')}
          disabled={isProcessing}
          className="bg-white/5 hover:bg-white/10 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 text-purple-400 hover:text-purple-300 transition-all"
        >
          ✍️ Expand Text
        </button>
        <button
          onClick={() => runAssistant('tone')}
          disabled={isProcessing}
          className="bg-white/5 hover:bg-white/10 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 text-purple-400 hover:text-purple-300 transition-all"
        >
          👔 Professional Tone
        </button>
        <button
          onClick={() => runAssistant('summarize')}
          disabled={isProcessing}
          className="bg-white/5 hover:bg-white/10 text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 text-purple-400 hover:text-purple-300 transition-all"
        >
          📋 Summarize
        </button>
      </div>

      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-[200px] bg-black/50 border border-white/10 rounded-xl p-4 text-sm text-gray-300 font-sans focus:outline-none focus:border-purple-500 leading-relaxed resize-none"
        />
        {isProcessing && (
          <div className="absolute inset-0 bg-slate-950/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <div className="flex items-center gap-2.5 text-sm text-purple-400 font-semibold">
              <span className="w-4 h-4 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></span>
              Running {tool.name} {lastAction === 'grammar' ? 'Grammar Engine' : 'AI Writer'}...
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Characters: {text.length} | Words: {text.split(/\s+/).filter(Boolean).length}</span>
        <button 
          onClick={() => setText("Write your own business copy here to test the AI assistant editing capabilities...")} 
          className="text-purple-400 hover:underline"
        >
          Reset Text
        </button>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. IMAGE GENERATOR (Midjourney, DALL-E, Stable Diffusion, Design)
// -------------------------------------------------------------
function ImageGenSandbox({ tool }) {
  const [prompt, setPrompt] = useState("Vibrant cyberpunk workspace with high tech computer screens and neon violet lighting");
  const [style, setStyle] = useState("Photorealistic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState("https://loremflickr.com/600/400/workspace,cyberpunk");
  const [progress, setProgress] = useState(0);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 250);

    setTimeout(() => {
      const keywords = prompt
        .split(' ')
        .filter(word => word.length > 3)
        .slice(0, 3)
        .join(',');
      const searchUrl = `https://loremflickr.com/600/400/${keywords || 'workspace'},${style.toLowerCase()}?sig=${Math.floor(Math.random() * 1000)}`;
      setImageUrl(searchUrl);
      setIsGenerating(false);
    }, 2800);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      <div className="space-y-4">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-[100px] bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 leading-normal resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Render Style</label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500"
              >
                <option value="Photorealistic">Photorealistic</option>
                <option value="3D Render">3D Render</option>
                <option value="Anime">Anime / Digital</option>
                <option value="Oil Painting">Oil Painting</option>
                <option value="Cyberpunk">Cyberpunk Neon</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-600/20"
              >
                {isGenerating ? 'Rendering...' : 'Generate Art'}
              </button>
            </div>
          </div>
        </form>

        <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 text-xs text-gray-400 font-mono space-y-1.5">
          <div className="text-purple-400">Settings Used:</div>
          <div>• Aspect Ratio: 16:9</div>
          <div>• Engine: {tool.name} Engine v4.0</div>
          <div>• Prompt Weights: [style: 1.2, fidelity: 1.5]</div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full aspect-[3/2] bg-black/40 border border-white/10 rounded-2xl overflow-hidden relative flex items-center justify-center shadow-inner">
          {isGenerating ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-slate-950/90 backdrop-blur-sm z-20">
              <div className="w-12 h-12 rounded-full border-4 border-purple-500 border-t-transparent animate-spin mb-4"></div>
              <div className="text-sm font-semibold text-white mb-2">Generating Image</div>
              <div className="w-48 bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="text-[10px] font-mono text-purple-400 mt-2">{progress}% Completed</div>
            </div>
          ) : null}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt="AI Sandbox Generated Artwork"
            className="w-full h-full object-cover select-none"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop";
            }}
          />
        </div>
        <div className="text-center text-[10px] font-mono text-gray-500 mt-2">
          Image generated in real-time based on Unsplash/Flickr search tags.
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. VOICE SPEECH SYNTHESIZER (ElevenLabs, Murf.ai)
// -------------------------------------------------------------
function VoiceTtsSandbox({ tool }) {
  const [text, setText] = useState("Welcome to ElevenLabs Voice Studio. Type any text here, and press speak to hear me voice it live!");
  const [voice, setVoice] = useState('Google US English');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechRef = useRef(null);

  const [voiceOptions, setVoiceOptions] = useState([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const getVoices = () => {
        const list = window.speechSynthesis.getVoices();
        if (list.length > 0) {
          setVoiceOptions(list.slice(0, 8));
        }
      };
      getVoices();
      window.speechSynthesis.onvoiceschanged = getVoices;
    }
  }, []);

  const handleSpeak = (e) => {
    e.preventDefault();
    if (!text.trim() || typeof window === 'undefined') return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (voiceOptions.length > 0) {
      const selected = voiceOptions.find(v => v.name === voice) || voiceOptions[0];
      utterance.voice = selected;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    if (typeof window !== 'undefined') {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="space-y-4 relative z-10">
      <form onSubmit={handleSpeak} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Text script</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-[120px] bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 leading-normal resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-grow bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm py-3 rounded-xl transition-all flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-600/20"
            >
              🔊 Synthesize Speech
            </button>
            {isSpeaking && (
              <button
                type="button"
                onClick={handleStop}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold text-sm px-5 rounded-xl border border-red-500/30 transition-all"
              >
                Stop
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Select Voice Profile</label>
            <select
              value={voice}
              onChange={(e) => setVoice(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500"
            >
              {voiceOptions.length > 0 ? (
                voiceOptions.map((v, i) => (
                  <option key={i} value={v.name}>{v.name} ({v.lang})</option>
                ))
              ) : (
                <>
                  <option>Adam (Deep Pitch Male)</option>
                  <option>Rachel (Warm Female)</option>
                  <option>Nate (Narrator)</option>
                </>
              )}
            </select>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col justify-center items-center h-[120px]">
            {isSpeaking ? (
              <div className="flex items-end gap-1 h-12 w-full justify-center">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="waveform-bar bg-purple-500 w-1.5 h-12 rounded-full"></div>
                ))}
              </div>
            ) : (
              <div className="text-center text-xs text-gray-500 font-mono">
                🎙️ Audio Idle.<br />Press Speak to output voice.
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

// -------------------------------------------------------------
// 5. MUSIC SOUND GENERATOR (Suno, Udio)
// -------------------------------------------------------------
function MusicGenSandbox({ tool }) {
  const [prompt, setPrompt] = useState("Upbeat 80s synthwave beat with heavy drums and retro keyboards");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompiling, setIsCompiling] = useState(false);
  const audioCtxRef = useRef(null);
  const oscillatorInterval = useRef(null);

  const startSynthSound = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      let step = 0;
      const notes = [220, 261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 523.25];
      
      oscillatorInterval.current = setInterval(() => {
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);

        const currentNote = notes[step % notes.length];
        osc.frequency.setValueAtTime(currentNote, ctx.currentTime);
        osc.type = 'sawtooth';

        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

        osc.start();
        osc.stop(ctx.currentTime + 0.4);
        
        step += 1;
      }, 300);

    } catch (e) {
      console.error(e);
    }
  };

  const stopSynthSound = () => {
    if (oscillatorInterval.current) {
      clearInterval(oscillatorInterval.current);
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  const handleGenerateSong = (e) => {
    e.preventDefault();
    if (isPlaying) {
      stopSynthSound();
      setIsPlaying(false);
      setProgress(0);
      return;
    }

    setIsCompiling(true);
    setTimeout(() => {
      setIsCompiling(false);
      setIsPlaying(true);
      startSynthSound();

      const songInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(songInterval);
            stopSynthSound();
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      stopSynthSound();
    };
  }, []);

  return (
    <div className="space-y-4 relative z-10">
      <form onSubmit={handleGenerateSong} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Song Prompt / Music Style</label>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            disabled={isCompiling}
            className={`w-full font-semibold text-sm py-3 rounded-xl transition-all ${
              isPlaying
                ? 'bg-red-600 hover:bg-red-500 text-white'
                : 'bg-purple-600 hover:bg-purple-500 text-white hover:shadow-lg hover:shadow-purple-600/20'
            }`}
          >
            {isCompiling ? 'Synthesizing MIDI tracks...' : isPlaying ? '⏹️ Stop Song' : '🎵 Generate & Play Track'}
          </button>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-xl p-6 flex flex-col justify-between min-h-[160px]">
          {isCompiling ? (
            <div className="flex flex-col items-center justify-center h-full gap-2">
              <span className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></span>
              <span className="text-xs text-purple-400 font-mono">Applying diffusion patterns...</span>
            </div>
          ) : isPlaying ? (
            <div className="space-y-4 w-full h-full flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-purple-400">Playing: {prompt.substring(0, 25)}...</span>
                <span className="text-xs font-mono text-gray-500">Track: Suno_AI_synth.wav</span>
              </div>

              <div className="flex items-end gap-1.5 h-16 w-full justify-center">
                {[...Array(16)].map((_, i) => {
                  const delay = `${(i * 30) % 500}ms`;
                  const height = `${((i * 7) % 40) + 10}px`;
                  return (
                    <div
                      key={i}
                      className="bg-purple-500 w-2 rounded-full transition-all duration-150 animate-pulse"
                      style={{ animationDelay: delay, height: isPlaying ? height : '4px' }}
                    ></div>
                  );
                })}
              </div>

              <div className="w-full bg-white/15 h-1 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 text-xs leading-relaxed font-mono">
              🥁 Suno Sound Synthesizer Ready.<br />
              Generated tracks are compiled client-side using standard oscillator wave frequencies.
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

// -------------------------------------------------------------
// 6. VIDEO GENERATOR (Runway, Luma Dream Machine)
// -------------------------------------------------------------
function VideoGenSandbox({ tool }) {
  const [prompt, setPrompt] = useState("Cinematic slow motion shot of water waves hitting volcanic black sand at sunset");
  const [isRendering, setIsRendering] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const startRender = (e) => {
    e.preventDefault();
    setIsRendering(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 400);

    setTimeout(() => {
      setIsRendering(false);
      setIsPlaying(true);
    }, 2200);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
      <div className="space-y-4">
        <form onSubmit={startRender} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Video Scene Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-[120px] bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 leading-normal resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isRendering}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm py-3 rounded-xl transition-all"
          >
            {isRendering ? 'Rendering Scene...' : 'Render AI Video Clip'}
          </button>
        </form>

        <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-xs text-gray-400 font-mono space-y-1.5">
          <div className="text-purple-400">Render Pipeline:</div>
          <div>• Camera: Tracking In (Simulated)</div>
          <div>• Framerate: 24 FPS (Diffusion)</div>
          <div>• Resolution: 1080p Gen-3 Engine</div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full aspect-[16/9] bg-black border border-white/10 rounded-2xl overflow-hidden relative flex items-center justify-center">
          {isRendering && (
            <div className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center p-6 z-20">
              <span className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mb-3"></span>
              <span className="text-xs text-white mb-2">Simulating Scene Diffusion</span>
              <div className="w-40 bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {isPlaying ? (
            <div className="w-full h-full relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 via-pink-900 to-indigo-900 animate-pulse duration-1000"></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center p-4">
                <span className="text-4xl animate-bounce">🌊</span>
                <span className="text-sm font-semibold text-white mt-3 font-mono">Render Preview</span>
                <span className="text-xs text-gray-300 font-mono opacity-80 mt-1">Simulating movement for prompt: &quot;{prompt.substring(0, 30)}...&quot;</span>
              </div>

              <div className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-purple-400">
                LIVE DEMO PLAYING
              </div>
            </div>
          ) : (
            <div className="text-center p-6 text-gray-500 text-xs font-mono">
              🎬 Video Generator Ready.<br />
              Type a prompt and render to see the output.
            </div>
          )}
        </div>
        <div className="text-center text-[10px] font-mono text-gray-500 mt-2">
          Video canvas loop simulated to match user prompt.
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. CODE EDITOR (GitHub Copilot, Cursor)
// -------------------------------------------------------------
function CodeSandbox({ tool }) {
  const [code, setCode] = useState(
    `// Prompt the AI by typing a comment below\n// Write a function to calculate product discount\n`
  );
  const [inputVal, setInputVal] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const handleAutocomplete = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setIsThinking(true);
    setTimeout(() => {
      let autocompleteCode = '';
      const lower = inputVal.toLowerCase();

      if (lower.includes('discount') || lower.includes('price')) {
        autocompleteCode = `\nfunction calculateDiscount(price, rate) {\n  if (price < 0 || rate < 0 || rate > 1) {\n    throw new Error("Invalid parameters");\n  }\n  const discountAmount = price * rate;\n  return {\n    originalPrice: price,\n    discountAmount: discountAmount,\n    finalPrice: price - discountAmount\n  };\n}\n\n// Usage:\n// console.log(calculateDiscount(100, 0.20)); // yields finalPrice: 80`;
      } else if (lower.includes('fetch') || lower.includes('api')) {
        autocompleteCode = `\nasync function fetchTools(apiUrl) {\n  try {\n    const response = await fetch(apiUrl);\n    if (!response.ok) throw new Error("Network error");\n    const data = await response.json();\n    return data.filter(item => item.isActive);\n  } catch (error) {\n    console.error("Fetch failed: ", error);\n    return [];\n  }\n}`;
      } else {
        autocompleteCode = `\n// AI suggested autocomplete for: ${inputVal}\nconst handleCustomTask = (params) => {\n  const result = Array.from(params).map(item => item.id);\n  return {\n    success: true,\n    processedCount: result.length,\n    results: result\n  };\n};`;
      }

      setCode((prev) => prev + `\n// Prompt: ${inputVal}` + autocompleteCode);
      setInputVal('');
      setIsThinking(false);
    }, 850);
  };

  return (
    <div className="space-y-4 relative z-10">
      <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden font-mono text-sm leading-relaxed">
        <div className="bg-black/50 px-4 py-2 border-b border-white/5 flex justify-between items-center">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
          </div>
          <span className="text-[10px] text-gray-500">sandbox_workspace.js — {tool.name}</span>
        </div>

        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[220px] bg-slate-950/80 p-4 text-emerald-400 focus:outline-none focus:ring-0 leading-normal resize-none font-mono text-xs"
            spellCheck="false"
          />
          {isThinking && (
            <div className="absolute bottom-4 right-4 bg-purple-900/80 px-3 py-1.5 rounded-lg border border-purple-500/40 text-xs text-white flex items-center gap-1.5 backdrop-blur-sm">
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {tool.name} generating code snippet...
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleAutocomplete} className="flex gap-2">
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ask AI Copilot to code... (e.g. 'Write a discount calculation function')"
          className="flex-grow bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          disabled={isThinking}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-6 rounded-xl transition-all"
        >
          Autocomplete
        </button>
      </form>
    </div>
  );
}

// -------------------------------------------------------------
// 8. SEMANTIC SEARCH (Perplexity)
// -------------------------------------------------------------
function PerplexitySandbox({ tool }) {
  const [query, setQuery] = useState("Who founded Google and when?");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setResult({
        answer: `Google was founded in **September 1998** [1] by American computer scientists **Larry Page** and **Sergey Brin** [2] while they were PhD students at Stanford University in California [3]. Originally incorporated as a privately held company, it went public via an IPO in August 2004 [4].`,
        citations: [
          { id: 1, title: "History of Google - Wikipedia", url: "https://wikipedia.org" },
          { id: 2, title: "Sergey Brin & Larry Page Profile - Forbes", url: "https://forbes.com" },
          { id: 3, title: "Stanford University Archives - Google Origin Story", url: "https://stanford.edu" },
          { id: 4, title: "Google Investor Relations IPO Records 2004", url: "https://abc.xyz" }
        ]
      });
      setIsSearching(false);
    }, 1100);
  };

  return (
    <div className="space-y-5 relative z-10">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a question..."
          className="flex-grow bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-6 rounded-xl transition-all"
        >
          Search
        </button>
      </form>

      {isSearching ? (
        <div className="flex flex-col gap-2.5 py-6 items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
          <span className="text-xs text-purple-400 font-mono">Querying live web indexes...</span>
        </div>
      ) : result ? (
        <div className="space-y-4 bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wide">Answer Summary</h4>
            <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{result.answer}</p>
          </div>

          <div className="border-t border-white/5 pt-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Cited Sources</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.citations.map((cite) => (
                <a
                  key={cite.id}
                  href={cite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 bg-black/40 rounded-lg hover:bg-black/60 transition-all border border-white/5"
                >
                  <span className="bg-purple-500/10 text-purple-400 w-5 h-5 rounded flex items-center justify-center text-xs font-bold border border-purple-500/20">
                    {cite.id}
                  </span>
                  <span className="text-xs text-gray-300 truncate hover:text-white">{cite.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 text-xs font-mono">
          🔍 Conversational Web Search Ready.<br />
          Ask anything to see cited structural summaries.
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 9. AUTOMATION FLOW BUILDER (Zapier, Make)
// -------------------------------------------------------------
function AutomationSandbox({ tool }) {
  const [trigger, setTrigger] = useState('New Stripe Lead');
  const [action, setAction] = useState('Send Slack Notification');
  const [isRunning, setIsRunning] = useState(false);
  const [flowHistory, setFlowHistory] = useState([]);

  const handleRunFlow = () => {
    setIsRunning(true);
    setFlowHistory(prev => [`[${new Date().toLocaleTimeString()}] Intializing Flow Engine...`, ...prev]);

    setTimeout(() => {
      setFlowHistory(prev => [`[${new Date().toLocaleTimeString()}] Trigger caught: "${trigger}"`, ...prev]);
    }, 600);

    setTimeout(() => {
      setFlowHistory(prev => [`[${new Date().toLocaleTimeString()}] Action dispatched: "${action}" successfully.`, ...prev]);
      setIsRunning(false);
    }, 1800);
  };

  return (
    <div className="space-y-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center h-28 relative overflow-hidden">
          <span className="text-xs text-purple-400 font-mono uppercase tracking-wider mb-2">1. Trigger</span>
          <select
            value={trigger}
            onChange={(e) => setTrigger(e.target.value)}
            className="bg-slate-900 border border-white/10 text-white text-xs rounded p-1.5 focus:outline-none"
          >
            <option value="New Stripe Lead">New Stripe Lead</option>
            <option value="Gmail Starred Email">Gmail Starred Email</option>
            <option value="HubSpot Updated Contact">HubSpot Updated Contact</option>
          </select>
        </div>

        <div className="flex justify-center items-center h-8 md:h-28">
          <svg className="w-12 h-12 md:w-full md:h-12" viewBox="0 0 100 20" fill="none">
            <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="3" />
            {isRunning && (
              <line
                x1="0"
                y1="10"
                x2="100"
                y2="10"
                stroke="#a855f7"
                strokeWidth="3"
                className="animated-dash-line"
              />
            )}
          </svg>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center h-28">
          <span className="text-xs text-purple-400 font-mono uppercase tracking-wider mb-2">2. Action</span>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="bg-slate-900 border border-white/10 text-white text-xs rounded p-1.5 focus:outline-none"
          >
            <option value="Send Slack Notification">Send Slack Notification</option>
            <option value="Add Row in Google Sheets">Add Row in Google Sheets</option>
            <option value="Draft AI Email Copy">Draft AI Email Copy</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleRunFlow}
          disabled={isRunning}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all"
        >
          {isRunning ? 'Running Zap Flow...' : 'Test Automation Flow'}
        </button>
        <button
          onClick={() => setFlowHistory([])}
          className="text-xs text-gray-500 hover:text-white transition-all underline self-center"
        >
          Clear History
        </button>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-xl p-4">
        <h4 className="text-xs font-mono text-gray-400 mb-2 uppercase">Execution Log Trace</h4>
        <div className="h-[90px] overflow-y-auto font-mono text-[11px] text-gray-300 space-y-1">
          {flowHistory.length > 0 ? (
            flowHistory.map((h, idx) => <div key={idx}>{h}</div>)
          ) : (
            <div className="text-gray-500">Flow trace is empty. Click Test to execute workflow.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 10. DEVELOPER CONSOLE API (Pinecone, Hugging Face, Baseten, etc.)
// -------------------------------------------------------------
function DevApiSandbox({ tool }) {
  const [model, setModel] = useState('llama-3-70b');
  const [payload, setPayload] = useState(`{\n  "prompt": "Optimize this system backend loop",\n  "temperature": 0.2\n}`);
  const [logs, setLogs] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const runRequest = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLogs(`curl -X POST https://api.replicate.com/v1/predictions \\\n  -H "Authorization: Token *****" \\\n  -d '${payload.replace(/\n/g, '')}'\n\n[INFO] Sending API payload...`);

    setTimeout(() => {
      setLogs((prev) => prev + `\n[INFO] Received chunk response, status: 200 OK\n[DEBUG] Latency: 320ms\n[RESPONSE]\n{\n  "id": "pred_${Math.random().toString(36).substring(7)}",\n  "status": "succeeded",\n  "output": [\n    "Optimize backend structures by using key-value cache indexing strategies."\n  ]\n}`);
      setIsLoading(false);
    }, 1200);
  };

  return (
    <form onSubmit={runRequest} className="space-y-4 relative z-10 font-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3 font-sans">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Model Endpoint</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500 font-mono"
            >
              <option value="llama-3-70b font-mono">meta/llama-3-70b-instruct</option>
              <option value="stable-diffusion-xl font-mono">stability-ai/sdxl</option>
              <option value="whisper-large font-mono">openai/whisper-large-v3</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Request JSON Body</label>
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="w-full h-[120px] bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-mono resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
          >
            {isLoading ? 'Triggering Endpoint...' : 'Execute API Call'}
          </button>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col justify-between h-[230px]">
          <div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
              <span className="text-[10px] font-mono text-gray-400">cURL Output Console</span>
              <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-1.5 py-0.5 rounded font-mono">active</span>
            </div>
            <pre className="text-[11px] font-mono text-emerald-400 whitespace-pre-wrap overflow-y-auto max-h-[160px] scrollbar-none">
              {logs || 'Ready to run request... output console logs will display here.'}
            </pre>
          </div>
        </div>
      </div>
    </form>
  );
}

// -------------------------------------------------------------
// 11. FINANCE TRENDS & INSIGHTS (AlphaSense, Kensho)
// -------------------------------------------------------------
function FinanceSandbox({ tool }) {
  const [ticker, setTicker] = useState('AAPL');
  const [insights, setInsights] = useState({
    price: '189.43',
    change: '+1.45%',
    direction: 'up',
    summary: 'Market intelligence scanning for ticker AAPL suggests positive Q3 growth expectations. AI models flag key keywords in earning calls: "Advanced automation, Cloud margin optimization, silicon chips".',
    sentiments: { bullish: 78, neutral: 12, bearish: 10 }
  });

  const queryFinance = (e) => {
    e.preventDefault();
    if (!ticker.trim()) return;

    setInsights({
      price: ticker.toUpperCase() === 'AAPL' ? '189.43' : ticker.toUpperCase() === 'TSLA' ? '177.46' : '345.12',
      change: ticker.toUpperCase() === 'AAPL' ? '+1.45%' : ticker.toUpperCase() === 'TSLA' ? '-2.80%' : '+0.5%',
      direction: ticker.toUpperCase() === 'AAPL' ? 'up' : ticker.toUpperCase() === 'TSLA' ? 'down' : 'up',
      summary: `Market intelligence scanning for ticker ${ticker.toUpperCase()} suggests positive Q3 growth expectations. AI models flag key keywords in earning calls: "Advanced automation, Cloud margin optimization, silicon chips".`,
      sentiments: { bullish: 78, neutral: 12, bearish: 10 }
    });
  };

  return (
    <div className="space-y-4 relative z-10">
      <form onSubmit={queryFinance} className="flex gap-2">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Stock Ticker (e.g. AAPL, TSLA, MSFT)..."
          className="flex-grow bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-6 rounded-xl transition-all"
        >
          Scan Ticker
        </button>
      </form>

      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/60 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="text-xs font-mono text-gray-400 block uppercase">Stock Value</span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">${insights.price}</span>
              <span className={`text-sm font-semibold ${insights.direction === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {insights.change}
              </span>
            </div>
            <div className="text-[10px] text-gray-500 font-mono">Q3 Real-time index feed</div>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-xl p-4 space-y-2">
            <span className="text-xs font-mono text-gray-400 block uppercase">AI Market Sentiment</span>
            <div className="h-4 w-full bg-white/10 rounded-full overflow-hidden flex mt-2">
              <div className="bg-green-500 h-full" style={{ width: `${insights.sentiments.bullish}%` }}></div>
              <div className="bg-gray-500 h-full" style={{ width: `${insights.sentiments.neutral}%` }}></div>
              <div className="bg-red-500 h-full" style={{ width: `${insights.sentiments.bearish}%` }}></div>
            </div>
            <div className="flex justify-between text-[9px] font-mono text-gray-400">
              <span className="text-green-400">Bullish ({insights.sentiments.bullish}%)</span>
              <span className="text-red-400">Bearish ({insights.sentiments.bearish}%)</span>
            </div>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-xl p-4 md:col-span-3">
            <span className="text-xs font-mono text-gray-400 block uppercase mb-1">Company Insights Summary</span>
            <p className="text-xs text-gray-300 leading-relaxed font-sans">{insights.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 12. HR & TALENT MANAGEMENT (Paradox, Eightfold, SeekOut, HireVue)
// -------------------------------------------------------------
function HrSandbox({ tool }) {
  const [candidate, setCandidate] = useState(
    "Senior Frontend Developer with 6 years experience specializing in React, Next.js, and TailwindCSS. Certified in cloud solution architectures (AWS) with strong background leading team sprints."
  );
  const [result, setResult] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  const parseCandidate = (e) => {
    e.preventDefault();
    if (!candidate.trim()) return;

    setIsParsing(true);
    setTimeout(() => {
      setResult({
        fitScore: 94,
        keywordsMatched: ['React', 'Next.js', 'AWS', 'Sprint Leadership'],
        questions: [
          "Describe how you optimized Next.js bundle sizes or loading metrics in past client applications.",
          "How do you resolve architectural disputes when leading sprints?"
        ]
      });
      setIsParsing(false);
    }, 1100);
  };

  return (
    <div className="space-y-4 relative z-10">
      <form onSubmit={parseCandidate} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Paste Resume Summary or Candidate Profile</label>
          <textarea
            value={candidate}
            onChange={(e) => setCandidate(e.target.value)}
            className="w-full h-[100px] bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 leading-normal resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isParsing}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all"
        >
          {isParsing ? 'Evaluating Candidate Profiles...' : 'Evaluate Profiles with AI'}
        </button>
      </form>

      {isParsing ? (
        <div className="flex flex-col gap-2.5 py-6 items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
          <span className="text-xs text-purple-400 font-mono">Parsing semantic resume nodes...</span>
        </div>
      ) : result ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">Job Alignment Match</span>
            <span className="text-4xl font-extrabold text-green-400">{result.fitScore}%</span>
            <span className="text-[9px] text-gray-500 mt-1">Excellent Candidate match</span>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-xl p-4 md:col-span-2 space-y-2">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">Identified Core Skills</span>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {result.keywordsMatched.map((kw, i) => (
                <span key={i} className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-md font-mono">
                  {kw}
                </span>
              ))}
            </div>
            <div className="text-[10px] text-gray-500">Matches current backend developer description</div>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-xl p-4 md:col-span-3">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-1">Recommended Interview Prompts</span>
            <ul className="list-disc pl-4 space-y-1">
              {result.questions.map((q, i) => (
                <li key={i} className="text-xs text-gray-300 leading-normal">{q}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500 text-xs font-mono">
          💼 HR AI Candidate Evaluator Ready.<br />
          Submit a CV profile to compute matches.
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// 13. ADDITIONAL SANDBOX WIDGETS
// -------------------------------------------------------------
function VideoAvatarSandbox({ tool }) {
  const [script, setScript] = useState("Hello! I am your AI presenter created dynamically inside Synthesia. Let's record high quality videos.");
  const [avatar, setAvatar] = useState('Alex - Tech Lead');
  const [isPlaying, setIsPlaying] = useState(false);

  const runPresenter = (e) => {
    e.preventDefault();
    if (isPlaying || typeof window === 'undefined') return;

    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(script);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 font-sans">
      <form onSubmit={runPresenter} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Select Avatar Model</label>
          <select
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-purple-500 font-mono"
          >
            <option>Alex - Tech Lead</option>
            <option>Sophia - HR Manager</option>
            <option>Marcus - Sales Coach</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Spoken Script</label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            className="w-full h-[100px] bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 leading-normal resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm py-2.5 rounded-xl transition-all"
        >
          {isPlaying ? 'Speaking Script...' : 'Render Presenter Speech'}
        </button>
      </form>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full aspect-[16/9] bg-black border border-white/10 rounded-2xl overflow-hidden relative flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center">
            <span className="text-5xl animate-bounce">👤</span>
            <span className="text-sm font-semibold text-white mt-2 font-mono">{avatar}</span>
            {isPlaying ? (
              <span className="text-xs text-purple-400 animate-pulse mt-1 font-mono">🔊 Presenter speaking script...</span>
            ) : (
              <span className="text-xs text-gray-500 mt-1 font-mono">Presenter Idle. Press render.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlidesSandbox({ tool }) {
  const [topic, setTopic] = useState("Marketing strategy for launching a fitness app");
  const [isBuilding, setIsBuilding] = useState(false);
  const [slides, setSlides] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleBuildDeck = (e) => {
    e.preventDefault();
    setIsBuilding(true);

    setTimeout(() => {
      setSlides([
        {
          title: "Introduction & Target Audience",
          bullets: ["Launch fitness application targeted to Busy Professionals", "Focus on 15-minute quick routines", "Pricing model: Subscription based"]
        },
        {
          title: "Marketing Strategy Channels",
          bullets: ["Social Media influencer marketing", "Search engine optimization on fitness terms", "Interactive gamification referral models"]
        },
        {
          title: "Success Milestones",
          bullets: ["Month 1: 5k organic accounts", "Month 3: Implement paid ads sequences", "Month 6: Reach 100k downloads milestone"]
        }
      ]);
      setActiveSlide(0);
      setIsBuilding(false);
    }, 1500);
  };

  return (
    <div className="space-y-4 relative z-10 font-sans">
      <form onSubmit={handleBuildDeck} className="flex gap-2">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a slides topic (e.g. Pitch deck for startup)..."
          className="flex-grow bg-black/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-6 rounded-xl transition-all"
        >
          {isBuilding ? 'Drafting Slides...' : 'Build Deck'}
        </button>
      </form>

      {isBuilding ? (
        <div className="flex flex-col gap-2.5 py-12 items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin"></div>
          <span className="text-xs text-purple-400 font-mono">Positioning slide elements...</span>
        </div>
      ) : slides ? (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6 min-h-[160px] flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-white mb-3">{slides[activeSlide].title}</h4>
              <ul className="list-disc pl-5 space-y-2">
                {slides[activeSlide].bullets.map((b, idx) => (
                  <li key={idx} className="text-xs text-gray-300 leading-normal">{b}</li>
                ))}
              </ul>
            </div>
            <div className="text-[10px] text-gray-500 font-mono text-right mt-4">
              Slide {activeSlide + 1} of {slides.length}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveSlide(prev => Math.max(0, prev - 1))}
              disabled={activeSlide === 0}
              className="text-xs font-semibold px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none"
            >
              Previous Slide
            </button>
            <button
              onClick={() => setActiveSlide(prev => Math.min(slides.length - 1, prev + 1))}
              disabled={activeSlide === slides.length - 1}
              className="text-xs font-semibold px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none"
            >
              Next Slide
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 text-xs font-mono">
          📊 Slide Presentation Creator Ready.<br />
          Type a topic and create a slide deck.
        </div>
      )}
    </div>
  );
}

function TranscribeSandbox({ tool }) {
  const [recording, setRecording] = useState(false);
  const [transcripts, setTranscripts] = useState([]);

  const toggleRecording = () => {
    if (recording) {
      setRecording(false);
      return;
    }

    setRecording(true);
    setTranscripts([]);

    const dialogues = [
      "Speaker A (John): Hi team, let's look at the quarterly product goals.",
      "Speaker B (Alice): Yes, the database performance requires attention first.",
      "Speaker A (John): Good point. Let's schedule the migration task for Friday night.",
      "Speaker C (Dev Lead): I will make sure backups are fully verified by then."
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step >= dialogues.length) {
        clearInterval(interval);
        setRecording(false);
        return;
      }
      setTranscripts(prev => [...prev, dialogues[step]]);
      step += 1;
    }, 1500);
  };

  return (
    <div className="space-y-4 relative z-10 font-sans">
      <div className="flex gap-4 items-center">
        <button
          onClick={toggleRecording}
          className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            recording
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-purple-600 hover:bg-purple-500 text-white'
          }`}
        >
          {recording ? '⏹️ Stop Live Transcription' : '🎙️ Record Meeting Speech'}
        </button>
        <span className="text-xs text-gray-500 font-mono">
          {recording ? 'Recording audio streams...' : 'Idle'}
        </span>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-xl p-4 min-h-[160px]">
        <h4 className="text-xs font-mono text-gray-400 mb-2 uppercase">Real-Time Transcription Outputs</h4>
        <div className="space-y-2 h-[120px] overflow-y-auto">
          {transcripts.length > 0 ? (
            transcripts.map((t, idx) => (
              <div key={idx} className="text-xs text-gray-200 font-sans border-l-2 border-purple-500 pl-2 leading-relaxed">
                {t}
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500 font-mono text-center pt-8">
              Click record to simulate active dialogue transcription.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AudioEditorSandbox({ tool }) {
  const [transcript, setTranscript] = useState(
    "So, uh, we need to launch the client portal, like, by next Monday. Um, everything is mostly done, like, except client billing tests."
  );
  const [zapping, setZapping] = useState(false);

  const handleZap = () => {
    setZapping(true);
    setTimeout(() => {
      const cleaned = transcript
        .replace(/,\s*uh,?/gi, '')
        .replace(/,\s*like,?/gi, '')
        .replace(/,\s*um,?/gi, '')
        .replace(/\buh\b/gi, '')
        .replace(/\blike\b/gi, '')
        .replace(/\bum\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
      setTranscript(cleaned);
      setZapping(false);
    }, 1000);
  };

  return (
    <div className="space-y-4 relative z-10 font-sans">
      <div>
        <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Edit transcript to modify audio timeline</label>
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="w-full h-[120px] bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 leading-normal resize-none"
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleZap}
          disabled={zapping}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all"
        >
          {zapping ? 'Removing filler words...' : '⚡ Zap Filler Words (uh, like, um)'}
        </button>
      </div>

      <div className="text-xs text-gray-500 leading-relaxed font-mono">
        Descript lets you edit audio recordings by simply editing the transcribed text sentences.
      </div>
    </div>
  );
}

function VectorDbSandbox({ tool }) {
  const [queryVector, setQueryVector] = useState('[0.12, 0.45, 0.89, -0.23]');
  const [isQuerying, setIsQuerying] = useState(false);
  const [results, setResults] = useState(null);

  const handleQuery = (e) => {
    e.preventDefault();
    setIsQuerying(true);

    setTimeout(() => {
      setResults([
        { id: 'doc_4589', score: 0.94, text: 'Product pricing calculation details' },
        { id: 'doc_2311', score: 0.88, text: 'Client billing and subscription code paths' },
        { id: 'doc_0987', score: 0.74, text: 'Stripe webhook routing definitions' }
      ]);
      setIsQuerying(false);
    }, 900);
  };

  return (
    <div className="space-y-4 relative z-10 font-mono text-xs">
      <form onSubmit={handleQuery} className="space-y-4 font-sans">
        <div>
          <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1.5">Query Input Embedding Vector</label>
          <input
            type="text"
            value={queryVector}
            onChange={(e) => setQueryVector(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 font-mono"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 rounded-xl transition-all"
        >
          Query Nearest Neighbors
        </button>
      </form>

      {isQuerying ? (
        <div className="text-center py-6 text-purple-400">Index lookup in progress...</div>
      ) : results ? (
        <div className="bg-black/60 border border-white/10 rounded-xl p-4 space-y-3">
          <div className="text-[10px] text-gray-400 uppercase">Vector Similarity Match results</div>
          <div className="space-y-2">
            {results.map((res, i) => (
              <div key={i} className="flex justify-between items-center p-2 bg-slate-900 rounded border border-white/5 font-mono">
                <div>
                  <span className="text-purple-400 font-bold">{res.id}</span>
                  <span className="text-gray-400 ml-2">&quot;{res.text}&quot;</span>
                </div>
                <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded text-[10px] border border-emerald-500/20">
                  score: {res.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">Vector database ready. Input query embeddings.</div>
      )}
    </div>
  );
}

function AutoMLSandbox({ tool }) {
  const [epochs, setEpochs] = useState(10);
  const [isTraining, setIsTraining] = useState(false);
  const [metricData, setMetricData] = useState(null);

  const runTraining = () => {
    setIsTraining(true);
    setMetricData([]);
    
    let current = 0;
    const interval = setInterval(() => {
      if (current >= epochs) {
        clearInterval(interval);
        setIsTraining(false);
        return;
      }
      
      const accuracy = 0.5 + (0.4 * (current / epochs)) + (Math.random() * 0.05);
      setMetricData(prev => [...prev, { epoch: current + 1, acc: accuracy }]);
      current += 1;
    }, 250);
  };

  return (
    <div className="space-y-4 relative z-10 font-sans">
      <div className="flex gap-4 items-center">
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1.5">Max Epochs</label>
          <input
            type="number"
            value={epochs}
            onChange={(e) => setEpochs(parseInt(e.target.value) || 10)}
            className="w-20 bg-black/50 border border-white/10 rounded px-2.5 py-1 text-xs text-white"
          />
        </div>
        <button
          onClick={runTraining}
          disabled={isTraining}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-sm px-5 py-2 rounded-xl transition-all self-end"
        >
          {isTraining ? 'Optimizing Features...' : 'Run Auto ML Train'}
        </button>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-xl p-4 min-h-[160px] flex flex-col justify-between">
        <h4 className="text-xs font-mono text-gray-400 mb-2 uppercase">Training Accuracy Curve</h4>
        <div className="flex items-end h-24 gap-2 justify-center">
          {metricData && metricData.map((data, i) => {
            const heightVal = `${Math.floor(data.acc * 80)}px`;
            return (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-emerald-500 w-6 rounded-t transition-all duration-300" style={{ height: heightVal }}></div>
                <span className="text-[8px] font-mono text-gray-500 mt-1">Ep{data.epoch}</span>
              </div>
            );
          })}
        </div>
        {isTraining && <div className="text-[10px] text-center text-purple-400 font-mono">Running Gradient Descent Optimizer...</div>}
      </div>
    </div>
  );
}

function EmailCoachSandbox({ tool }) {
  const [email, setEmail] = useState(
    "Hi, I am reaching out to see if you have time for a call. Our software is very good for business automations. Let me know."
  );
  const [score, setScore] = useState(65);
  const [suggestions, setSuggestions] = useState([
    "Subject line is missing",
    "Tone is generic and passive",
    "No call-to-action link provided"
  ]);

  const handleFix = () => {
    setEmail(
      "Subject: Boost workflow speeds by 30% with automation?\n\nHi [Name],\n\nI noticed your team is scaling development. We help engineering teams integrate automated pipeline checks, saving an average of 8 hours weekly.\n\nDo you have 10 minutes next Tuesday for a demo? You can book directly: [Link]."
    );
    setScore(98);
    setSuggestions([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 font-sans">
      <div className="md:col-span-2 space-y-3">
        <label className="block text-xs font-mono text-gray-400 uppercase">Outreach Email Draft</label>
        <textarea
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full h-[150px] bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 font-mono resize-none leading-relaxed"
        />
        <button
          onClick={handleFix}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all"
        >
          ⚡ Rewrite for High Conversion
        </button>
      </div>

      <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono text-gray-400 block uppercase mb-2">Lavender Email Score</span>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-extrabold ${score > 80 ? 'text-green-400' : 'text-yellow-400'}`}>{score}</span>
            <span className="text-xs text-gray-500 font-mono">/ 100</span>
          </div>
        </div>

        <div className="space-y-1 mt-4">
          <span className="text-[9px] font-mono text-gray-400 uppercase">Recommendations</span>
          {suggestions.length > 0 ? (
            suggestions.map((s, i) => (
              <div key={i} className="text-[10px] text-yellow-500 leading-normal">• {s}</div>
            ))
          ) : (
            <div className="text-[10px] text-green-400 font-mono font-bold">✓ Pitch is fully optimized!</div>
          )}
        </div>
      </div>
    </div>
  );
}

function SalesIntelSandbox({ tool }) {
  return (
    <div className="space-y-4 relative z-10 font-sans">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black/60 border border-white/10 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-mono text-gray-500 block uppercase">Talk/Listen ratio</span>
          <span className="text-xl font-bold text-white block mt-1">42% / 58%</span>
          <span className="text-[9px] text-green-400 font-mono">Ideal mix range</span>
        </div>
        <div className="bg-black/60 border border-white/10 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-mono text-gray-500 block uppercase">Customer sentiment</span>
          <span className="text-xl font-bold text-green-400 block mt-1">Positive (86%)</span>
          <span className="text-[9px] text-gray-500">Based on voice tonality</span>
        </div>
        <div className="bg-black/60 border border-white/10 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-mono text-gray-500 block uppercase">Longest Monologue</span>
          <span className="text-xl font-bold text-white block mt-1">2m 14s</span>
          <span className="text-[9px] text-yellow-500 font-mono">Keep under 2 mins</span>
        </div>
        <div className="bg-black/60 border border-white/10 rounded-xl p-3.5 text-center">
          <span className="text-[10px] font-mono text-gray-500 block uppercase">Key Competitors</span>
          <span className="text-xs font-bold text-purple-400 block mt-2">Salesforce (3x)</span>
          <span className="text-[9px] text-gray-500 font-mono">Objections handled</span>
        </div>
      </div>

      <div className="bg-black/40 border border-white/10 rounded-xl p-4">
        <span className="text-[10px] font-mono text-gray-400 block uppercase mb-2">Tracked Keywords & Mentions</span>
        <div className="flex flex-wrap gap-2">
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/25 px-2.5 py-1 rounded text-xs font-mono">&quot;Budget constraints&quot; x4</span>
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/25 px-2.5 py-1 rounded text-xs font-mono">&quot;Security compliance&quot; x2</span>
          <span className="bg-purple-500/10 text-purple-400 border border-purple-500/25 px-2.5 py-1 rounded text-xs font-mono">&quot;Timeline next quarter&quot; x3</span>
        </div>
      </div>
    </div>
  );
}

function SeoCoachSandbox({ tool }) {
  const [keyword, setKeyword] = useState("AI content automation software");
  const [score, setScore] = useState(48);
  const [optimized, setOptimized] = useState(false);

  const runSeoFix = () => {
    setScore(89);
    setOptimized(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10 font-sans">
      <div className="md:col-span-2 space-y-4">
        <div>
          <label className="block text-xs font-mono text-gray-400 mb-1.5">Target Primary Keyword</label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white"
          />
        </div>

        <button
          onClick={runSeoFix}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all"
        >
          ⚡ Auto-Inject Required Headings & NLP Terms
        </button>
      </div>

      <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wide">SEO Content Grade</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className={`text-4xl font-extrabold ${score > 80 ? 'text-green-400' : 'text-yellow-400'}`}>{score}</span>
            <span className="text-xs text-gray-500">/ 100</span>
          </div>
        </div>

        <div className="space-y-1 text-[10px] font-mono text-gray-400 mt-4">
          <div>Word count: {optimized ? '1,560 words' : '820 words'}</div>
          <div>NLP Density: {optimized ? 'Optimal' : 'Low density'}</div>
          <div>Headings status: {optimized ? 'Correct layout (H1-H3)' : 'Missing keyword in H2'}</div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MAIN ROUTING WIDGET CONTENT
// -------------------------------------------------------------
function SandboxContent({ type, tool }) {
  switch (type) {
    case 'chat':
      return <ChatSandbox tool={tool} />;
    case 'editor':
      return <EditorSandbox tool={tool} />;
    case 'image-gen':
      return <ImageGenSandbox tool={tool} />;
    case 'voice-tts':
      return <VoiceTtsSandbox tool={tool} />;
    case 'music-gen':
      return <MusicGenSandbox tool={tool} />;
    case 'video-gen':
      return <VideoGenSandbox tool={tool} />;
    case 'code-editor':
      return <CodeSandbox tool={tool} />;
    case 'search':
      return <PerplexitySandbox tool={tool} />;
    case 'automation':
      return <AutomationSandbox tool={tool} />;
    case 'vector-db':
      return <VectorDbSandbox tool={tool} />;
    case 'dev-api':
      return <DevApiSandbox tool={tool} />;
    case 'automl':
      return <AutoMLSandbox tool={tool} />;
    case 'email-coach':
      return <EmailCoachSandbox tool={tool} />;
    case 'sales-intel':
      return <SalesIntelSandbox tool={tool} />;
    case 'seo-coach':
      return <SeoCoachSandbox tool={tool} />;
    case 'video-avatar':
      return <VideoAvatarSandbox tool={tool} />;
    case 'slides':
      return <SlidesSandbox tool={tool} />;
    case 'audio-editor':
      return <AudioEditorSandbox tool={tool} />;
    case 'transcribe':
      return <TranscribeSandbox tool={tool} />;
    case 'finance':
      return <FinanceSandbox tool={tool} />;
    case 'hr-talent':
      return <HrSandbox tool={tool} />;
    case 'silopulse':
      return <SiloPulseSandbox tool={tool} />;
    case 'prophetledger':
      return <ProphetLedgerSandbox tool={tool} />;
    case 'echoaudit':
      return <EchoAuditSandbox tool={tool} />;
    case 'vibecontract':
      return <VibeContractSandbox tool={tool} />;
    case 'carbonidle':
      return <CarbonIdleSandbox tool={tool} />;
    case 'memescale':
      return <MemeScaleSandbox tool={tool} />;
    case 'shapeshifter-api':
      return <ShapeShifterSandbox tool={tool} />;
    case 'resiliostress':
      return <ResilioStressSandbox tool={tool} />;
    default:
      return <ChatSandbox tool={tool} />;
  }
}

// -------------------------------------------------------------
// SILOPULSE SANDBOX (Organizational Silo & Friction Analyzer)
// -------------------------------------------------------------
function SiloPulseSandbox({ tool }) {
  const [selectedDept, setSelectedDept] = useState('Sales');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditRun, setAuditRun] = useState(false);

  const departments = {
    Sales: {
      siloScore: '82%',
      friction: 'High with Engineering (12% communication rate)',
      impact: 'Product releases missing client specifications, leading to 15% churn.',
      rec: 'Instill a joint weekly backlog sync and share Slack channels.'
    },
    Engineering: {
      siloScore: '45%',
      friction: 'Medium with Product (65% alignment rate)',
      impact: 'Re-work needed on 30% of technical user stories.',
      rec: 'Embed Product Managers directly into Engineering daily standups.'
    },
    Product: {
      siloScore: '30%',
      friction: 'Low with Design (92% collaboration rate)',
      impact: 'Strong design feedback, but high divergence from business expectations.',
      rec: 'Ensure design review is aligned with direct customer feedback calls.'
    },
    HR: {
      siloScore: '90%',
      friction: 'Critical with Operations (8% interaction rate)',
      impact: 'Onboarding bottlenecks causing a 3-week delay in developer productivity.',
      rec: 'Automate operational provisioning directly from the HR platform trigger.'
    },
    Marketing: {
      siloScore: '60%',
      friction: 'High with Sales (24% lead-loopback rate)',
      impact: 'Marketing budget wasted on low-intent SQLs, causing 18% sales cycle lag.',
      rec: 'Establish a shared revenue-attribution dashboard and bi-weekly pipeline review.'
    }
  };

  const handleAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditRun(true);
    }, 1500);
  };

  return (
    <div className="space-y-4 text-gray-200 font-sans relative z-10">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-semibold text-white">SiloPulse Network Connectivity</h4>
          <p className="text-xs text-gray-400">Map communication health across business functions</p>
        </div>
        <button
          onClick={handleAudit}
          disabled={isAuditing}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          {isAuditing ? 'Auditing Slack/Email logs...' : 'Run Network Audit'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visual Map */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex flex-col justify-center items-center min-h-[220px] relative">
          {isAuditing && (
            <div className="absolute inset-0 bg-slate-950/80 rounded-xl flex items-center justify-center backdrop-blur-sm z-20">
              <span className="w-6 h-6 rounded-full border-2 border-purple-500 border-t-transparent animate-spin mr-2"></span>
              <span className="text-xs font-semibold text-purple-400">Scanning graph nodes...</span>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(departments).map((dept) => {
              const isSelected = selectedDept === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-600/30'
                      : 'bg-white/5 text-gray-300 border-white/5 hover:bg-white/10'
                  }`}
                >
                  {dept} {auditRun && <span className="ml-1 text-[10px] opacity-75">({departments[dept].siloScore})</span>}
                </button>
              );
            })}
          </div>

          <div className="mt-6 text-center text-[10px] text-gray-500 font-mono">
            {auditRun ? '🟢 Live Network Map active. Click departments to inspect silos.' : '⚪ Run Audit to analyze connection telemetry.'}
          </div>
        </div>

        {/* Audit Details */}
        <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wide">Friction Analysis: {selectedDept}</span>
            {auditRun ? (
              <div className="mt-3 space-y-3">
                <div>
                  <span className="text-xs text-gray-400 block">Silo Index:</span>
                  <span className="text-lg font-bold text-white">{departments[selectedDept].siloScore}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Friction Point:</span>
                  <span className="text-xs text-yellow-400 font-semibold">{departments[selectedDept].friction}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Revenue/Ops Impact:</span>
                  <span className="text-xs text-red-300">{departments[selectedDept].impact}</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-500 mt-6 italic text-center">
                Click &quot;Run Network Audit&quot; above to trace department interaction logs and load analytics.
              </div>
            )}
          </div>

          {auditRun && (
            <div className="mt-4 pt-3 border-t border-white/5 bg-purple-500/5 p-2 rounded">
              <span className="text-[10px] font-mono text-green-400 block uppercase">AI Friction Mitigator:</span>
              <p className="text-xs text-gray-300 mt-1 italic">&quot;{departments[selectedDept].rec}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// PROPHETLEDGER SANDBOX (AI Opportunity Cost Simulator)
// -------------------------------------------------------------
function ProphetLedgerSandbox({ tool }) {
  const [months, setMonths] = useState(6);
  const [decision, setDecision] = useState('EU Market Expansion');

  const decisions = {
    'EU Market Expansion': { costPerMonth: 45000, marketCapLoss: 2.4 },
    'Launch AI Core Product': { costPerMonth: 85000, marketCapLoss: 5.2 },
    'Hire Enterprise VP': { costPerMonth: 30000, marketCapLoss: 1.1 }
  };

  const current = decisions[decision];
  const totalRevenueLoss = current.costPerMonth * months;
  const marketValuationFlee = current.marketCapLoss * (months / 6);

  return (
    <div className="space-y-4 text-gray-200 font-sans relative z-10">
      <div>
        <h4 className="text-sm font-semibold text-white">Inaction & Opportunity Cost Simulator</h4>
        <p className="text-xs text-gray-400">Select a delayed corporate action to simulate negative budget impact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Inputs */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-4 space-y-4 md:col-span-2">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Strategic Decision</label>
            <select
              value={decision}
              onChange={(e) => setDecision(e.target.value)}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="EU Market Expansion">EU Market Expansion (Delaying global footprint)</option>
              <option value="Launch AI Core Product">Launch AI Core Product (Delaying product leadership)</option>
              <option value="Hire Enterprise VP">Hire Enterprise VP (Delaying sales speed)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
              <span>Time Inaction:</span>
              <span className="text-purple-400 font-bold">{months} Months</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="bg-purple-950/20 border border-purple-500/10 rounded-lg p-3 text-xs text-gray-400">
            💡 <strong className="text-white">Opportunity Cost Insight:</strong> Delaying &quot;{decision}&quot; allows second-tier competitors to cement market position, rising search engine share by 1.8% each month.
          </div>
        </div>

        {/* Outputs */}
        <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between text-center">
          <div>
            <span className="text-[10px] font-mono text-red-400 uppercase tracking-wide">Estimated Loss of Inaction</span>
            <div className="mt-4">
              <span className="text-xs text-gray-500 block">Direct Lost Revenue</span>
              <span className="text-3xl font-extrabold text-red-500">${totalRevenueLoss.toLocaleString()}</span>
            </div>
            <div className="mt-4">
              <span className="text-xs text-gray-500 block">Valuation Impairment</span>
              <span className="text-xl font-bold text-white">-${marketValuationFlee.toFixed(1)}M</span>
            </div>
          </div>
          <div className="text-[9px] text-gray-500 font-mono pt-4 border-t border-white/5">
            Model based on ProphetLedger market-share delta logs.
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// ECHOAUDIT SANDBOX (Executive Echo-Chamber Audit)
// -------------------------------------------------------------
function EchoAuditSandbox({ tool }) {
  const [meeting, setMeeting] = useState('pricing');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(false);

  const presets = {
    pricing: {
      score: 78,
      biases: [
        'Authority Dominance (CEO spoke 64% of meeting)',
        'Status-Quo Bias (Immediate pushback on tiered subscriptions)',
        'Confirmation Bias (Ignored market study showing competitors charging more)'
      ],
      devil: [
        'How would our business model adapt if we were forced to double our rates tomorrow?',
        'What specific data point contradicts our assumption that customers will churn if prices increase?',
        'Who in this room is most likely to disagree with our current pricing path, and what would they say?'
      ]
    },
    roadmap: {
      score: 42,
      biases: [
        'Over-optimism Bias (Timeline set at 3 months without factoring buffer)',
        'Sunk Cost Fallacy (Decided to continue building custom chat rather than API integration)'
      ],
      devil: [
        'If this project fails in Q3, what would be the post-mortem analysis of why?',
        'What would happen if we deferred this feature to next year and prioritized technical debt instead?'
      ]
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResults(true);
    }, 1200);
  };

  return (
    <div className="space-y-4 text-gray-200 font-sans relative z-10">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-semibold text-white">EchoAudit Meeting Analyzer</h4>
          <p className="text-xs text-gray-400">Detect cognitive bias and groupthink in meeting transcripts</p>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={analyzing}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          {analyzing ? 'Analyzing transcript...' : 'Run Bias Audit'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/50 border border-white/10 rounded-xl p-4 md:col-span-2 space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Select Meeting Transcript Preset</label>
            <select
              value={meeting}
              onChange={(e) => { setMeeting(e.target.value); setResults(false); }}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="pricing">Q3 Subscription Pricing Model Sync</option>
              <option value="roadmap">Product Roadmap & Release Priority Sync</option>
            </select>
          </div>

          {results ? (
            <div className="space-y-2">
              <span className="text-xs font-bold text-red-400">Detected Groupthink Biases:</span>
              <ul className="space-y-1">
                {presets[meeting].biases.map((bias, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-1">
                    <span>⚠️</span> {bias}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-xs text-gray-500 italic py-6 text-center">
              Click &quot;Run Bias Audit&quot; to review groupthink metrics.
            </div>
          )}
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase">Echo-Chamber Rating</span>
            <div className="flex items-baseline gap-1 mt-2">
              <span className={`text-4xl font-extrabold ${results ? (presets[meeting].score > 60 ? 'text-red-500' : 'text-yellow-500') : 'text-gray-600'}`}>
                {results ? presets[meeting].score : '--'}
              </span>
              <span className="text-xs text-gray-500">/ 100</span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">Higher means more groupthink vulnerability</p>
          </div>

          {results && (
            <div className="mt-4 pt-3 border-t border-white/5">
              <span className="text-[9px] font-mono text-green-400 block uppercase">Recommended Devil&apos;s Advocate Q:</span>
              <p className="text-[11px] text-gray-300 italic mt-1">&quot;{presets[meeting].devil[0]}&quot;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// VIBECONTRACT SANDBOX (Brand-Trust legal translator)
// -------------------------------------------------------------
function VibeContractSandbox({ tool }) {
  const [preset, setPreset] = useState('termination');
  const [vibeAudited, setVibeAudited] = useState(false);
  const [auditing, setAuditing] = useState(false);

  const clauses = {
    termination: {
      original: 'We reserve the absolute right, in our sole discretion, with or without notice, to suspend or terminate your service contract immediately for any action we deem non-compliant.',
      optimized: 'If we ever need to pause your account due to terms issues, we will reach out immediately, explain why, and work with you to resolve it within 48 hours.',
      trust: 94,
      originalTrust: 32,
      fear: 8
    },
    indemnification: {
      original: 'The user agrees to defend, indemnify, and hold harmless our company from and against any claims, damages, costs, liabilities, and expenses arising out of or related to use.',
      optimized: 'If a legal concern arises from how you use our platform, we will face it together and coordinate fair legal protection policies.',
      trust: 89,
      originalTrust: 28,
      fear: 12
    }
  };

  const handleAudit = () => {
    setAuditing(true);
    setTimeout(() => {
      setAuditing(false);
      setVibeAudited(true);
    }, 1000);
  };

  return (
    <div className="space-y-4 text-gray-200 font-sans relative z-10">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-semibold text-white">VibeContract Brand-Trust Translator</h4>
          <p className="text-xs text-gray-400">Scan legal contracts and convert hostile legalese into customer-building trust</p>
        </div>
        <button
          onClick={handleAudit}
          disabled={auditing}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          {auditing ? 'Re-writing contract copy...' : 'Translate & Audit'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/50 border border-white/10 rounded-xl p-4 md:col-span-2 space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Select Legal Clause</label>
            <select
              value={preset}
              onChange={(e) => { setPreset(e.target.value); setVibeAudited(false); }}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="termination">Service Account Termination Clause</option>
              <option value="indemnification">Indemnification & Legal Protection</option>
            </select>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-red-400 uppercase">Original Legalese</span>
              <p className="text-xs text-gray-400 mt-1 bg-black/40 p-2.5 rounded border border-white/5">{clauses[preset].original}</p>
            </div>
            {vibeAudited && (
              <div>
                <span className="text-[10px] font-mono text-green-400 uppercase">Brand-Trust Optimized Version</span>
                <p className="text-xs text-white mt-1 bg-purple-950/20 p-2.5 rounded border border-purple-500/20">{clauses[preset].optimized}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between text-center">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase block">Brand Trust Rating</span>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div>
                <span className="text-xs text-gray-500 block">Original</span>
                <span className="text-lg font-bold text-red-400">{clauses[preset].originalTrust}%</span>
              </div>
              <div className="text-gray-600">➡️</div>
              <div>
                <span className="text-xs text-gray-500 block">Optimized</span>
                <span className="text-2xl font-extrabold text-green-400">{vibeAudited ? `${clauses[preset].trust}%` : '--'}</span>
              </div>
            </div>
          </div>

          <div className="bg-black/40 border border-white/5 rounded p-2 text-left mt-4 text-[10px] text-gray-400">
            ☠️ <span className="font-semibold text-red-400">Fear Index:</span> {vibeAudited ? `${clauses[preset].fear}% (Negligible)` : '85% (High User Hesitancy)'}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// CARBONIDLE SANDBOX (Digital Carbon Waste Automator)
// -------------------------------------------------------------
function CarbonIdleSandbox({ tool }) {
  const [cleaned, setCleaned] = useState(false);
  const [cleaning, setCleaning] = useState(false);

  const handleClean = () => {
    setCleaning(true);
    setTimeout(() => {
      setCleaning(false);
      setCleaned(true);
    }, 1500);
  };

  return (
    <div className="space-y-4 text-gray-200 font-sans relative z-10">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-semibold text-white">CarbonIdle Cloud Dashboard</h4>
          <p className="text-xs text-gray-400">Audit idle developer sandbox environments and stale DB replication nodes</p>
        </div>
        <button
          onClick={handleClean}
          disabled={cleaning || cleaned}
          className={`font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer ${
            cleaned 
              ? 'bg-green-600 text-white cursor-default'
              : 'bg-purple-600 hover:bg-purple-500 text-white'
          }`}
        >
          {cleaning ? 'Tearing down idle instances...' : cleaned ? 'Infrastructure Optimized!' : 'Run Green Purge'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Systems Grid */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-4 md:col-span-2 grid grid-cols-2 gap-3">
          <div className="bg-black/40 p-3 rounded border border-white/5">
            <span className="text-[10px] font-mono text-gray-400 block">Idle AWS Instances</span>
            <span className={`text-lg font-bold ${cleaned ? 'text-gray-500 line-through' : 'text-red-400'}`}>14 Stale Nodes</span>
            <span className="text-[9px] text-gray-500 block">Staging sandboxes left open</span>
          </div>
          <div className="bg-black/40 p-3 rounded border border-white/5">
            <span className="text-[10px] font-mono text-gray-400 block">Unused Cloud Storage</span>
            <span className={`text-lg font-bold ${cleaned ? 'text-gray-500 line-through' : 'text-red-400'}`}>4.2 TB Stale Cache</span>
            <span className="text-[9px] text-gray-500 block">Obsolete build zip logs</span>
          </div>
          <div className="bg-black/40 p-3 rounded border border-white/5">
            <span className="text-[10px] font-mono text-gray-400 block">Redundant APIs</span>
            <span className="text-lg font-bold text-green-400">18 Endpoints</span>
            <span className="text-[9px] text-gray-500 block">Legacy routing deprecated</span>
          </div>
          <div className="bg-black/40 p-3 rounded border border-white/5">
            <span className="text-[10px] font-mono text-gray-400 block">Hosting ESG Rating</span>
            <span className="text-lg font-bold text-white">{cleaned ? 'Grade A' : 'Grade D-'}</span>
            <span className="text-[9px] text-gray-500 block">Efficiency coefficient</span>
          </div>
        </div>

        {/* Carbon savings */}
        <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between text-center">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase block">Monthly Footprint Savings</span>
            <div className="mt-4">
              <span className="text-xs text-gray-500 block">CO2 Saved</span>
              <span className="text-3xl font-extrabold text-green-400">{cleaned ? '3.2 Tons' : '0.0 Tons'}</span>
            </div>
            <div className="mt-4">
              <span className="text-xs text-gray-500 block">Hosting Bill Cut</span>
              <span className="text-xl font-bold text-white">{cleaned ? '-$1,240 / mo' : '$0.00'}</span>
            </div>
          </div>
          <div className="text-[9px] text-gray-500 font-mono pt-4 border-t border-white/5">
            CarbonIdle API traces network electricity coefficients.
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MEMESCALE SANDBOX (Pop Culture B2B Marketing Translator)
// -------------------------------------------------------------
function MemeScaleSandbox({ tool }) {
  const [meme, setMeme] = useState('galaxy');
  const [translated, setTranslated] = useState(false);
  const [translating, setTranslating] = useState(false);

  const templates = {
    galaxy: {
      post: `🧠 Building custom software from scratch for standard forms.\n🧠🧠 Subscribing to 15 different SaaS packages.\n🧠🧠🧠 Writing a custom script that breaks next week.\n🧠🧠🧠🧠 Using automated shape-shifting APIs to link everything on-the-fly and drinking coffee while your system scales automatically.\n\nWork smarter, not harder. #GrowthMindset #ProductivityHacks #AIEnterprise`
    },
    boyfriend: {
      post: `👀 Me (B2B SaaS Owner)\n👀 The working, reliable legacy CRM database we built in 2018\n👀 The shiny new AI opportunities cost ledger simulation tool that increases pricing velocity by 40%\n\nDon't let legacy operations hold back strategic market share expansion. #Operations #B2BMarketing #Innovation`
    }
  };

  const handleTranslate = () => {
    setTranslating(true);
    setTimeout(() => {
      setTranslating(false);
      setTranslated(true);
    }, 1000);
  };

  return (
    <div className="space-y-4 text-gray-200 font-sans relative z-10">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-semibold text-white">MemeScale Viral B2B Copywriter</h4>
          <p className="text-xs text-gray-400">Map viral pop-culture memes into enterprise-compliant, viral LinkedIn updates</p>
        </div>
        <button
          onClick={handleTranslate}
          disabled={translating}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          {translating ? 'Generating professional copy...' : 'Translate Trend'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/50 border border-white/10 rounded-xl p-4 md:col-span-2 space-y-4">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Select Trending Meme Format</label>
            <select
              value={meme}
              onChange={(e) => { setMeme(e.target.value); setTranslated(false); }}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="galaxy">Galaxy Brain (SaaS Scaling hierarchy)</option>
              <option value="boyfriend">Distracted Boyfriend (Legacy CRM vs AI opportunistic tools)</option>
            </select>
          </div>

          {translated ? (
            <div>
              <span className="text-[10px] font-mono text-green-400 uppercase">Generated LinkedIn Post Format</span>
              <pre className="text-xs text-gray-300 mt-1 bg-black/40 p-2.5 rounded border border-white/5 font-sans whitespace-pre-wrap leading-relaxed">{templates[meme].post}</pre>
            </div>
          ) : (
            <div className="text-xs text-gray-500 italic py-8 text-center">
              Click &quot;Translate Trend&quot; to review compliant growth copy.
            </div>
          )}
        </div>

        <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase block">Brand Compliance Grade</span>
            <div className="mt-3 text-center">
              <span className="text-4xl font-extrabold text-green-400">100%</span>
              <span className="text-xs text-gray-500 block mt-1">Safe for corporate B2B feed</span>
            </div>
          </div>
          <div className="bg-black/40 border border-white/5 p-2 rounded text-[10px] text-gray-400 mt-4 leading-normal">
            ℹ️ <strong className="text-white">Trend Score:</strong> Highly active on LinkedIn Tech community right now (+45% organic visibility potential).
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// SHAPESHIFTER API SANDBOX (Dynamic Schema Shape-Shifter)
// -------------------------------------------------------------
function ShapeShifterSandbox({ tool }) {
  const [targetSchema, setTargetSchema] = useState('snake');
  const [shifted, setShifted] = useState(false);
  const [shifting, setShifting] = useState(false);

  const inputJson = `{
  "userId": 1024,
  "transaction_amount": 250.00,
  "clientProfile": {
    "fullName": "Sarah Jenkins",
    "isActive": true
  }
}`;

  const outputs = {
    snake: `{
  "user_id": 1024,
  "transaction_amount": 250.00,
  "client_profile_full_name": "Sarah Jenkins",
  "client_profile_is_active": true
}`,
    xml: `<UserRequest>
  <UserId>1024</UserId>
  <TransactionAmount>250.00</TransactionAmount>
  <ClientFullName>Sarah Jenkins</ClientFullName>
  <ClientIsActive>true</ClientIsActive>
</UserRequest>`
  };

  const handleShift = () => {
    setShifting(true);
    setTimeout(() => {
      setShifting(false);
      setShifted(true);
    }, 1000);
  };

  return (
    <div className="space-y-4 text-gray-200 font-sans relative z-10">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-semibold text-white">ShapeShifter API Schema playground</h4>
          <p className="text-xs text-gray-400">Map outbound modern JSON structure to flat/camel legacy target structures</p>
        </div>
        <button
          onClick={handleShift}
          disabled={shifting}
          className="bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
        >
          {shifting ? 'Shapeshifting schema payload...' : 'Shapeshift Payload'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Source Payload */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-3">
          <span className="text-[10px] font-mono text-purple-400 uppercase">Input Payload JSON</span>
          <pre className="text-[10.5px] text-gray-400 font-mono mt-1.5 bg-black/40 p-2 rounded border border-white/5 select-none">{inputJson}</pre>
        </div>

        {/* Transformer settings */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-3 flex flex-col justify-between">
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1.5 uppercase">Target Format</label>
            <select
              value={targetSchema}
              onChange={(e) => { setTargetSchema(e.target.value); setShifted(false); }}
              className="w-full bg-black/60 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none"
            >
              <option value="snake">Flat Snake Case JSON (Legacy ERP)</option>
              <option value="xml">Standard SOAP XML (Legacy Banking Portal)</option>
            </select>
          </div>
          <div className="bg-purple-950/20 border border-purple-500/10 rounded p-2.5 text-[10px] text-gray-400">
            ⚡ ShapeShifter interceptor handles headers and routing formats automatically.
          </div>
        </div>

        {/* Shifted Payload */}
        <div className="bg-black/60 border border-white/10 rounded-xl p-3">
          <span className="text-[10px] font-mono text-green-400 uppercase">Shifted Outbound Payload</span>
          {shifted ? (
            <pre className="text-[10.5px] text-white font-mono mt-1.5 bg-black/40 p-2 rounded border border-purple-500/20 overflow-x-auto">{outputs[targetSchema]}</pre>
          ) : (
            <div className="text-xs text-gray-500 italic py-10 text-center font-sans">
              Press Shapeshift to transform.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// RESILIOSTRESS SANDBOX (Alert Circadian Fatigue Scheduler)
// -------------------------------------------------------------
function ResilioStressSandbox({ tool }) {
  const [circadianLevel, setCircadianLevel] = useState(70);
  const [scheduled, setScheduled] = useState(false);

  const alertStats = {
    unfiltered: { count: 86, fatigue: '92% (High Burnout Warning)', responseTime: '42 mins (Delayed due to overload)' },
    filtered: { count: 12, fatigue: '15% (Healthy)', responseTime: '4.5 mins (Instant focus resolution)' }
  };

  const currentStats = scheduled ? alertStats.filtered : alertStats.unfiltered;

  return (
    <div className="space-y-4 text-gray-200 font-sans relative z-10">
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-sm font-semibold text-white">ResilioStress Alert Control Panel</h4>
          <p className="text-xs text-gray-400">Apply human circadian alignment filters to critical operational telemetry alerts</p>
        </div>
        <button
          onClick={() => setScheduled(!scheduled)}
          className={`font-semibold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer ${
            scheduled 
              ? 'bg-green-600 hover:bg-green-500 text-white' 
              : 'bg-purple-600 hover:bg-purple-500 text-white'
          }`}
        >
          {scheduled ? 'Disable Circadian Filter' : 'Apply Circadian Filter'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Settings */}
        <div className="bg-black/50 border border-white/10 rounded-xl p-4 md:col-span-2 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
              <span>Sleep & Circadian Guard Window:</span>
              <span className="text-purple-400 font-bold">{circadianLevel}% Restored Protection</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={circadianLevel}
              onChange={(e) => setCircadianLevel(parseInt(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="bg-black/40 border border-white/5 rounded-lg p-3 text-xs text-gray-400 space-y-1">
            <span className="text-purple-400 font-semibold block">Batch Queue Mode:</span>
            <p>• Emergency outage alerts bypass filter immediately.</p>
            <p>• Storage warning, minor test failures, and deployments queued for morning review digest.</p>
          </div>
        </div>

        {/* Dashboard output */}
        <div className="bg-black/60 border border-white/10 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase">Operational Fatigue Statistics</span>
            <div className="mt-3 space-y-2 text-xs">
              <div>
                <span className="text-gray-500 block">Total Alert Triggers:</span>
                <span className="font-bold text-white">{currentStats.count} alerts / day</span>
              </div>
              <div>
                <span className="text-gray-500 block">Estimated Team Fatigue:</span>
                <span className={`font-bold ${scheduled ? 'text-green-400' : 'text-red-400'}`}>{currentStats.fatigue}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Average Response Latency:</span>
                <span className="font-semibold text-white">{currentStats.responseTime}</span>
              </div>
            </div>
          </div>
          <div className="text-[9px] text-gray-500 font-mono pt-3 border-t border-white/5 text-center">
            Integrated with ResilioStress channels.
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// DEBUG CONSOLE WRITER
// -------------------------------------------------------------
function ConsoleLogs({ tool, type }) {
  const logs = useMemo(() => {
    const tokenPart = tool.slug.substring(0, 5) + (tool.slug.length * 3).toString(16);
    return [
      `[sys] Starting Sandbox Engine v1.0.0 for ${tool.name}...`,
      `[sys] Mapped category "${tool.category}" to sandbox runtime engine type "${type}".`,
      `[net] Established secure client session stream with client token: jwt_sandbox_${tokenPart}`,
      `[net] Connection details: ws://localhost:8000/api/v1/tools/${tool.slug}/sandbox`,
      `[sys] Memory allocation verified: 128MB sandbox sandbox-heap`,
      `[sys] Loaded client UI modules successfully. Sandbox is fully interactive.`
    ];
  }, [tool, type]);

  return (
    <div className="bg-slate-900/90 border border-white/10 rounded-xl p-4 font-mono text-xs text-emerald-400 h-[280px] overflow-y-auto space-y-1 relative z-10 scanline">
      <div className="flex justify-between items-center text-[10px] text-gray-500 border-b border-white/5 pb-2 mb-3">
        <span>Active Trace logs</span>
        <span>Environment: Development</span>
      </div>
      {logs.map((log, idx) => (
        <div key={idx} className="leading-relaxed whitespace-pre-wrap">
          {log}
        </div>
      ))}
      <div className="text-[10px] text-gray-500 pt-4 font-bold">--- End of Initial Session logs ---</div>
    </div>
  );
}
