export function formatGo(code: string): { code: string; error?: string } {
  const t0 = code.trim();
  if (!t0) return { code, error: 'empty file' };
  const open = (code.match(/{/g) || []).length;
  const close = (code.match(/}/g) || []).length;
  if (open !== close) return { code, error: `mismatched braces { ${open} vs } ${close}` };

  let s = code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(l => l.replace(/\s+$/g, ''))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trimEnd() + '\n';

  if (s.includes('fmt.') && !s.includes('"fmt"') && s.includes('import')) {
    s = s.replace(/import\s*\(\s*\n/, m => m + '  "fmt"\n');
    if (!s.includes('"fmt"')) {
      s = s.replace(/import\s+"([^"]+)"/, 'import (\n  "fmt"\n  "$1"\n)');
    }
  }
  if (s.includes('fmt.') && !s.includes('import')) {
    s = s.replace('package main', 'package main\n\nimport "fmt"');
  }
  if (!s.startsWith('package ')) {
    return { code: s, error: 'missing package clause — added package main is required' };
  }
  return { code: s };
}
