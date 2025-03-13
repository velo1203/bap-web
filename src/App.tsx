import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { GlobalStyle } from "./Globalstyle";
import Main from "./components/Main";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <Main />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
