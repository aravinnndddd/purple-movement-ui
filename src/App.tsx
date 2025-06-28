import Home from "./HomePage";
import LoadingScreen from "./components/LoadingScreen"
export default function App() {
  return (
    <>
      <div>
        <LoadingScreen/>
          <Home />
        </div>
    </>
  );
}
