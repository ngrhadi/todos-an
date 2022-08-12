import Home from "./page/Home";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Header from "./page/Header";
import "bootstrap/dist/css/bootstrap.css";
import TodoActivity from "./page/TodoActivity";
import ModalDelete from "./components/ModalDelete";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" exact element={<Home />} />
				<Route path="/detail-todo/:id" exact element={<TodoActivity />} />
				<Route path="/delete-todo/:id" element={<ModalDelete />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
