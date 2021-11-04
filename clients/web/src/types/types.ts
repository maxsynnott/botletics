export interface Credentials {
	email: string
	password: string
}

export interface User {
	id: string
	createdAt: string
	updatedAt: string
	email: string
}

export interface Bot {
	id: string
	createdAt: string
	updatedAt: string
	endpoint: string
	type: string
	userId: string
	name: string
}
