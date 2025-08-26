import { BrowserRouter } from "react-router-dom";

import UserRouter from "./routes/UserRouter";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { SnackbarProvider } from "./components/SnackbarProvider";

function App() {
    return (
        <>
            <Provider store={store}>
                <BrowserRouter>
                    <SnackbarProvider>
                        <UserRouter />
                    </SnackbarProvider>
                </BrowserRouter>
            </Provider>
        </>
    );
}

export default App;
