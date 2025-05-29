
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Fingerprint, ShieldAlert, Target } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    id: "vapt",
    icon: Target,
    title: "Vulnerability Assessment and Penetration Testing (VAPT)",
    description: "We identify and exploit vulnerabilities in your systems before malicious actors do. Our comprehensive VAPT services ensure your infrastructure, applications, and networks are robust against attacks. We provide detailed reports with actionable recommendations.",
    features: ["Network VAPT", "Web Application VAPT", "Mobile Application VAPT", "Cloud Security Assessment"]
  },
  {
    id: "soc",
    icon: ShieldAlert,
    title: "Security Operations Center (SOC) as a Service",
    description: "Our 24/7 SOC services provide continuous monitoring, threat detection, and incident response. We leverage advanced SIEM technology and expert analysts to protect your organization from evolving cyber threats.",
    features: ["Real-time Threat Monitoring", "Incident Detection & Response", "Log Management & Analysis", "Threat Intelligence Integration"]
  },
  {
    id: "dfir",
    icon: Fingerprint,
    title: "Digital Forensics and Incident Response (DFIR)",
    description: "In the event of a security breach, our DFIR team provides rapid response to contain the threat, investigate the incident, and recover affected systems. We help you understand the attack and strengthen your defenses.",
    features: ["Incident Triage & Containment", "Forensic Data Acquisition", "Malware Analysis", "Post-Incident Reporting & Remediation"]
  }
];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About Bharat-First-Shield</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Bharat-First-Shield is a premier cybersecurity firm dedicated to safeguarding Indian organizations and beyond. We specialize in providing robust, proactive, and responsive security solutions tailored to meet the unique challenges of the digital age.
        </p>
      </section>

      <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl">
        <Image 
          src="https://placehold.co/1200x400.png" 
          alt="Cybersecurity professionals at work" 
          layout="fill" 
          objectFit="cover"
          data-ai-hint="cybersecurity team" 
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Innovate. Secure. Protect.</h2>
        </div>
      </div>

      <Separator />

      <section id="core-services">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Core Services</h2>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} id={service.id} className="flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <service.icon className="h-10 w-10 text-primary" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 mt-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
          To empower organizations with resilient cybersecurity postures through innovative solutions, expert guidance, and unwavering commitment to digital safety.
        </p>
        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          To be the leading cybersecurity partner, recognized for excellence, integrity, and a proactive approach to defending against the ever-evolving threat landscape.
        </p>
      </section>
    </div>
  );
}

    