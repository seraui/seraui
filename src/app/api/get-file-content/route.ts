import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');

    if (!filePath) {
      return NextResponse.json({ error: 'File path is required' }, { status: 400 });
    }

    // Security: Only allow reading files from the pattern directory
    if (!filePath.includes('src/app/docs/pattern/') || filePath.includes('..')) {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }

    // Resolve the file path relative to the project root
    const fullPath = join(process.cwd(), filePath);
    
    // Read the file content
    const content = await readFile(fullPath, 'utf-8');
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
