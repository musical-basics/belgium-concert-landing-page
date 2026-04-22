import { Fragment, type ReactNode } from "react";

// Parse `*word*` markers in a translated string into <em> elements.
// Keeps the dict a plain string while allowing italic emphasis (song titles,
// composer names) to render inline without JSX inside the dict.
export function renderEmphasis(text: string): ReactNode {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em key={i} className="font-serif italic font-medium">
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}
