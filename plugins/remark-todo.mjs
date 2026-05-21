/**
 * remark-todo — turns `{{ TODO }}` / `{{ TODO: note }}` text markers found in
 * Markdown into styled inline spans, so planning placeholders stand out.
 *
 * Written as a manual tree walk to avoid pulling in `unist-util-visit`.
 */
const TODO_SPLIT = /(\{\{\s*TODO[^}]*\}\})/gi;
const TODO_MATCH = /^\{\{\s*TODO\s*:?\s*([^}]*?)\s*\}\}$/i;

export function remarkTodo() {
  return (tree) => {
    walk(tree);
  };
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    if (child.type === 'text' && TODO_SPLIT.test(child.value)) {
      const parts = child.value.split(TODO_SPLIT).filter((p) => p !== '');
      const replacement = parts.map((part) => {
        const match = part.match(TODO_MATCH);
        if (!match) return { type: 'text', value: part };
        const note = match[1] ? ` ${escapeHtml(match[1])}` : '';
        return {
          type: 'html',
          value: `<span class="todo-marker">TODO${note}</span>`,
        };
      });
      node.children.splice(i, 1, ...replacement);
      i += replacement.length - 1;
    } else {
      walk(child);
    }
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
