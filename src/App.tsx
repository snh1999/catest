import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { createTheme, useMediaQuery } from "@mui/material";
import NavTab from "./body/navtab/NavTab";
import RequestList from "./body/navtab/RequestList";
import RequestTab from "./interfaces/Request";

// Define theme settings
const light = {
    palette: {
        mode: "light",
    },
};

const dark = {
    palette: {
        mode: "dark",
    },
};

function App() {
    // code for theme
    const preferedMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [theme, settheme] = useState(preferedMode);
    const initialTheme = createTheme({
        palette: {
            mode: theme ? "dark" : "light",
        },
    });
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settheme(event.target.checked);
    };

    // codes to refactor
    const [requests, setRequests] = useState<RequestTab[]>([]);

    const addRequest = (title: string) => {
        const newRequest: RequestTab = { title, id: requests.length };
        setRequests((prevState) => [...prevState, newRequest]);
    };

    const deleteRequest = (id: number) => {
        setRequests((prevState) => prevState.filter((req) => req.id !== id));
    };

    const updateRequest = (newRequest: RequestTab) => {
        setRequests((prevState) =>
            prevState.map((req) => (req.id === newRequest.id ? { ...req, title: newRequest.title } : req))
        );
    };

    const reroderRequests = (startIndex: number, endIndex: number) => {
        setRequests((prevState) => {
            const [dragItem] = prevState.splice(startIndex, 1);
            prevState.splice(endIndex, 0, dragItem);
            return prevState;
        });
    };

    return (
        <div className="container">
            <ThemeProvider theme={initialTheme}>
                {/* <ThemeChangeSwitch checked={theme} onChange={handleChange} /> */}
                {/* <TabContainer /> */}
                <NavTab addRequest={addRequest} />
                {requests && (
                    <RequestList
                        requests={requests}
                        deleteRequest={deleteRequest}
                        updateRequest={updateRequest}
                        reroderRequests={reroderRequests}
                    />
                )}
            </ThemeProvider>
        </div>
    );
}

export default App;
