import MDEditor from "@uiw/react-md-editor";
import useThemeStore from "../../ts/store/themestore";

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
