import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import MacWindow from "./MacWindow";

const Note = ({windowName, activeWindow, setActiveWindow}) => {
  const [markdown, setMarkdown] = useState(null);

  useEffect(() => {
    fetch("/note.txt")
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div>
      <MacWindow windowName={windowName} activeWindow={activeWindow} setActiveWindow={setActiveWindow}>
        <div className="note-window">
          {markdown ? (
            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              wrapLongLines={true}
            >
              {markdown}
            </SyntaxHighlighter>
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>
      </MacWindow>
    </div>
  );
};

export default Note;
