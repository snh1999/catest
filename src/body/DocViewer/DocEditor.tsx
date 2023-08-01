import MDEditor from "@uiw/react-md-editor";
import useThemeStore from "../../ts/store/themestore";

const str = `
### Preview Markdown

\`\`\`jsx
import React from "react";
import ReactDOM from "react-dom";
import MDEditor from '@uiw/react-md-editor';

export default function App() {
  return (
    <div className="container">
      <MDEditor.Markdown source="Hello Markdown!" />
    </div>
  );
}
\`\`\`
`;

export default function DocEditor({ documentation }: { documentation: string }) {
    const isDarkTheme = useThemeStore((store) => store.isDarkTheme);

    return (
        <>
            <div data-color-mode={isDarkTheme ? "dark" : "light"}>
                <MDEditor.Markdown style={{ padding: "20px" }} source={documentation} />
            </div>
        </>
    );
}
