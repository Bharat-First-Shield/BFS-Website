
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutGrid,
  Users,
  FileText,
  MessageSquare,
  Users2,
  Settings,
  HelpCircle,
  ChevronRight,
  Type,
  ListChecks,
  Newspaper,
  Edit3,
  PlusSquare,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mainNavLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  {
    label: 'Employee Management',
    icon: Users,
    subLinks: [
      { href: '/dashboard/profile', label: 'Personal Information', icon: FileText },
      { href: '/dashboard/directory', label: 'Employee Directory', icon: Users2 },
    ],
  },
  { href: '/dashboard/tasks', label: 'Task Management', icon: ListChecks },
  { href: '/dashboard/communication', label: 'Communication Hub', icon: MessageSquare },
  {
    label: 'Blog Management',
    icon: Newspaper,
    subLinks: [
      { href: '/dashboard/create-post', label: 'Create New Post', icon: PlusSquare },
      { href: '/dashboard/blog-management', label: 'Manage Blog Posts', icon: Edit3 },
    ],
  },
  { href: '/dashboard/feedback', label: 'Feedback & Surveys', icon: Type },
];

const secondaryNavLinks = [
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/help', label: 'Help & Support', icon: HelpCircle },
];

export function DashboardSidebarNav() {
  const pathname = usePathname();

  const renderLink = (link: any, isSubLink = false) => (
    <Button
      key={link.href}
      asChild
      variant={pathname === link.href ? 'secondary' : 'ghost'}
      className={cn(
        'w-full justify-start text-sm',
        isSubLink && 'pl-10' // Indent sub-links
      )}
    >
      <Link href={link.href}>
        <link.icon className="mr-2 h-4 w-4" />
        {link.label}
        {link.badge && (
          <Badge className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
            {link.badge}
          </Badge>
        )}
      </Link>
    </Button>
  );

  return (
    <nav className="flex flex-col gap-2 px-2 py-4">
      {mainNavLinks.map((link) =>
        link.subLinks ? (
          <Accordion key={link.label} type="single" collapsible className="w-full">
            <AccordionItem value={link.label} className="border-b-0">
              <AccordionTrigger
                className={cn(
                  "flex items-center w-full justify-between rounded-md px-3 py-2 text-sm font-medium hover:bg-muted hover:no-underline",
                  link.subLinks.some(sub => pathname.startsWith(sub.href)) && "bg-muted"
                )}
              >
                <div className="flex items-center">
                  <link.icon className="mr-2 h-4 w-4" />
                  {link.label}
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-0 pl-4"> {/* Adjusted padding for content */}
                {link.subLinks.map((subLink) => renderLink(subLink, true))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ) : (
          renderLink(link)
        )
      )}

      <hr className="my-2 border-border" />

      {secondaryNavLinks.map((link) => renderLink(link))}
    </nav>
  );
}
