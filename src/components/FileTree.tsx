import { useState } from 'react';
import { FileCode, Folder, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';
import type { FileStructure } from '../types';
// import { FileStructure } from '../types';

interface FileTreeProps {
  structure: FileStructure[];
  onFileClick: (file: FileStructure) => void;
  selectedFile: FileStructure | null;
}

export function FileTree({ structure, onFileClick, selectedFile }: FileTreeProps) {
  return (
    <div className="space-y-1">
      {structure.map((item) => (
        <FileTreeItem
          key={item.path}
          item={item}
          onFileClick={onFileClick}
          selectedFile={selectedFile}
          level={0}
        />
      ))}
    </div>
  );
}

interface FileTreeItemProps {
  item: FileStructure;
  onFileClick: (file: FileStructure) => void;
  selectedFile: FileStructure | null;
  level: number;
}

function FileTreeItem({ item, onFileClick, selectedFile, level }: FileTreeItemProps) {
  const [isOpen, setIsOpen] = useState(level < 2);

  const isSelected = selectedFile?.path === item.path;

  if (item.type === 'file') {
    return (
      <button
        onClick={() => onFileClick(item)}
        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-left ${
          isSelected
            ? 'bg-blue-100 text-blue-900'
            : 'hover:bg-slate-100 text-slate-700'
        }`}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
      >
        <FileCode className="w-4 h-4 flex-shrink-0" />
        <span className="text-sm font-medium truncate">{item.name}</span>
      </button>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors text-left text-slate-700"
        style={{ paddingLeft: `${level * 20 + 12}px` }}
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
        )}
        {isOpen ? (
          <FolderOpen className="w-4 h-4 flex-shrink-0 text-blue-600" />
        ) : (
          <Folder className="w-4 h-4 flex-shrink-0 text-blue-600" />
        )}
        <span className="text-sm font-semibold">{item.name}</span>
      </button>
      {isOpen && item.children && (
        <div className="mt-1">
          {item.children.map((child) => (
            <FileTreeItem
              key={child.path}
              item={child}
              onFileClick={onFileClick}
              selectedFile={selectedFile}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
