
"use client";

import { notFound } from 'next/navigation';
import type {useEffect} from 'react'; // Import useEffect for the hook signature

// This page is no longer in use and has been replaced by /dashboard/create-post
// If navigated to directly, it should show a 404 error.
export default function ObsoleteBlogSubmissionPage() {
  React.useEffect(() => {
    notFound();
  }, []);

  return null; // Or a loading spinner, but notFound will redirect
}
