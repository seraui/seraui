import fs from "fs";
import path from "path";
import { glob } from "glob";

const docsPath = path.join(__dirname, "../app/docs");
const publicPath = path.join(__dirname, "../../public");
const mdOutputPath = path.join(publicPath, "docs-md");

// Ensure the output directory exists
if (!fs.existsSync(mdOutputPath)) {
  fs.mkdirSync(mdOutputPath, { recursive: true });
}

interface MdxFile {
  path: string;
  content: string;
  relativePath: string;
  urlPath: string;
}

/**
 * Converts MDX content to plain Markdown by removing:
 * - React imports
 * - Export statements
 * - JSX components and replacing with markdown equivalents
 * - Metadata exports
 */
function convertMdxToMd(content: string, componentPath: string): string {
  let mdContent = content;

  // Remove export statements for metadata
  mdContent = mdContent.replace(/^export\s+const\s+metadata\s*=\s*{[\s\S]*?};/gm, '');
  
  // Remove import statements
  mdContent = mdContent.replace(/^import\s+.*?from\s+.*?;?\s*$/gm, '');
  
  // Remove JSX component imports that are on separate lines
  mdContent = mdContent.replace(/^import\s+.*?\{[\s\S]*?\}\s+from\s+.*?;?\s*$/gm, '');
  
  // Convert JSX components to markdown equivalents
  
  // Convert <AI dir="left"/> to nothing (remove it)
  mdContent = mdContent.replace(/<AI\s+dir="[^"]*"\s*\/>/g, '');
  
  // Convert complex <Tabs> components to simple markdown
  mdContent = mdContent.replace(
    /<Tabs[^>]*>[\s\S]*?<TabsContent\s+value="preview"[^>]*>([\s\S]*?)<\/TabsContent>[\s\S]*?<TabsContent\s+value="code"[^>]*>([\s\S]*?)<\/TabsContent>[\s\S]*?<\/Tabs>/g,
    (match, previewContent, codeContent) => {
      // Extract component renderer if present
      const componentMatch = previewContent.match(/<ComponentRenderer[^>]*\/>/);
      const codeBlockMatch = codeContent.match(/<CodeBlock\s+filePath="([^"]+)"\s*\/>/);
      
      let result = '## Preview\n\n';
      if (componentMatch) {
        result += 'Interactive component preview available in the web version.\n\n';
      }
      
      result += '## Code\n\n';
      if (codeBlockMatch) {
        const filePath = codeBlockMatch[1];
        result += `See implementation in: \`${filePath}\`\n\n`;
      }
      
      return result;
    }
  );
  
  // Convert simple <PMTabs> to markdown
  mdContent = mdContent.replace(
    /<PMTabs>([\s\S]*?)<\/PMTabs>/g,
    (match, content) => {
      // Extract tab contents
      const npmMatch = content.match(/<NPMTabContent>([\s\S]*?)<\/NPMTabContent>/);
      const pnpmMatch = content.match(/<PNPMTabContent>([\s\S]*?)<\/PNPMTabContent>/);
      const yarnMatch = content.match(/<YarnTabContent>([\s\S]*?)<\/YarnTabContent>/);
      const bunMatch = content.match(/<BunTabContent>([\s\S]*?)<\/BunTabContent>/);
      
      let result = '';
      
      if (npmMatch) {
        result += '### NPM\n' + npmMatch[1].trim() + '\n\n';
      }
      if (pnpmMatch) {
        result += '### PNPM\n' + pnpmMatch[1].trim() + '\n\n';
      }
      if (yarnMatch) {
        result += '### Yarn\n' + yarnMatch[1].trim() + '\n\n';
      }
      if (bunMatch) {
        result += '### Bun\n' + bunMatch[1].trim() + '\n\n';
      }
      
      return result;
    }
  );
  
  // Convert <Cli> component to code block
  mdContent = mdContent.replace(
    /<Cli\s+command=\{`([^`]+)`\}\s*\/>/g,
    '```bash\nnpx shadcn@latest $1\n```'
  );
  
  // Convert <CodeBlock> to a reference
  mdContent = mdContent.replace(
    /<CodeBlock\s+filePath="([^"]+)"\s*\/>/g,
    'Code available at: `$1`'
  );
  
  // Convert <ComponentRenderer> to a description
  mdContent = mdContent.replace(
    /<ComponentRenderer[^>]*\/>/g,
    '*Interactive component preview available in the web version.*'
  );
  
  // Remove any remaining JSX tags and convert to markdown where possible
  mdContent = mdContent.replace(/<[^>]+>/g, '');
  
  // Clean up extra whitespace
  mdContent = mdContent.replace(/\n\s*\n\s*\n/g, '\n\n');
  mdContent = mdContent.trim();
  
  // Add component path reference
  const pathReference = `\n\n---\n\n**Component Path:** \`${componentPath}\`\n\n**Web Version:** Visit the interactive version at the corresponding URL on the Sera UI documentation site for live previews and interactive examples.\n`;
  
  return mdContent + pathReference;
}

