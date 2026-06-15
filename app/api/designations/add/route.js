export async function POST(req) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const designation = await prisma.designations.create({
      data: {
        name: body.name || null,
        description: body.description || null,
        team_associated: body.team || null,
        department: body.department || null,
        department_head: body.department_head || null,
      },
    });

    return NextResponse.json({
      success: true,
      data: designation,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}