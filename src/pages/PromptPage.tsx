import { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface PromptPageProps {
  onGenerate: (prompt: string) => Promise<void>;
}

export function PromptPage({ onGenerate }: PromptPageProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    try {
      await onGenerate(prompt);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            AI Web App Builder
          </h1>
          <p className="text-xl text-slate-600">
            Describe your web application idea and let AI generate the complete structure
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          <label htmlFor="prompt" className="block text-sm font-semibold text-slate-700 mb-3">
            What would you like to build?
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: A task management app with user authentication, drag-and-drop functionality, and real-time collaboration features..."
            className="w-full h-48 px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none text-slate-900 placeholder:text-slate-400"
            disabled={isGenerating}
          />

          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-slate-500">
              Be as detailed as possible for better results
            </p>
            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate App
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold text-slate-900 mb-1">Complete Structure</h3>
            <p className="text-sm text-slate-600">Full file and folder organization</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="text-3xl mb-2">💻</div>
            <h3 className="font-semibold text-slate-900 mb-1">Code Preview</h3>
            <p className="text-sm text-slate-600">View generated code for each file</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-slate-900 mb-1">Powered by Gemini</h3>
            <p className="text-sm text-slate-600">Google's advanced AI model</p>
          </div>
        </div>
      </div>
    </div>
  );
}