/**
 * Finds all MDX files in the docs directory
 */
async function findMdxFiles(): Promise<MdxFile[]> {
  const pattern = path.join(docsPath, "**/page.mdx").replace(/\\/g, '/');
  const files = await glob(pattern);
  
  return files.map(filePath => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(docsPath, filePath);
    // Extract component name from path (remove \page.mdx and normalize slashes)
    const urlPath = relativePath.replace(/\\page\.mdx$/, '').replace(/\/page\.mdx$/, '').replace(/\\/g, '/');
    
    return {
      path: filePath,
      content,
      relativePath,
      urlPath
    };
  });
}

/**
 * Main function to convert all MDX files to MD
 */
async function buildMdFiles(): Promise<void> {
  console.log('🚀 Starting MD file generation from MDX files...');
  
  try {
    const mdxFiles = await findMdxFiles();
    console.log(`📁 Found ${mdxFiles.length} MDX files to convert`);
    
    // Create index of all generated MD files
    const mdIndex: Array<{
      name: string;
      path: string;
      url: string;
      originalMdx: string;
    }> = [];
    
    for (const mdxFile of mdxFiles) {
      try {
        const mdContent = convertMdxToMd(mdxFile.content, mdxFile.relativePath);
        
        // Create the output path with clean naming that matches the URL structure
        let cleanName;
        if (mdxFile.urlPath === '') {
          cleanName = 'index';
        } else {
          // Use the direct component name from URL path, replace slashes with dashes for flat structure
          cleanName = mdxFile.urlPath.replace(/\//g, '-');
        }
        
        const outputFileName = `${cleanName}.md`;
        
        // Ensure output directory exists
        if (!fs.existsSync(mdOutputPath)) {
          fs.mkdirSync(mdOutputPath, { recursive: true });
        }
        
        const outputPath = path.join(mdOutputPath, outputFileName);
        
        // Write the MD file
        fs.writeFileSync(outputPath, mdContent, 'utf-8');
        
        // Add to index
        mdIndex.push({
          name: mdxFile.urlPath || 'docs',
          path: `/docs/${outputFileName}`,
          url: `/docs/${mdxFile.urlPath}`,
          originalMdx: mdxFile.relativePath
        });
        
        console.log(`✅ Generated: ${outputFileName} (from ${mdxFile.relativePath})`);
      } catch (error) {
        console.error(`❌ Error processing ${mdxFile.relativePath}:`, error);
      }
    }
    
    // Write the index file
    const indexContent = {
      generatedAt: new Date().toISOString(),
      totalFiles: mdIndex.length,
      files: mdIndex.sort((a, b) => a.name.localeCompare(b.name))
    };
    
    fs.writeFileSync(
      path.join(mdOutputPath, 'index.json'),
      JSON.stringify(indexContent, null, 2),
      'utf-8'
    );
    
    // Create a README for the MD directory
    const readmeContent = `# Sera UI Documentation - Markdown Files

This directory contains auto-generated Markdown versions of all MDX documentation pages.

**Generated at:** ${new Date().toISOString()}
**Total files:** ${mdIndex.length}

## Available Files

${mdIndex.map(file => `- [${file.name}](${file.path}) - Source: \`${file.originalMdx}\``).join('\n')}

## Usage

You can access these files directly via URL:
- Base URL: \`/docs/{filename}.md\`
- Example: \`/docs/button.md\` for the button component documentation

## Note

These are simplified Markdown versions of the original MDX files. For the full interactive experience with live code previews, visit the original documentation pages.
`;
    
    fs.writeFileSync(path.join(mdOutputPath, 'README.md'), readmeContent, 'utf-8');
    
    console.log(`🎉 Successfully generated ${mdIndex.length} MD files!`);
    console.log(`📋 Index written to: /public/docs-md/index.json`);
    console.log(`📖 README written to: /public/docs-md/README.md`);
    
  } catch (error) {
    console.error('💥 Error during MD generation:', error);
    process.exit(1);
  }
}

// Run the script
buildMdFiles().catch(console.error);