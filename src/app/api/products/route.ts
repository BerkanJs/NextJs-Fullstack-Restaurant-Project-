import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/connect";

//Fetch All Products

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat");

  try {
    const produdcts = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }),
      },
    });
    return new NextResponse(JSON.stringify(produdcts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(JSON.stringify({ message: "Sth went wrong!" }), {
      status: 500,
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    // Verinin null veya boş olup olmadığını kontrol et
    if (!body || Object.keys(body).length === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid data received!" }),
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: body,
    });
    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (err) {
    // Hata mesajını güvenli bir şekilde logla
    if (err instanceof Error) {
      console.log('Error occurred:', err.message);
    } else {
      console.log('Unknown error occurred', err);
    }
    
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};