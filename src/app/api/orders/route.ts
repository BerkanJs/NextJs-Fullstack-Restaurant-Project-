import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";
import { getAuthSession } from "@/utils/auth";

export const GET = async (req: NextRequest) => {
  const session = await getAuthSession();

  if (session) {
    try {
      if (session.user?.isAdmin) {
        const orders = await prisma.order.findMany();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }

      if (!session.user?.email) {
        return new NextResponse(
          JSON.stringify({ message: "User email is not available." }),
          { status: 400 }
        );
      }

      const orders = await prisma.order.findMany({
        where: {
          userEmail: session.user.email!,
        },
      });

      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (err) {
      console.error("Database error:", err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }

  return new NextResponse(
    JSON.stringify({ message: "You are not authenticated!" }),
    { status: 401 }
  );
};
