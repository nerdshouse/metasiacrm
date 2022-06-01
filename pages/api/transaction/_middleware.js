import { NextResponse } from "next/server";

export function middleware(req) {
	switch (req.method) {
		case "GET":
			return NextResponse.next();
		case "POST":
			return NextResponse.next();
		case "PATCH":
			return NextResponse.next();
		default:
			return new Response(
				JSON.strigify({
					message: `No ${req.method} action exist on this route`,
				}),
				{ status: 400 }
			);
	}
}
