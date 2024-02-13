import { AxiosResponse } from "axios"
import instance from "./index"
import type { Post } from "@/types/posts"

const getPostsList = async (): Promise<AxiosResponse<Post[]>> => {
	return await instance.get(`posts?_limit=5`)
}

const createPost = async (title: string): Promise<AxiosResponse<Post>> => {
	return await instance.post(`posts`, { title })
}

const editPostTitle = async (
	id: number,
	title: string
): Promise<AxiosResponse<Post>> => {
	return await instance.patch(`posts/${id}`, { title })
}

const deletePost = async (id: number): Promise<AxiosResponse> => {
	return await instance.delete(`posts/${id}`)
}

export { getPostsList, createPost, editPostTitle, deletePost }
