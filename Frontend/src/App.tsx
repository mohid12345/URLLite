// App.js
import { BrowserRouter } from "react-router-dom";
import UserRouter from "./routes/UserRouter";
import { Provider } from "react-redux";
import store, { persistor } from "./Redux/store";
import { SnackbarProvider } from "./components/SnackbarProvider";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <SnackbarProvider>
            <UserRouter />
          </SnackbarProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;



// import { BrowserRouter } from "react-router-dom";
// import UserRouter from "./routes/UserRouter";
// import { Provider } from "react-redux";
// import store from "./Redux/store";
// import { SnackbarProvider } from "./components/SnackbarProvider";




// function App() {

//     return (
//         <>
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <SnackbarProvider>
//                         <UserRouter />
//                     </SnackbarProvider>
//                 </BrowserRouter>
//             </Provider>
//         </>
//     );
// }

// export default App;
