import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface CodePreviewProps {
  fileName: string;
  filePath: string;
  content: string;
}

export function CodePreview({ fileName, filePath, content }: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
        <div>
          <h3 className="text-white font-semibold">{fileName}</h3>
          <p className="text-slate-400 text-sm mt-0.5">{filePath}</p>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <pre className="p-6 text-sm text-slate-100 leading-relaxed">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
}
