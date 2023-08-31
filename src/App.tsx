import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

function Main() {
  return (
    <main>
      <div className="content">
        <Home />
      </div>
    </main>
  );
}

export default App;
