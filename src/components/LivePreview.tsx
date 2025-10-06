import {  AlertCircle } from 'lucide-react';
// import { GeneratedApp } from '../types';
import { useEffect, useRef, useState } from 'react';
import type { GeneratedApp } from '../types';

interface LivePreviewProps {
  app: GeneratedApp;
}

export function LivePreview({ app }: LivePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const htmlFile = app.structure
        .flatMap(item => getAllFilesFlat(item))
        .find(file => file.name === 'index.html');

      if (!htmlFile || !htmlFile.content) {
        setError('No index.html file found in the generated structure');
        return;
      }

      const iframe = iframeRef.current;
      if (!iframe) return;

      const allFiles = app.structure.flatMap(item => getAllFilesFlat(item));

      let htmlContent = htmlFile.content;

      allFiles.forEach(file => {
        if (file.type === 'file' && file.content) {
          if (file.name.endsWith('.css')) {
            const cssTag = `<style>${file.content}</style>`;
            htmlContent = htmlContent.replace('</head>', `${cssTag}\n</head>`);
          } else if (file.name.endsWith('.js') && !file.name.includes('node_modules')) {
            const scriptTag = `<script type="module">${file.content}</script>`;
            htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);
          }
        }
      });

      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      iframe.src = url;

      return () => URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate preview');
    }
  }, [app]);

  if (error) {
    return (
      <div className="h-full bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center p-12">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-orange-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Preview Not Available</h3>
        <p className="text-slate-600 text-center max-w-md">{error}</p>
        <p className="text-sm text-slate-500 mt-4">
          Note: Complex applications with build steps or external dependencies may not preview correctly.
        </p>
      </div>
    );
  }

  return (
    <>
    <div>Workd under progress</div>
    </>
  );
}

function getAllFilesFlat(item: any): any[] {
  const files = [];
  if (item.type === 'file') {
    files.push(item);
  }
  if (item.children) {
    for (const child of item.children) {
      files.push(...getAllFilesFlat(child));
    }
  }
  return files;
}
