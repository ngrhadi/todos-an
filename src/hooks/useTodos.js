/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const URL_TODOS = "https://todo.api.devcode.gethired.id/activity-groups";

export const URL_POST_TODO =
	"https://todo.api.devcode.gethired.id/activity-groups";

export const URL_LIST_TODOS = "https://todo.api.devcode.gethired.id/todo-items";

async function getTodosList() {
	const response = axios.get(URL_TODOS).then((res) => res.data.data);
	const data = await response;
	return data.slice(1, 11);
}

export const getTodoByID = async ({ queryKey }) => {
	const [_key, { id }] = queryKey;
	const response = await axios.get(`${URL_TODOS}/${id}`);
	const data = await response;
	return data.data;
};

async function get10Todos() {
	const response = axios.get(URL_TODOS).then((res) => res.data.data);
	const data = await response;
	return data.slice(12, 22);
}

export const useTodos = () => {
	const { data, isLoading, isError, isSuccess } = useQuery(
		["todos"],
		getTodosList,
		{
			refetchInterval: 3000,
		},
	);

	return { data, isLoading, isError, isSuccess };
};

export const use10Todos = () => {
	const { data, isLoading, isError, isSuccess } = useQuery(
		["todos"],
		get10Todos,
		{
			refetchInterval: 2000,
		},
	);

	return { data, isLoading, isError, isSuccess };
};
