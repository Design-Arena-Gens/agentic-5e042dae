'use client';

import { useState } from 'react';
import { Workflow, FileSpreadsheet, Music, Video, Upload, CheckCircle, PlayCircle, AlertCircle, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  tool: string;
  status: 'pending' | 'active' | 'complete';
  details: string[];
  config: string[];
}

export default function Home() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'setup' | 'n8n'>('pipeline');

  const steps: Step[] = [
    {
      id: 1,
      title: 'Generate Rhyme Ideas',
      description: 'AI-powered rhyme and lyric generation',
      tool: 'OpenAI GPT / Anthropic Claude (Free Tier)',
      status: 'complete',
      details: [
        'Use ChatGPT API (free tier) or Claude Haiku',
        'Generate creative rhyme concepts and lyrics',
        'Extract themes, keywords, and structure',
        'Format output as structured JSON'
      ],
      config: [
        'API: OpenAI API or Anthropic API',
        'Model: gpt-3.5-turbo or claude-3-haiku',
        'Prompt: "Generate creative rhyme lyrics about [topic]"',
        'Temperature: 0.9 for creativity'
      ]
    },
    {
      id: 2,
      title: 'Log to Google Sheets',
      description: 'Store generated content and metadata',
      tool: 'Google Sheets API (Free)',
      status: 'active',
      details: [
        'Connect via Google Sheets API',
        'Log timestamp, rhyme text, theme, status',
        'Track generation history',
        'Enable easy review and editing'
      ],
      config: [
        'Service: Google Sheets API v4',
        'Auth: OAuth 2.0 or Service Account',
        'Columns: Timestamp, Theme, Lyrics, Audio URL, Video URL, YouTube URL, Status',
        'Sheet Name: "Rhyme Automation Log"'
      ]
    },
    {
      id: 3,
      title: 'Generate Audio',
      description: 'Convert text to music and speech',
      tool: 'Suno AI / Uberduck / ElevenLabs',
      status: 'pending',
      details: [
        'Suno AI: AI music generation (free tier)',
        'Uberduck: Text-to-speech with voice cloning',
        'ElevenLabs: High-quality TTS (free tier)',
        'Download and store audio files'
      ],
      config: [
        'Primary: Suno AI API (beta access)',
        'Fallback: Uberduck API (free tier)',
        'Format: MP3, 192kbps',
        'Storage: Temp folder or cloud storage'
      ]
    },
    {
      id: 4,
      title: 'Create Video',
      description: 'Generate visual content for the audio',
      tool: 'Remotion / D-ID / Runway ML',
      status: 'pending',
      details: [
        'Remotion: React-based video creation (self-hosted free)',
        'D-ID: AI avatar videos (free tier)',
        'Runway ML: AI video generation (free tier)',
        'Combine with audio track'
      ],
      config: [
        'Primary: Remotion (programmatic video)',
        'Alternative: D-ID API for talking avatars',
        'Resolution: 1920x1080 (1080p)',
        'Format: MP4, H.264 codec'
      ]
    },
    {
      id: 5,
      title: 'Upload to YouTube',
      description: 'Automatically publish videos',
      tool: 'YouTube Data API v3 (Free)',
      status: 'pending',
      details: [
        'OAuth authentication with YouTube',
        'Auto-generate titles and descriptions',
        'Add tags and categories',
        'Set privacy settings and scheduling'
      ],
      config: [
        'API: YouTube Data API v3',
        'Auth: OAuth 2.0 (user consent)',
        'Quota: 10,000 units/day (free)',
        'Auto-fill: Title, description, tags from rhyme data'
      ]
    },
    {
      id: 6,
      title: 'Update Log & Monitor',
      description: 'Track success and analytics',
      tool: 'Google Sheets + YouTube Analytics',
      status: 'pending',
      details: [
        'Update sheet with YouTube URL',
        'Mark status as "Published"',
        'Track views, likes, comments',
        'Monitor for errors and retries'
      ],
      config: [
        'Update Status column: "Published"',
        'Add YouTube URL to sheet',
        'Optional: Fetch analytics via YouTube API',
        'Set up error notifications'
      ]
    }
  ];

  const toggleStep = (id: number) => {
    setExpandedStep(expandedStep === id ? null : id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'active':
        return <PlayCircle className="w-5 h-5 text-blue-500 animate-pulse" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            AI Rhyme Automation Pipeline
          </h1>
          <p className="text-xl text-gray-300">
            Automated content creation from idea to YouTube using free AI tools
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8 space-x-4">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'pipeline'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Pipeline Overview
          </button>
          <button
            onClick={() => setActiveTab('n8n')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'n8n'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            n8n Workflow
          </button>
          <button
            onClick={() => setActiveTab('setup')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'setup'
                ? 'bg-purple-600 text-white shadow-lg'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Setup Guide
          </button>
        </div>

        {/* Pipeline View */}
        {activeTab === 'pipeline' && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6 mb-8 border border-purple-500/30">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Workflow className="w-6 h-6" />
                Automation Pipeline Steps
              </h2>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className="bg-slate-900/50 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-all"
                  >
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full p-4 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {getStatusIcon(step.status)}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">
                            {step.id}. {step.title}
                          </h3>
                          <p className="text-sm text-gray-400">{step.description}</p>
                          <p className="text-xs text-purple-400 mt-1">🔧 {step.tool}</p>
                        </div>
                      </div>
                      {expandedStep === step.id ? (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    {expandedStep === step.id && (
                      <div className="px-4 pb-4 border-t border-slate-700 pt-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="font-semibold text-purple-400 mb-2">Implementation Details</h4>
                            <ul className="space-y-1 text-sm text-gray-300">
                              {step.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-purple-400 mt-1">•</span>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-semibold text-pink-400 mb-2">Configuration</h4>
                            <ul className="space-y-1 text-sm text-gray-300">
                              {step.config.map((conf, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-pink-400 mt-1">▸</span>
                                  <span>{conf}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* n8n Workflow View */}
        {activeTab === 'n8n' && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/30">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Workflow className="w-8 h-8 text-purple-400" />
                n8n Workflow Configuration
              </h2>

              <div className="space-y-6">
                <div className="bg-slate-900/70 rounded-lg p-6 border border-purple-500/20">
                  <h3 className="text-xl font-semibold mb-4 text-purple-300">📋 Workflow JSON Structure</h3>
                  <div className="bg-black/50 rounded p-4 font-mono text-sm text-green-400 overflow-x-auto">
                    <pre>{`{
  "name": "AI Rhyme to YouTube Automation",
  "nodes": [
    {
      "name": "Schedule Trigger",
      "type": "n8n-nodes-base.scheduleTrigger",
      "parameters": { "rule": { "interval": [{ "field": "hours", "hoursInterval": 6 }] } }
    },
    {
      "name": "Generate Rhyme (HTTP Request)",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://api.openai.com/v1/chat/completions",
        "authentication": "genericCredentialType",
        "method": "POST",
        "jsonParameters": true,
        "options": {},
        "bodyParametersJson": "{\\"model\\":\\"gpt-3.5-turbo\\",\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"Generate creative rhyme lyrics\\"}]}"
      }
    },
    {
      "name": "Log to Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "append",
        "sheetId": "YOUR_SHEET_ID",
        "range": "A:G"
      }
    },
    {
      "name": "Generate Audio (Suno/ElevenLabs)",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "YOUR_AUDIO_API_ENDPOINT" }
    },
    {
      "name": "Create Video (Remotion/D-ID)",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": { "url": "YOUR_VIDEO_API_ENDPOINT" }
    },
    {
      "name": "Upload to YouTube",
      "type": "n8n-nodes-base.youtube",
      "parameters": {
        "operation": "upload",
        "title": "={{$json[\\"rhyme_title\\"]}}",
        "categoryId": "10"
      }
    },
    {
      "name": "Update Sheet with Results",
      "type": "n8n-nodes-base.googleSheets",
      "parameters": {
        "operation": "update",
        "sheetId": "YOUR_SHEET_ID"
      }
    }
  ],
  "connections": {
    "Schedule Trigger": { "main": [[{ "node": "Generate Rhyme", "type": "main", "index": 0 }]] },
    "Generate Rhyme": { "main": [[{ "node": "Log to Google Sheets", "type": "main", "index": 0 }]] },
    "Log to Google Sheets": { "main": [[{ "node": "Generate Audio", "type": "main", "index": 0 }]] },
    "Generate Audio": { "main": [[{ "node": "Create Video", "type": "main", "index": 0 }]] },
    "Create Video": { "main": [[{ "node": "Upload to YouTube", "type": "main", "index": 0 }]] },
    "Upload to YouTube": { "main": [[{ "node": "Update Sheet", "type": "main", "index": 0 }]] }
  }
}`}</pre>
                  </div>
                </div>

                <div className="bg-slate-900/70 rounded-lg p-6 border border-pink-500/20">
                  <h3 className="text-xl font-semibold mb-4 text-pink-300">🔧 Node Configuration Details</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold text-white mb-2">1. Schedule Trigger Node</h4>
                      <p className="text-sm text-gray-300">Runs every 6 hours automatically</p>
                      <code className="text-xs bg-black/30 px-2 py-1 rounded mt-1 inline-block">Cron: 0 */6 * * *</code>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold text-white mb-2">2. HTTP Request (AI Generation)</h4>
                      <p className="text-sm text-gray-300">Calls OpenAI/Claude API with rhyme prompt</p>
                      <code className="text-xs bg-black/30 px-2 py-1 rounded mt-1 inline-block">Auth: Bearer Token</code>
                    </div>

                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold text-white mb-2">3. Google Sheets Node</h4>
                      <p className="text-sm text-gray-300">Append operation with OAuth2 authentication</p>
                      <code className="text-xs bg-black/30 px-2 py-1 rounded mt-1 inline-block">Scopes: spreadsheets</code>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-semibold text-white mb-2">4. Audio Generation Node</h4>
                      <p className="text-sm text-gray-300">HTTP Request to Suno/ElevenLabs/Uberduck</p>
                      <code className="text-xs bg-black/30 px-2 py-1 rounded mt-1 inline-block">Output: MP3 URL</code>
                    </div>

                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-semibold text-white mb-2">5. Video Creation Node</h4>
                      <p className="text-sm text-gray-300">Remotion webhook or D-ID API</p>
                      <code className="text-xs bg-black/30 px-2 py-1 rounded mt-1 inline-block">Output: MP4 URL</code>
                    </div>

                    <div className="border-l-4 border-pink-500 pl-4">
                      <h4 className="font-semibold text-white mb-2">6. YouTube Upload Node</h4>
                      <p className="text-sm text-gray-300">Native n8n YouTube node with OAuth2</p>
                      <code className="text-xs bg-black/30 px-2 py-1 rounded mt-1 inline-block">Privacy: Public/Unlisted</code>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-xl font-semibold mb-4">⚡ Quick Deploy to n8n</h3>
                  <ol className="space-y-2 text-sm text-gray-200">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-400">1.</span>
                      <span>Install n8n: <code className="bg-black/30 px-2 py-0.5 rounded text-xs">npm install -g n8n</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-400">2.</span>
                      <span>Start n8n: <code className="bg-black/30 px-2 py-0.5 rounded text-xs">n8n start</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-400">3.</span>
                      <span>Open: <a href="http://localhost:5678" className="text-blue-400 underline">http://localhost:5678</a></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-400">4.</span>
                      <span>Import the JSON workflow from above</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-400">5.</span>
                      <span>Configure credentials for each service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-purple-400">6.</span>
                      <span>Activate the workflow</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Setup Guide View */}
        {activeTab === 'setup' && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 border border-purple-500/30">
              <h2 className="text-3xl font-bold mb-6">🚀 Complete Setup Guide</h2>

              <div className="space-y-8">
                {/* Prerequisites */}
                <div className="bg-slate-900/70 rounded-lg p-6 border border-blue-500/20">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-300">📦 Prerequisites</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Required Accounts (All Free)</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>✓ OpenAI Account (free tier)</li>
                        <li>✓ Google Account (Sheets + YouTube)</li>
                        <li>✓ ElevenLabs Account (free 10k chars/month)</li>
                        <li>✓ Suno AI (beta access)</li>
                        <li>✓ D-ID or Runway (free tier)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Software Requirements</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>✓ Node.js 18+ installed</li>
                        <li>✓ npm or yarn package manager</li>
                        <li>✓ n8n (npm install -g n8n)</li>
                        <li>✓ Git (optional, for version control)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Step-by-step Setup */}
                <div className="bg-slate-900/70 rounded-lg p-6 border border-green-500/20">
                  <h3 className="text-2xl font-semibold mb-4 text-green-300">🔧 Step-by-Step Implementation</h3>

                  <div className="space-y-6">
                    <div className="border-l-4 border-purple-500 pl-6 py-2">
                      <h4 className="text-lg font-semibold text-white mb-3">Step 1: Setup Google Sheets</h4>
                      <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                        <li>Create new Google Sheet named "AI Rhyme Automation"</li>
                        <li>Add headers: Timestamp, Theme, Lyrics, Audio_URL, Video_URL, YouTube_URL, Status</li>
                        <li>Go to Google Cloud Console → Enable Sheets API</li>
                        <li>Create OAuth 2.0 credentials → Download JSON</li>
                        <li>Share sheet with service account email (if using service account)</li>
                      </ol>
                      <div className="bg-black/30 rounded p-3 mt-3 font-mono text-xs">
                        <div className="text-purple-400">// Example Sheet Structure</div>
                        <div className="text-gray-300">| Timestamp | Theme | Lyrics | Audio_URL | Video_URL | YouTube_URL | Status |</div>
                      </div>
                    </div>

                    <div className="border-l-4 border-blue-500 pl-6 py-2">
                      <h4 className="text-lg font-semibold text-white mb-3">Step 2: Configure AI Text Generation</h4>
                      <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                        <li>Get OpenAI API key from platform.openai.com</li>
                        <li>Or use Claude API from console.anthropic.com</li>
                        <li>Test API with curl or Postman</li>
                        <li>Create prompt template for rhyme generation</li>
                        <li>Set temperature to 0.8-0.9 for creativity</li>
                      </ol>
                      <div className="bg-black/30 rounded p-3 mt-3 font-mono text-xs overflow-x-auto">
                        <div className="text-blue-400">curl https://api.openai.com/v1/chat/completions \</div>
                        <div className="text-gray-300 pl-4">-H "Authorization: Bearer YOUR_API_KEY" \</div>
                        <div className="text-gray-300 pl-4">-H "Content-Type: application/json" \</div>
                        <div className="text-gray-300 pl-4">-d '{`{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"Generate rhyme"}]}`}'</div>
                      </div>
                    </div>

                    <div className="border-l-4 border-yellow-500 pl-6 py-2">
                      <h4 className="text-lg font-semibold text-white mb-3">Step 3: Setup Audio Generation</h4>
                      <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                        <li>Option A: ElevenLabs (Best quality) - Sign up at elevenlabs.io</li>
                        <li>Option B: Suno AI (Music) - Request beta access at suno.ai</li>
                        <li>Option C: Uberduck (Free alternative) - Sign up at uberduck.ai</li>
                        <li>Get API key from dashboard</li>
                        <li>Test voice/music generation with sample text</li>
                        <li>Store output MP3 in temporary storage or cloud</li>
                      </ol>
                      <div className="bg-black/30 rounded p-3 mt-3 text-xs text-yellow-300">
                        💡 Tip: ElevenLabs free tier gives 10,000 characters/month - enough for ~20 videos
                      </div>
                    </div>

                    <div className="border-l-4 border-pink-500 pl-6 py-2">
                      <h4 className="text-lg font-semibold text-white mb-3">Step 4: Setup Video Creation</h4>
                      <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                        <li>Option A: Remotion (Self-hosted, fully free)</li>
                        <li className="pl-6">- Install: npm install @remotion/cli @remotion/renderer</li>
                        <li className="pl-6">- Create React component for video template</li>
                        <li className="pl-6">- Render: npx remotion render</li>
                        <li>Option B: D-ID (AI avatars, free tier 20 videos/month)</li>
                        <li className="pl-6">- Sign up at d-id.com</li>
                        <li className="pl-6">- Use API to create talking avatar videos</li>
                        <li>Option C: Runway ML Gen-2 (free tier available)</li>
                      </ol>
                      <div className="bg-black/30 rounded p-3 mt-3 font-mono text-xs">
                        <div className="text-pink-400">// Remotion Example Component</div>
                        <div className="text-gray-300">{`export const MyVideo = () => (`}</div>
                        <div className="text-gray-300 pl-4">{`<AbsoluteFill style={{background: 'linear-gradient(...)'}}>`}</div>
                        <div className="text-gray-300 pl-8">{`<Audio src={audioUrl} />`}</div>
                        <div className="text-gray-300 pl-8">{`<Sequence><AnimatedText text={lyrics} /></Sequence>`}</div>
                        <div className="text-gray-300 pl-4">{`</AbsoluteFill>`}</div>
                        <div className="text-gray-300">{`);`}</div>
                      </div>
                    </div>

                    <div className="border-l-4 border-red-500 pl-6 py-2">
                      <h4 className="text-lg font-semibold text-white mb-3">Step 5: Setup YouTube Upload</h4>
                      <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                        <li>Go to Google Cloud Console → Enable YouTube Data API v3</li>
                        <li>Create OAuth 2.0 Client ID (Desktop app type)</li>
                        <li>Download credentials JSON</li>
                        <li>Authorize application with your YouTube channel</li>
                        <li>Test upload with sample video</li>
                        <li>Configure default video settings (category, privacy, etc.)</li>
                      </ol>
                      <div className="bg-black/30 rounded p-3 mt-3 text-xs text-red-300">
                        ⚠️ Note: YouTube API has daily quota of 10,000 units. Each upload costs ~1,600 units (6 videos/day max)
                      </div>
                    </div>

                    <div className="border-l-4 border-green-500 pl-6 py-2">
                      <h4 className="text-lg font-semibold text-white mb-3">Step 6: Build n8n Workflow</h4>
                      <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                        <li>Install n8n: <code className="bg-black/30 px-2 py-0.5 rounded text-xs">npm install -g n8n</code></li>
                        <li>Start n8n: <code className="bg-black/30 px-2 py-0.5 rounded text-xs">n8n start</code></li>
                        <li>Open browser to http://localhost:5678</li>
                        <li>Click "Import from File" or paste JSON workflow</li>
                        <li>Configure credentials for each node:
                          <ul className="pl-6 mt-1 space-y-1">
                            <li>- OpenAI/Claude API credentials</li>
                            <li>- Google Sheets OAuth2</li>
                            <li>- Audio service API key</li>
                            <li>- Video service API key</li>
                            <li>- YouTube OAuth2</li>
                          </ul>
                        </li>
                        <li>Test each node individually</li>
                        <li>Run full workflow end-to-end</li>
                        <li>Activate workflow and set schedule</li>
                      </ol>
                    </div>

                    <div className="border-l-4 border-purple-500 pl-6 py-2">
                      <h4 className="text-lg font-semibold text-white mb-3">Step 7: Deploy & Monitor</h4>
                      <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
                        <li>Option A: Run n8n locally 24/7 (free but requires always-on computer)</li>
                        <li>Option B: Deploy to cloud:
                          <ul className="pl-6 mt-1 space-y-1">
                            <li>- Railway.app (free tier available)</li>
                            <li>- Render.com (free tier)</li>
                            <li>- DigitalOcean ($5/month droplet)</li>
                          </ul>
                        </li>
                        <li>Set up error notifications (email/Slack/Discord webhook)</li>
                        <li>Monitor Google Sheet for successful runs</li>
                        <li>Check YouTube channel for published videos</li>
                        <li>Adjust schedule and parameters based on results</li>
                      </ol>
                      <div className="bg-black/30 rounded p-3 mt-3 font-mono text-xs">
                        <div className="text-purple-400"># Deploy to Railway.app (example)</div>
                        <div className="text-gray-300">railway login</div>
                        <div className="text-gray-300">railway init</div>
                        <div className="text-gray-300">railway up</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Features */}
                <div className="bg-slate-900/70 rounded-lg p-6 border border-orange-500/20">
                  <h3 className="text-2xl font-semibold mb-4 text-orange-300">⚡ Advanced Features</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Error Handling</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Add Try-Catch nodes in n8n</li>
                        <li>• Retry failed API calls (3 attempts)</li>
                        <li>• Log errors to separate sheet tab</li>
                        <li>• Send alert notifications</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Content Quality</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• AI content moderation check</li>
                        <li>• Duplicate detection (compare with logs)</li>
                        <li>• Manual review queue option</li>
                        <li>• A/B test different prompts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">SEO Optimization</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Auto-generate optimized titles</li>
                        <li>• Create descriptions with keywords</li>
                        <li>• Add trending tags automatically</li>
                        <li>• Custom thumbnail generation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Analytics & Insights</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• Track video performance metrics</li>
                        <li>• Identify best-performing themes</li>
                        <li>• Optimize posting schedule</li>
                        <li>• Generate weekly reports</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 rounded-lg p-6 border border-green-500/30">
                  <h3 className="text-2xl font-semibold mb-4 text-green-300">💰 Cost Breakdown (Free Tier Limits)</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-green-500/30">
                          <th className="text-left py-2 text-white">Service</th>
                          <th className="text-left py-2 text-white">Free Tier</th>
                          <th className="text-left py-2 text-white">Cost After Free</th>
                          <th className="text-left py-2 text-white">Videos/Month</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-slate-700">
                          <td className="py-2">OpenAI GPT-3.5</td>
                          <td>$5 free credit</td>
                          <td>$0.002/1K tokens</td>
                          <td>~500 videos</td>
                        </tr>
                        <tr className="border-b border-slate-700">
                          <td className="py-2">Google Sheets</td>
                          <td>Unlimited</td>
                          <td>Free forever</td>
                          <td>Unlimited</td>
                        </tr>
                        <tr className="border-b border-slate-700">
                          <td className="py-2">ElevenLabs TTS</td>
                          <td>10K chars/month</td>
                          <td>$5/month (30K chars)</td>
                          <td>~20 videos</td>
                        </tr>
                        <tr className="border-b border-slate-700">
                          <td className="py-2">D-ID Video</td>
                          <td>20 videos/month</td>
                          <td>$5.90/month (50 videos)</td>
                          <td>20 videos</td>
                        </tr>
                        <tr className="border-b border-slate-700">
                          <td className="py-2">YouTube Upload</td>
                          <td>Unlimited</td>
                          <td>Free forever</td>
                          <td>Unlimited</td>
                        </tr>
                        <tr className="border-b border-slate-700">
                          <td className="py-2">n8n (self-hosted)</td>
                          <td>Free</td>
                          <td>Free (or $20/month cloud)</td>
                          <td>Unlimited</td>
                        </tr>
                        <tr className="font-semibold text-green-300">
                          <td className="py-2">TOTAL FREE</td>
                          <td colSpan={3}>~20 videos/month completely free</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Troubleshooting */}
                <div className="bg-slate-900/70 rounded-lg p-6 border border-red-500/20">
                  <h3 className="text-2xl font-semibold mb-4 text-red-300">🔧 Common Issues & Solutions</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 font-bold">Q:</span>
                      <div>
                        <p className="text-white font-semibold">n8n workflow fails at YouTube upload</p>
                        <p className="text-gray-300">A: Check OAuth2 tokens are not expired. Re-authenticate in n8n credentials. Ensure YouTube API is enabled in Google Cloud Console.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 font-bold">Q:</span>
                      <div>
                        <p className="text-white font-semibold">Audio generation takes too long</p>
                        <p className="text-gray-300">A: Add timeout to HTTP request nodes (300 seconds). Consider using faster TTS service or reduce audio length.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 font-bold">Q:</span>
                      <div>
                        <p className="text-white font-semibold">Google Sheets quota exceeded</p>
                        <p className="text-gray-300">A: Sheets API allows 60 requests/minute. Add delays between sheet operations or batch updates.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-red-400 font-bold">Q:</span>
                      <div>
                        <p className="text-white font-semibold">Video quality is poor</p>
                        <p className="text-gray-300">A: Increase video resolution in Remotion/D-ID settings. Use 1080p instead of 720p. Ensure audio bitrate is at least 192kbps.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resources */}
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-lg p-6 border border-purple-500/30">
                  <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <ExternalLink className="w-6 h-6" />
                    Helpful Resources
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-semibold text-purple-300 mb-2">Documentation</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• <a href="https://docs.n8n.io" className="text-blue-400 hover:underline">n8n Documentation</a></li>
                        <li>• <a href="https://platform.openai.com/docs" className="text-blue-400 hover:underline">OpenAI API Docs</a></li>
                        <li>• <a href="https://developers.google.com/sheets/api" className="text-blue-400 hover:underline">Google Sheets API</a></li>
                        <li>• <a href="https://developers.google.com/youtube/v3" className="text-blue-400 hover:underline">YouTube Data API v3</a></li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-pink-300 mb-2">Community</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• <a href="https://community.n8n.io" className="text-blue-400 hover:underline">n8n Community Forum</a></li>
                        <li>• <a href="https://discord.gg/n8n" className="text-blue-400 hover:underline">n8n Discord Server</a></li>
                        <li>• <a href="https://www.reddit.com/r/n8n" className="text-blue-400 hover:underline">r/n8n Subreddit</a></li>
                        <li>• YouTube tutorials for n8n automation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>Built with Next.js • Powered by n8n Automation • All tools use free tiers</p>
          <p className="mt-2">🤖 Automate creative content from idea to YouTube with zero infrastructure</p>
        </div>
      </div>
    </div>
  );
}
