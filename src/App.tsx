import { useState } from 'react';
import { PromptPage } from './pages/PromptPage';
import { StructurePage } from './pages/StructurePage';
import { generateAppStructure } from './services/gemini';
import type { GeneratedApp } from './types';
// import { GeneratedApp } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'prompt' | 'structure'>('prompt');
  const [generatedApp, setGeneratedApp] = useState<GeneratedApp | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (prompt: string) => {
    try {
      setError(null);
      const app = await generateAppStructure(prompt);
      setGeneratedApp(app);
      setCurrentPage('structure');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate application');
      throw err;
    }
  };

  const handleBack = () => {
    setCurrentPage('prompt');
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-red-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Error</h2>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setCurrentPage('prompt');
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentPage === 'prompt' && <PromptPage onGenerate={handleGenerate} />}
      {currentPage === 'structure' && generatedApp && (
        <StructurePage app={generatedApp} onBack={handleBack} />
      )}
    </>
  );
}

export default App;
