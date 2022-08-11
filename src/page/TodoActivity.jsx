import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import TodosForm from "../components/TodosForm";
import { getTodoByID, URL_LIST_TODOS, URL_POST_TODO } from "../hooks/useTodos";
import I_tambah from "../icons/tambah.png";
import I_trash from "../icons/trash.png";

const TodoActivity = (props) => {
	const [todoTitle, setTodoTitle] = useState("");
	const [isActiveTodo, setIsActiveTodo] = useState(0);
	const [isPriorityTodo, setIsPriorityTodo] = useState({
		very_high: false,
		high: false,
		medium: false,
		low: false,
		very_low: false,
	});
	const [modalAddTodo, setModalAddTodo] = useState(false);
	const { id } = useParams();
	const { data, isLoading, isError, isSuccess } = useQuery(
		["todos", { id }],
		getTodoByID,
		{
			initialData: {
				id: "",
				title: "",
				todo_items: [
					{
						id: "",
						title: todoTitle,
						activity_group_id: id,
						isActive: isActiveTodo,
						priority: isPriorityTodo,
					},
				],
			},
			refetchInterval: 1000,
		},
	);

	const addListTodo = useMutation(
		(newListTodo) => {
			axios.post(`${URL_LIST_TODOS}`, newListTodo);
		},
		{
			onSuccess: (data) => {
				console.log(data);
			},
			onError: (error) => {
				console.log(error);
			},
			onSettled: (data) => {
				console.log(data);
			},
		},
	);
	console.log(data);

	const handleAddListTodo = (e) => {
		e.preventDefault();
		setModalAddTodo(true);
		const newListTodo = {
			title: e.target.title.value,
			activity_group_id: e.target.activity_group_id.value,
			isActive: e.target.isActive.value,
			priority: e.target.priority.value,
		};
		addListTodo.mutate(newListTodo);

		e.target.reset();
	};

	return (
		<>
			<div className="container">
				<div className="App-body">
					<div className="App-body-header">
						<span>
							<Link to={"/"} className="text-decoration-none text-dark me-4">
								{"<"}
							</Link>
							New Activity
						</span>
						<button
							className="App-body-header-button"
							onClick={handleAddListTodo}>
							<span className="Icon-tambah">
								<img src={I_tambah} alt="tambah" height="15px" />
							</span>
							<div className="App-body-button-text">Tambah</div>
						</button>
					</div>

					{data && !modalAddTodo && (
						<TodosForm
							title={todoTitle}
							isActive={isActiveTodo}
							isPriority={isPriorityTodo}
						/>
					)}
				</div>
				{data.todo_items !== null &&
					data.todo_items.map((todo) => (
						<div className="App-body-content-list mx-lg-5" key={todo.id}>
							<div className="App-body-content-item-list">
								<div className="d-flex align-items-center form-check">
									<input type="checkbox" className="form-check-input" />
									{/* {todo.isActive === 1 ? () : ()} */}
									<div className="App-body-content-item-list-status">
										<div className="status-prioity" />
									</div>
									<div className="App-body-content-item-list-title">
										{todo.title}
									</div>
								</div>
								<span className="text-end pointer-event ">
									<img
										src={I_trash}
										alt="tambah"
										width={14}
										height={14}
										className="mx-1"
									/>
								</span>
							</div>
						</div>
					))}
			</div>
			{modalAddTodo && (
				<div className="modal-dialog modal-md modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Tambah Todo</h5>
							<button
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close"
								onClick={() => setModalAddTodo(false)}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<div className="form-check">
								<ul className="dropdown-menu">
									<li className="dropdown-item">
										<input
											type="checkbox"
											className="form-check-input"
											id="exampleCheck1"
											value={isPriorityTodo.very_high}
										/>
										<label className="form-check-label" htmlFor="exampleCheck1">
											Very High
										</label>
									</li>

									<li className="dropdown-item">
										<input
											type="checkbox"
											className="form-check-input"
											id="exampleCheck2"
											value={isPriorityTodo.high}
										/>
										<label className="form-check-label" htmlFor="exampleCheck2">
											High
										</label>
									</li>

									<li className="dropdown-item">
										<input
											type="checkbox"
											className="form-check-input"
											id="exampleCheck3"
											value={isPriorityTodo.medium}
										/>
										<label className="form-check-label" htmlFor="exampleCheck3">
											Medium
										</label>
									</li>
									<li className="dropdown-item">
										<input
											type="checkbox"
											className="form-check-input"
											id="exampleCheck4"
											value={isPriorityTodo.low}
										/>
										<label className="form-check-label" htmlFor="exampleCheck4">
											Low
										</label>
									</li>
									<li className="dropdown-item">
										<input
											type="checkbox"
											className="form-check-input"
											id="exampleCheck5"
											value={isPriorityTodo.very_low}
										/>
										<label className="form-check-label" htmlFor="exampleCheck5">
											Very Low
										</label>
									</li>
								</ul>
							</div>
						</div>
						<div className="modal-footer">
							<button
								type="button"
								className="btn btn-secondary"
								data-dismiss="modal"
								onClick={() => setModalAddTodo(false)}>
								Close
							</button>
							<button
								type="button"
								className="btn btn-primary"
								onClick={handleAddListTodo}>
								Save changes
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default TodoActivity;
