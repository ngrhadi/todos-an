import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { URL_TODOS } from "../hooks/useTodos";
import I_alert from "../icons/icon-alert.svg";
import Home from "../page/Home";

export default function ModalDelete(props) {
	const { id } = props.data;
	const navigate = useNavigate();
	const [modalShow, setModalShow] = React.useState(true);
	const [showAlert, setShowAlert] = React.useState(false);

	const handleDeleteTodo = async () => {
		setModalShow(false);
		const response = await axios.delete(`${URL_TODOS}/${id}`);
		const data = await response;
		setShowAlert(true);
		navigate(<Home />);
		console.log(data);
		return data.data;
	};

	console.log(props);
	return (
		<>
			{modalShow ? (
				<div className="modal fade">
					<Modal show={true} centered>
						<div>
							<Modal.Header className="d-flex justify-content-center text-center">
								<Modal.Title>
									<img src={I_alert} alt="alert" />
								</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<p data-cy="modal-information">
									Are you sure you want to delete{" "}
									<strong>{props.data.title}</strong> ?
								</p>
							</Modal.Body>
							<Modal.Footer>
								<button
									className="btn btn-danger"
									onClick={handleDeleteTodo}
									type="button"
									data-cy="delete-todo-button">
									Delete
								</button>
								<button
									className="btn btn-secondary"
									data-cy="modal-delete-cancel-button"
									onClick={props.handleclose}>
									Cancel
								</button>
							</Modal.Footer>
						</div>
					</Modal>
					{showAlert ? (
						<div className="alert alert-success" role="alert">
							<strong>Success!</strong> Todo has been deleted.
						</div>
					) : null}
				</div>
			) : null}
		</>
	);
}
