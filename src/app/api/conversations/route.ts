import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Read the JSON file from the public directory
    const filePath = path.join(process.cwd(), 'public', 'Mock Data.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const conversations = JSON.parse(fileContent);
    
    return NextResponse.json(conversations);
  } catch (error) {
    console.error('Error reading conversation data:', error);
    return NextResponse.json(
      { error: 'Failed to load conversation data' },
      { status: 500 }
    );
  }
} 