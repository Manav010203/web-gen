export interface FileStructure {
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  children?: FileStructure[];
}

export interface GeneratedApp {
  name: string;
  description: string;
  structure: FileStructure[];
  techStack: string[];
  timestamp: number;
}
