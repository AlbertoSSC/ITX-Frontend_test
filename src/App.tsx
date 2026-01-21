import { CartProvider } from "./context/CartContext";
import { AppRouter } from "./router";
import "./index.css";

function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;
