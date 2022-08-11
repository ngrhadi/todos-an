import { useEffect, useState } from "react";
import I_tambah from "../icons/tambah.png";
import I_home from "../icons/home.png";
import I_trash from "../icons/trash.png";
import { URL_POST_TODO, URL_TODOS, useTodos } from "../hooks/useTodos";
import { QueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Alert, Modal } from "bootstrap";
import { Link } from "react-router-dom";
import TodoActivity from "./TodoActivity";
import { Card, Spinner } from "react-bootstrap";
import ModalDelete from "../components/ModalDelete";

const Home = () => {
	const [todo, setTodo] = useState([]);
	const queryClient = new QueryClient();
	const [publishTodo, setPublishTodo] = useState(false);
	const [detailsTodo, setDetailsTodo] = useState(false);
	const [modalDeleteTodo, setModalDeleteTodo] = useState(false);
	const [deleteTodo, setDeleteTodo] = useState(false);

	const { data, isError, isLoading, isSuccess } = useTodos();

	useEffect(() => {
		if (data) {
			setTodo(data);
		} else {
			setTodo([]);
		}
	}, [data]);

	const showFormatDate = (tanggal) => {
		const dateFormat = new Date(tanggal);
		const month = dateFormat.getMonth() + 1;
		const date = dateFormat.getDate();
		const year = dateFormat.getFullYear();

		if (month === 1) {
			return `${date} Januari ${year}`;
		} else if (month === 2) {
			return `${date} Februari ${year}`;
		} else if (month === 3) {
			return `${date} Maret ${year}`;
		} else if (month === 4) {
			return `${date} April ${year}`;
		} else if (month === 5) {
			return `${date} Mei ${year}`;
		} else if (month === 6) {
			return `${date} Juni ${year}`;
		} else if (month === 7) {
			return `${date} Juli ${year}`;
		} else if (month === 8) {
			return `${date} Agustus ${year}`;
		} else if (month === 9) {
			return `${date} September ${year}`;
		} else if (month === 10) {
			return `${date} Oktober ${year}`;
		} else if (month === 11) {
			return `${date} November ${year}`;
		} else if (month === 12) {
			return `${date} Desember ${year}`;
		} else {
			return "";
		}
	};

	const addTodos = async () => {
		// const id = Math.floor(Math.random() * 1000000);
		const data = {
			title: `New Activity`,
		};
		setPublishTodo(true);
		const response = await axios.post(URL_POST_TODO, data);
		if (response.status === 201) {
			setTimeout(() => {
				setPublishTodo(false);
			}, 1000);
		}
	};

	const deleteTodos = useMutation((id) => axios.delete(`${URL_TODOS}/${id}`), {
		onSuccess: () => {
			setDeleteTodo(false);
		},
		onError: () => {
			setDeleteTodo(false);
		},
	});

	const handleDeleteTodo = (id) => {
		setModalDeleteTodo(true);
		setDeleteTodo(true);
		deleteTodos.mutate(id);
	};

	return (
		<div className="container">
			<div className="App-body">
				<div className="App-body-header">
					Activity
					<button className="App-body-header-button" onClick={addTodos}>
						{publishTodo ? (
							<Spinner animation="border" variant="light" />
						) : (
							<span className="Icon-tambah">
								<img src={I_tambah} alt="tambah" height="15px" />
							</span>
						)}
						<div className="App-body-button-text">Tambah</div>
					</button>
				</div>
			</div>
			{isError && <div>Error</div>}
			{!todo && (
				<div className="Icon-Home">
					<img src={I_home} alt="home" width={"767px"} />
				</div>
			)}
			<div className="App-body-content">
				{todo.map((item, index) => {
					return (
						<Link
							to={`/detail-todo/${item.id}`}
							key={index}
							className="text-decoration-none">
							<div className="App-body-content-item" key={index}>
								<div className="App-body-content-item-header">
									<div className="App-body-content-item-header-title">
										{item.title}
									</div>
								</div>
								<div className="App-body-content-delete">
									<div className="App-body-content-item-header-date">
										{showFormatDate(item.created_at).toString()}
									</div>
									<button
										className="App-body-content-delete-button"
										onClick={handleDeleteTodo}>
										{/* <Link to={"/"} className="text-decoration-none"> */}
										<span>
											<img
												src={I_trash}
												alt="tambah"
												width={14}
												height={14}
												className="mx-1"
											/>
										</span>
										{/* </Link> */}
									</button>
								</div>
							</div>
						</Link>
					);
				})}
				{detailsTodo ? <TodoActivity data-cy={data} /> : null}
				{modalDeleteTodo && <ModalDelete />}
			</div>
		</div>
	);
};

export default Home;
