import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const token = searchParams.get("token");
  // query is "hello" for /api/search?query=hello

  if (!token) {
    return Response.json({ error: "No token provided" }, { status: 400 });
  }

  const verifyToken = await prisma.verificationToken.findFirst({
    where: {
      token,
    },
  });

  if (!verifyToken) {
    return Response.json({ error: "Invalid token" }, { status: 400 });
  }

  // verificar si ya expiro
  if (verifyToken.expires < new Date()) {
    return Response.json({ error: "Token expired" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: verifyToken.identifier,
    },
  });

  // verificar si ya fue verificado
  if (user?.emailVerified) {
    return Response.json({ error: "Email already verified" }, { status: 400 });
  }

  await prisma.user.update({
    where: {
      email: verifyToken.identifier,
    },
    data: {
      emailVerified: new Date(),
    },
  });

  await prisma.verificationToken.delete({
    where: {
      identifier: verifyToken.identifier,
    },
  });

  redirect("/login?verified=true");
}
