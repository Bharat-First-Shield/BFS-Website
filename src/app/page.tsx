
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Wrench, Target, ShieldAlert, Fingerprint as FingerprintIconLucide, Zap, MessageSquareText, Github, Mail, BookOpen, Code2, CalendarDays } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getRecentBlogPosts, BlogListItem } from '@/lib/blog';

export default async function Home() {
  const recentPosts: BlogListItem[] = await getRecentBlogPosts(3);

  return (
    <div className="space-y-20"> {/* Increased spacing for new sections */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to <span className="text-primary">Bharat First Shield</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Your trusted partner in cybersecurity and web development. Bharat-First-Shield provides cutting-edge VAPT, SOC, Digital Forensics, and Full Stack Web Development services.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/about">Learn More About Us <Users className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get In Touch <Mail className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Our Premier Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Vulnerability Assessment & Penetration Testing (VAPT)</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">Identify and mitigate vulnerabilities before they are exploited. Comprehensive testing for networks, web, and mobile applications.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="px-0 text-primary">
                <Link href="/about#vapt">Explore VAPT <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <ShieldAlert className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Security Operations Center (SOC) as a Service</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">24/7 security monitoring, threat detection, and rapid incident response to protect your assets continuously.</p>
            </CardContent>
             <CardFooter>
              <Button asChild variant="link" className="px-0 text-primary">
                <Link href="/about#soc">Discover SOCaaS <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <FingerprintIconLucide className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Digital Forensics & Incident Response (DFIR)</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">Expert investigation and response in case of security breaches to minimize damage and recover systems effectively.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="px-0 text-primary">
                <Link href="/about#dfir">Learn About DFIR <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
            <CardHeader>
              <Code2 className="h-10 w-10 text-primary mb-4" />
              <CardTitle>Full Stack Web Development</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">Comprehensive web solutions, from front-end design to back-end development, API integration, and cloud deployment.</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="link" className="px-0 text-primary">
                <Link href="/about#fullstack">Explore Web Development <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="py-12 bg-card/50 rounded-lg shadow-inner">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Partner with Bharat-First-Shield?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="flex flex-col items-center text-center">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Proactive Defense</h3>
              <p className="text-muted-foreground text-sm">We anticipate emerging threats and implement robust, forward-thinking defenses to keep you ahead of attackers.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
              <p className="text-muted-foreground text-sm">Our certified professionals bring deep, cross-domain expertise in cybersecurity and web development.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Tailored Solutions</h3>
              <p className="text-muted-foreground text-sm">We provide customized security and web strategies that align precisely with your specific business needs.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <MessageSquareText className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">India-First Focus</h3>
              <p className="text-muted-foreground text-sm">Dedicated to empowering Indian enterprises with a nuanced understanding of the local digital landscape.</p>
            </div>
          </div>
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-center mb-10">Recent Insights from Our Blog</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post) => (
              <Card key={post.slug} className="flex flex-col overflow-hidden shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                {post.imageUrl && (
                  <Link href={`/blog/${post.slug}`} className="block relative w-full h-48 group">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      style={{objectFit: "cover"}}
                      className="group-hover:scale-105 transition-transform duration-300"
                      data-ai-hint={`${post.category} ${post.tags && post.tags.length > 0 ? post.tags[0] : 'technology'}`}
                    />
                     <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </Link>
                )}
                <CardHeader>
                  <div className="mb-1">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                   <div className="flex items-center space-x-4 text-xs text-muted-foreground pt-1">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-sm line-clamp-3">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="link" className="px-0 text-primary text-sm">
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/blog">View All Posts <BookOpen className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>
      )}

      <section className="py-12">
         <h2 className="text-3xl font-bold text-center mb-10">Our Specialized Tools</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <Wrench className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Cutting-Edge Arsenal</CardTitle>
                <CardDescription>Proprietary tools for advanced threat mitigation.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  Our in-house developed tools provide unique capabilities to identify, analyze, and neutralize complex cyber threats with precision.
                </p>
              </CardContent>
               <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/tools">Explore Our Tools <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
            <Card className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
              <CardHeader>
                <Github className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Open Source Contributions</CardTitle>
                <CardDescription>Empowering the community with shared innovations.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">
                  We believe in collaborative security. Discover our open-source projects that help strengthen cybersecurity defenses globally.
                </p>
              </CardContent>
               <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/tools#open-source">View on GitHub <Github className="ml-1 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
        </div>
      </section>

      <section className="text-center py-16 border-t border-border/40 bg-card/30 rounded-lg shadow-inner">
        <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Digital Future?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Partner with Bharat-First-Shield today. Our experts are ready to help you build a resilient cybersecurity posture and impactful digital presence.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href="/contact">Request a Consultation <Mail className="ml-2 h-5 w-5" /></Link>
        </Button>
      </section>
    </div>
  );
}
