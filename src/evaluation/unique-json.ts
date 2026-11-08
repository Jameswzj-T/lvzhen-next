export class DuplicateJsonKeyError extends SyntaxError {
  constructor() {
    super("duplicate_json_key");
  }
}

/** Validate JSON normally, then reject keys that JSON.parse would overwrite. */
export function parseUniqueJson(text: string): unknown {
  const value: unknown = JSON.parse(text);
  const objects: Set<string>[] = [];
  // Strings are consumed whole, so escaped quotes/braces cannot alter nesting.
  const tokens = /"(?:[^"\\]|\\[\s\S])*"|[{}]/g;
  for (const match of text.matchAll(tokens)) {
    const token = match[0];
    if (token === "{") objects.push(new Set());
    else if (token === "}") objects.pop();
    else {
      let next = match.index + token.length;
      while (/\s/.test(text[next] ?? "") && next < text.length) next++;
      if (text[next] !== ":") continue;
      const key: string = JSON.parse(token);
      const keys = objects.at(-1)!;
      if (keys.has(key)) throw new DuplicateJsonKeyError();
      keys.add(key);
    }
  }
  return value;
}
