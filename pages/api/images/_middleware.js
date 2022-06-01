import { NextResponse } from "next/server";

export function middleware(req) {
	switch (req.method) {
		case "DELETE":
			return NextResponse.next();
		default:
			return new Response(
				JSON.stringify({
					message: `No ${req.method} action exist on this route`,
				}),
				{
					status: 400,
				}
			);
	}
}
