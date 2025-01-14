import { NextResponse } from 'next/server';

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  const googleSuggestUrl = `http://suggestqueries.google.com/complete/search?output=firefox&q=${encodeURIComponent(
    query
  )}`;

  try {
    const response = await fetch(googleSuggestUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch suggestions' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Error fetching suggestions',
        details: error.message,
      },
      { status: 500 }
    );
  }
}
