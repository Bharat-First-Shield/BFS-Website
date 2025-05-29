
import ThreeScene from '@/components/three-scene';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Wrench } from 'lucide-react'; // Removed FileText
import Link from 'next/link';

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to <span className="text-primary">Shield Master</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your trusted partner in cybersecurity. Bharat-First-Shield provides cutting-edge VAPT, SOC, and Digital Forensics services to protect your digital assets.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/about">Learn More About Us <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </section>

      <section>
        <ThreeScene />
      </section>

      <section className="grid md:grid-cols-2 gap-8"> {/* Changed grid to md:grid-cols-2 */}
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          <CardHeader>
            <Users className="h-10 w-10 text-primary mb-4" />
            <CardTitle>Expert Services</CardTitle>
            <CardDescription>Discover our range of cybersecurity solutions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              From Vulnerability Assessment and Penetration Testing (VAPT) to Security Operations Center (SOC) services and advanced Digital Forensics.
            </p>
            <Button asChild variant="link" className="px-0">
              <Link href="/about">Explore Services <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
          <CardHeader>
            <Wrench className="h-10 w-10 text-primary mb-4" />
            <CardTitle>Our Tools</CardTitle>
            <CardDescription>Proprietary and open-source tools.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              We develop and utilize a suite of specialized tools to enhance our cybersecurity capabilities and provide top-tier protection.
            </p>
            <Button asChild variant="link" className="px-0">
              <Link href="/tools">See Our Arsenal <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </CardContent>
        </Card>
        {/* SOW Generator Card Removed */}
      </section>
    </div>
  );
}
