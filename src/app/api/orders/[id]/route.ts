import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest, { params }: { params: any }) => {
  const { id } = await params; // params'i await et
  try {
    const body = await req.json();
    // Burada gelen 'status' alanını doğru bir şekilde kullanıyoruz
    await prisma.order.update({
      where: { id },
      data: { status: body.status }, // `status` alanını kullan
    });

    return new NextResponse(JSON.stringify({ message: "Order has been updated!" }), {
      status: 200,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};
