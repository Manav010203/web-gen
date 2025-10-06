import { useState } from 'react';
import { ArrowLeft, Layers, Code2, Package, Eye, Monitor } from 'lucide-react';
// import { GeneratedApp, FileStructure } from '../types';
import { FileTree } from '../components/FileTree';
import { CodePreview } from '../components/CodePreview';
// import { LivePreview } from '../components/LivePreview';
import type { FileStructure, GeneratedApp } from '../types';

interface StructurePageProps {
  app: GeneratedApp;
  onBack: () => void;
}

export function StructurePage({ app, onBack }: StructurePageProps) {
  const [selectedFile, setSelectedFile] = useState<FileStructure | null>(null);
  const [view, setView] = useState<'tree' | 'list' | 'preview'>('tree');

  const handleFileClick = (file: FileStructure) => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };

  const allFiles = getAllFiles(app.structure);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <div className="h-8 w-px bg-slate-200"></div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{app.name}</h1>
                <p className="text-sm text-slate-600 mt-0.5">{app.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {app.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex bg-slate-100 rounded-lg p-1">
                <button
                  onClick={() => setView('tree')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'tree'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tree View
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    view === 'list'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Files
                </button>
                <button
                  
                >
                  <Monitor className="w-4 h-4" />
                  Live preview(work under progress)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 py-8">
        {view === 'preview' ? (
          <div className="h-[calc(100vh-180px)]">
            {/* <LivePreview app={app} /> */}
          </div>
        ) : view === 'tree' ? (
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-180px)]">
            <div className="col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="px-4 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 text-slate-900">
                  <Layers className="w-5 h-5" />
                  <h2 className="font-semibold">Project Structure</h2>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <FileTree
                  structure={app.structure}
                  onFileClick={handleFileClick}
                  selectedFile={selectedFile}
                />
              </div>
            </div>

            <div className="col-span-9 flex flex-col">
              {selectedFile ? (
                <CodePreview
                  fileName={selectedFile.name}
                  filePath={selectedFile.path}
                  content={selectedFile.content || '// No content available'}
                />
              ) : (
                <div className="h-full bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center p-12 text-center">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <Code2 className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    Select a file to view its code
                  </h3>
                  <p className="text-slate-600 max-w-md">
                    Click on any file in the project structure to preview its generated code
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-lg">
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <Package className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-sm font-medium text-slate-900">
                        {getTotalFiles(app.structure)} Files
                      </p>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                      <Layers className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-sm font-medium text-slate-900">
                        {getTotalFolders(app.structure)} Folders
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {allFiles.map((file) => (
              <div
                key={file.path}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900">{file.name}</h3>
                    <p className="text-sm text-slate-600 mt-0.5">{file.path}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFile(file);
                      setView('tree');
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    Preview Code
                  </button>
                </div>
                <div className="px-6 py-4 bg-slate-900 max-h-64 overflow-auto">
                  <pre className="text-sm text-slate-100 leading-relaxed">
                    <code>{file.content || '// No content available'}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function getTotalFiles(structure: FileStructure[]): number {
  let count = 0;
  for (const item of structure) {
    if (item.type === 'file') {
      count++;
    } else if (item.children) {
      count += getTotalFiles(item.children);
    }
  }
  return count;
}

function getTotalFolders(structure: FileStructure[]): number {
  let count = 0;
  for (const item of structure) {
    if (item.type === 'folder') {
      count++;
      if (item.children) {
        count += getTotalFolders(item.children);
      }
    }
  }
  return count;
}

function getAllFiles(structure: FileStructure[]): FileStructure[] {
  const files: FileStructure[] = [];
  for (const item of structure) {
    if (item.type === 'file') {
      files.push(item);
    } else if (item.children) {
      files.push(...getAllFiles(item.children));
    }
  }
  return files;
}
