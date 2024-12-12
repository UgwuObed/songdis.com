import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  return NextResponse.next({
    headers: {
      'x-middleware-cache': 'no-cache',
    },
  })
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb', 
    },
    responseLimit: '100mb'
  }
}