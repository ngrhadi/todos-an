import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import TodosForm from "../components/TodosForm";
import { getTodoByID, URL_LIST_TODOS, URL_POST_TODO } from "../hooks/useTodos";
import I_tambah from "../icons/tambah.png";
import I_trash from "../icons/trash.png";

const TodoActivity = () => {
	const [todoTitle, setTodoTitle] = useState("");
	const [isActiveTodo, setIsActiveTodo] = useState(0);
	const [isPriorityTodo, setIsPriorityTodo] = useState([]);
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
			refetchInterval: 3000,
		},
	);

	const addListTodo = useMutation((newListTodo) => {
		axios.post(`${URL_LIST_TODOS}`, newListTodo);
	});
	console.log(data);

	const handleShowAddTodo = () => {
		setModalAddTodo(true);
	};

	const handleAddListTodo = (e) => {
		e.preventDefault();
		setModalAddTodo(false);
		const newListTodo = {
			title: e.target.value,
			activity_group_id: id,
			isActive: e.target.value,
			priority: e.target.value,
		};
		console.log(newListTodo);
		addListTodo.mutate(newListTodo);
	};

	return (
		<>
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
						onClick={handleShowAddTodo}>
						<span className="Icon-tambah">
							<img src={I_tambah} alt="tambah" height="15px" />
						</span>
						<div className="App-body-button-text">Tambah</div>
					</button>
				</div>

				{/* {data && !modalAddTodo && (
						<TodosForm
							title={todoTitle}
							isActive={isActiveTodo}
							isPriority={isPriorityTodo}
						/>
					)} */}

				{data.todo_items !== null &&
					data.todo_items.map((todo) => (
						<div className="App-body-content-list mx-lg-5" key={todo.id}>
							<div className="App-body-content-item-list">
								<div className="d-flex align-items-center form-check">
									<button type="checkbox" className="form-check-input" />
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
			{modalAddTodo ? (
				<div className="modal fade">
					<Modal
						size="lg"
						show={modalAddTodo}
						onHide={() => setModalAddTodo(false)}
						style={{
							fontFamily: "Poppins",
						}}
						centered>
						<div className="modal-content">
							<Modal.Header closeButton>
								<h5 className="modal-title">Tambah Todo</h5>
							</Modal.Header>
							<div className="modal-body">
								<Form onSubmit={handleAddListTodo} method="POST">
									<Form.Group data-cy="form-add-todo">
										<Form.Label>Title</Form.Label>
										<Form.Control
											type="text"
											name="title"
											placeholder="Title"
											onChange={(e) => setTodoTitle(e.target.value)}
											required
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label>Priority</Form.Label>
										<Form.Select
											// as="select"
											itemType="option"
											name="priority"
											onChange={(e) => setIsPriorityTodo(e.target.value)}
											required>
											<option value="">Pilih Priority</option>
											<option value="very-high">Very High</option>
											<option value="high">High</option>
											<option value="medium">Medium</option>
											<option value="low">Low</option>
											<option value="very-low">Very Low</option>
										</Form.Select>
									</Form.Group>
								</Form>

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
					</Modal>
				</div>
			) : null}
		</>
	);
};

export default TodoActivity;
{
	/* <div className="form-check">
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
						</div> */
}
