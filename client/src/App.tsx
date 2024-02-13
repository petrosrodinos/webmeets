import { BrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation/index.tsx";
import Router from "./router/index.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation>
          <Router />
        </Navigation>
      </BrowserRouter>
    </>
  );
}

export default App;
