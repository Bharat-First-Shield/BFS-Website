
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Github, LockKeyhole, ToyBrick } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Tool {
  id: string;
  name: string;
  description: string;
  type: 'Open-Source' | 'Closed-Source';
  category: string;
  icon: React.ElementType;
  url?: string;
  detailsUrl?: string; // For a dedicated page if needed
}

const tools: Tool[] = [
  {
    id: 'bfs-scanner-v1',
    name: 'BFS Network Scanner',
    description: 'An advanced network scanning tool for identifying active hosts, open ports, and running services within a network.',
    type: 'Closed-Source',
    category: 'Network Security',
    icon: ToyBrick,
    url: '#', // Placeholder
  },
  {
    id: 'phoenix-forensics-kit',
    name: 'Phoenix Forensics Kit',
    description: 'A comprehensive toolkit for digital forensics, aiding in data acquisition, analysis, and reporting.',
    type: 'Closed-Source',
    category: 'Digital Forensics',
    icon: FingerprintIcon, // Custom SVG or Lucide alternative
  },
  {
    id: 'os-vuln-mapper',
    name: 'VulnMapper OS',
    description: 'An open-source vulnerability mapping tool that correlates CVE data with system configurations.',
    type: 'Open-Source',
    category: 'Vulnerability Management',
    icon: Github,
    url: 'https://github.com/bharatfirstshield/vulnmapper-os', // Placeholder
  },
  {
    id: 'sentinel-log-analyzer',
    name: 'Sentinel Log Analyzer',
    description: 'A powerful log analysis tool for SOC operations, designed to detect anomalies and potential security incidents.',
    type: 'Closed-Source',
    category: 'SOC Operations',
    icon: Code,
  },
  {
    id: 'cipher-suite-checker',
    name: 'Cipher Suite Checker',
    description: 'An open-source utility to check SSL/TLS cipher suites supported by a server for security compliance.',
    type: 'Open-Source',
    category: 'Cryptography',
    icon: LockKeyhole,
    url: 'https://github.com/bharatfirstshield/cipherchecker', // Placeholder
  },
];

// Simple Fingerprint Icon as a placeholder
const FingerprintIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02.51 1.92.6 2.5C10.73 14.64 11 14.86 11 15.17V16a1 1 0 0 0 1 1h"/>
    <path d="M12 10V8"/>
    <path d="M12 6a2 2 0 0 1-2-2c0-1.02.51-1.92.6-2.5C10.73 1.36 11 1.14 11 .83V0"/>
    <path d="M7.5 17.5A1.5 1.5 0 0 1 9 16V8a1 1 0 0 1 1-1h"/>
    <path d="M15 16V7a1 1 0 0 0-1-1h- posibilidades-m"/>
    <path d="M12 22a2 2 0 0 0 2-2 .5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5 2 2 0 0 0 2 2Z"/>
    <path d="M17.61 18.09A5.42 5.42 0 0 1 19 15.56V13a1 1 0 0 0-1-1h-1"/>
    <path d="M5 13a1 1 0 0 0-1 1v2.56A5.42 5.42 0 0 1 6.39 18.09"/>
  </svg>
);


export default function ToolsPage() {
  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Our Tools Showcase</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the range of specialized tools developed and utilized by Bharat-First-Shield to deliver top-tier cybersecurity services.
        </p>
      </section>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Closed-Source Tools</h2>
        <p className="text-muted-foreground mb-6">Proprietary tools developed in-house for advanced security operations.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.filter(tool => tool.type === 'Closed-Source').map((tool) => (
            <Card key={tool.id} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <tool.icon className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">{tool.category}</Badge>
                </div>
                <CardTitle>{tool.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground mb-4 flex-grow">{tool.description}</p>
                {tool.url && (
                  <Button asChild variant="outline" className="mt-auto">
                    <Link href={tool.url} target="_blank" rel="noopener noreferrer">Learn More</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-2">Open-Source Contributions</h2>
        <p className="text-muted-foreground mb-6">Tools we've developed and shared with the cybersecurity community.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.filter(tool => tool.type === 'Open-Source').map((tool) => (
            <Card key={tool.id} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader>
                 <div className="flex items-center justify-between mb-2">
                  <tool.icon className="h-8 w-8 text-primary" />
                  <Badge variant="outline">{tool.category}</Badge>
                </div>
                <CardTitle>{tool.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground mb-4 flex-grow">{tool.description}</p>
                {tool.url && (
                  <Button asChild className="mt-auto">
                    <Link href={tool.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                      <Github className="mr-2 h-4 w-4" /> View on GitHub
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
