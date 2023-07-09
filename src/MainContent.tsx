import React, { useState } from "react";
import ThemeChangeSwitch from "./components/custom-toggle";
import { invoke } from "@tauri-apps/api";

function MainContent() {
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");

    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        if (name) {
            try {
                const response = await invoke<string>("send_request", { link: name });
                setGreetMsg(response);
            } catch (error) {
                console.log(error);
            }
        } else setGreetMsg(await invoke("greet", { link: name }));
    }
    return (
        <React.Fragment>
            <form
                className="row"
                onSubmit={(e) => {
                    e.preventDefault();
                    greet();
                }}
            >
                <input
                    id="greet-input"
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="Enter a name..."
                />
                <button type="submit">Greet</button>
            </form>

            <p>{greetMsg}</p>
        </React.Fragment>
    );
}

export default MainContent;
