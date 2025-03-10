import ReactDOM from "react-dom/client";
import Root from "~/components/utils/root";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(<Root />);
}
