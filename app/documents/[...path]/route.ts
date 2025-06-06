import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join('/')
  const headersList = headers()
  
  // Set appropriate headers for PDF files
  const response = NextResponse.next()
  response.headers.set('Content-Type', 'application/pdf')
  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  
  return response
} 