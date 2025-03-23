import ReactDOM from "react-dom/client";
import RootApp from "~/components/utils/root-app";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  ReactDOM.createRoot(rootElement).render(<RootApp />);
}
