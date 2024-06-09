import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (userData) => {
	const token = localStorage.getItem('token');
	await $host.post('/api/user/registration', {
		firstname: userData.firstname,
		lastname: userData.lastname,
		phoneNumber: userData.phoneNumber,
		email: userData.email,
		password: userData.password,
		userRoleId: userData.userRoleId,
		groupId: userData.groupId
	}, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const login = async (phoneNumber, firstname) => {
	const {data} = await $host.post('api/user/sign', { phoneNumber, firstname })
	return data
}

export const updatepersonal = async (personalData) => {
	const token = localStorage.getItem('token');
	const { data } = await $host.post('api/user/updatepersonal', personalData, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	})
	return data
}

export const check = async () => {
	const { data } = await $authHost.get('api/user/auth')
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const getAllRoles = async () => {
	try {
		const token = localStorage.getItem('token');
		const response = await $host.get('/api/user/getroleslist', {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getAllUsersByRole = async (role, role2) => {
	try {
		const token = localStorage.getItem('token');
		const response = await $host.get(`/api/user/getusersbyrole?role=${role}&role=${role2}`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});
		return response.data;
	} catch (error) {
		throw error;
	}
}

export default getAllRoles;
