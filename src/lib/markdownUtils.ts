/**
 * Parse custom components in markdown content and convert them to a format that can be
 * rendered by ReactMarkdown with custom renderers
 */
export function parseCustomComponents(content: string): string {
  // Replace self-closing <subpage> tags (from database entries)
  content = content.replace(
    /<subpage id="([^"]+)" title="([^"]+)" \/>/g,
    (_, id, title) => {
      return `## <span data-subpage-id="${id}" data-subpage-title="${title}">${title}</span>`;
    }
  );

  // Replace paired <subpage> tags (for future use)
  content = content.replace(
    /<subpage id="([^"]+)" title="([^"]+)">(.*?)<\/subpage>/g, 
    (_, id, title, text) => {
      return `## <span data-subpage-id="${id}" data-subpage-title="${title}">${text}</span>`;
    }
  );

  return content;
}
