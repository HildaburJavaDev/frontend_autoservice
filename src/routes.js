import { APPLICATION_ONE_ROUTE, APPLICATION_ROUTE, CABINET_ROUTE, LOGIN_ROUTE, RECORD_ONE_ROUTE, RECORD_ROUTE, REGISTRATION_ROUTE, } from "./utils/consts";
import Registration from "./pages/Registration";
import Login from "./pages/Login"
import Applications from "./pages/Applications";
import ApplicationOne from "./pages/ApplicationOne";
import Cabinet from "./pages/Cabinet"
import { Component } from "react";
import Records from "./pages/Records";
import RecordDetails from "./pages/RecordDetails";

export const authRoutes = [
	{
		path: APPLICATION_ROUTE,
		Component: Applications
	},
	{
		path: APPLICATION_ONE_ROUTE,
		Component: ApplicationOne
	},
	{
		path: CABINET_ROUTE,
		Component: Cabinet
	},
	{
		path: RECORD_ROUTE,
		Component: Records
	},
	{
		path: RECORD_ONE_ROUTE,
		Component: RecordDetails
	}
]

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: Login
	}, {
		path: REGISTRATION_ROUTE,
		Component: Registration
	}
]
