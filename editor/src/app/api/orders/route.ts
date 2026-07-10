import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pages, canvasSettings, customerName, customerEmail } = body;

    // Validate
    if (!pages || !Array.isArray(pages)) {
      return NextResponse.json({ error: 'Invalid project data' }, { status: 400 });
    }

    // Save to DB
    const order = await prisma.order.create({
      data: {
        customerName: customerName || 'Anonymous',
        customerEmail: customerEmail || '',
        projectData: JSON.stringify({ pages, canvasSettings }),
        status: 'PENDING',
      },
    });

    return NextResponse.json({ success: true, orderId: order.id }, { status: 201 });
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
