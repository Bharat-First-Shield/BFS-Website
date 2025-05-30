"use client";
// This file is part of the decommissioned dashboard.
// It can be safely deleted.
import { notFound } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardHomePage() {
  useEffect(() => {
    notFound();
  }, []);
  return null;
}
