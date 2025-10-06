// import { GeneratedApp } from '../types';

import type { GeneratedApp } from "../types";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';


export async function generateAppStructure(prompt: string): Promise<GeneratedApp> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file');
  }

  const systemPrompt = `You are an expert web application architect. Generate a complete, production-ready web application structure based on the user's request.

Return your response as valid JSON with this exact structure:
{
  "name": "app-name",
  "description": "brief description",
  "techStack": ["React", "TypeScript", "etc"],
  "structure": [
    {
      "name": "src",
      "type": "folder",
      "path": "src",
      "children": [
        {
          "name": "App.tsx",
          "type": "file",
          "path": "src/App.tsx",
          "content": "// Complete file content here"
        }
      ]
    }
  ]
}

Include:
- Complete folder structure (src, public, components, utils, etc)
- All necessary files with actual code content
- Configuration files (package.json, tsconfig.json, etc)
- At least 8-15 files for a realistic application
- Modern best practices and patterns

User request: ${prompt}`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 8000,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate application structure');
    }

    const data = await response.json();
    const textContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textContent) {
      throw new Error('No response from Gemini API');
    }

    const jsonMatch = textContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from response');
    }

    const parsedData = JSON.parse(jsonMatch[0]);

    return {
      name: parsedData.name,
      description: parsedData.description,
      structure: parsedData.structure,
      techStack: parsedData.techStack || [],
      timestamp: Date.now(),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while generating the application');
  }
}
