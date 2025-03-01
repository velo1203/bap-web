import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { GlobalStyle } from "./Globalstyle";
import Main from "./components/Main";
function App() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Main />
        </ThemeProvider>
    );
}

export default App;
