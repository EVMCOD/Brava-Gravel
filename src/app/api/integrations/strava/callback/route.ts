import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  return NextResponse.json({
    success: true,
    data: {
      receivedCode: Boolean(code),
      message: "Strava callback endpoint is ready. Token exchange is the next step.",
    },
    error: null,
  });
}
