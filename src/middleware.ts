// This middleware file is no longer needed for the decommissioned dashboard.
// It can be safely deleted or left empty.
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // No-op
}

export const config = {
  matcher: [], // No routes matched
};
