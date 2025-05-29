
import { UserCircle, CalendarDays } from 'lucide-react';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'the-rise-of-ai-in-cybersecurity',
    title: 'The Rise of AI in Cybersecurity: Opportunities and Challenges',
    date: '2024-07-15',
    author: 'Dr. Anya Sharma',
    excerpt: 'Artificial Intelligence is revolutionizing cybersecurity, offering new ways to detect threats and automate defenses. However, it also presents new challenges...',
    content: `
      <p>Artificial Intelligence (AI) is rapidly transforming the landscape of cybersecurity. Its ability to analyze vast amounts of data, identify patterns, and learn from new information makes it a powerful tool in the fight against cyber threats. From advanced threat detection systems to automated incident response, AI is enhancing our capabilities to protect digital assets.</p>
      <h2 class="text-2xl font-semibold my-4 text-primary">Opportunities with AI in Cybersecurity</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Enhanced Threat Detection:</strong> AI algorithms can identify subtle anomalies and predict potential attacks with greater accuracy than traditional methods.</li>
        <li><strong>Automated Incident Response:</strong> AI can automate routine security tasks and respond to incidents in real-time, reducing the window of vulnerability.</li>
        <li><strong>Proactive Vulnerability Management:</strong> AI can help in identifying and prioritizing vulnerabilities based on their potential impact.</li>
        <li><strong>Behavioral Biometrics:</strong> AI-powered systems can analyze user behavior to detect and prevent unauthorized access.</li>
      </ul>
      <h2 class="text-2xl font-semibold my-4 text-primary">Challenges and Considerations</h2>
      <p>Despite its benefits, the integration of AI in cybersecurity is not without its challenges. Adversarial AI attacks, where malicious actors use AI to bypass security measures, are a growing concern. Ensuring the ethical use of AI and addressing potential biases in algorithms are also critical considerations. Furthermore, the complexity of AI systems requires specialized skills for development and maintenance.</p>
      <p class="mt-4">As we move forward, a balanced approach that leverages the strengths of AI while mitigating its risks will be crucial for building a more secure digital future. At Bharat-First-Shield, we are actively exploring and implementing AI-driven solutions to provide state-of-the-art protection for our clients.</p>
    `,
    imageUrl: 'https://placehold.co/800x400.png',
    tags: ['AI', 'Cybersecurity', 'Threat Detection', 'Innovation'],
    category: 'Industry Trends'
  },
  {
    slug: 'essential-vapt-practices-for-smes',
    title: 'Essential VAPT Practices for Small and Medium Enterprises (SMEs)',
    date: '2024-06-28',
    author: 'Rohan Verma',
    excerpt: 'SMEs are increasingly targeted by cyberattacks. Implementing robust Vulnerability Assessment and Penetration Testing (VAPT) practices is crucial for their defense...',
    content: `
      <p>Small and Medium Enterprises (SMEs) often believe they are too small to be targets for cybercriminals. However, statistics show a different story. SMEs are frequently targeted due to perceived weaker security measures. Implementing regular Vulnerability Assessment and Penetration Testing (VAPT) is no longer a luxury but a necessity for SMEs.</p>
      <h2 class="text-2xl font-semibold my-4 text-primary">Why VAPT is Crucial for SMEs</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Identifying Weaknesses:</strong> VAPT helps uncover vulnerabilities in your systems, applications, and network infrastructure.</li>
        <li><strong>Preventing Data Breaches:</strong> By proactively finding and fixing vulnerabilities, SMEs can significantly reduce the risk of costly data breaches.</li>
        <li><strong>Meeting Compliance Requirements:</strong> Many industry regulations and standards require regular security assessments.</li>
        <li><strong>Building Customer Trust:</strong> Demonstrating a commitment to security can enhance customer confidence and brand reputation.</li>
      </ul>
      <h2 class="text-2xl font-semibold my-4 text-primary">Key VAPT Practices for SMEs</h2>
      <ol class="list-decimal list-inside space-y-2 mb-4">
        <li><strong>Regular Scanning:</strong> Conduct automated vulnerability scans on a frequent basis.</li>
        <li><strong>Annual Penetration Testing:</strong> Perform in-depth penetration tests at least once a year or after significant system changes.</li>
        <li><strong>Prioritize Remediation:</strong> Focus on fixing critical and high-severity vulnerabilities first.</li>
        <li><strong>Employee Training:</strong> Educate employees about common cyber threats like phishing, as human error is often a factor in breaches.</li>
        <li><strong>Choose a Reliable VAPT Provider:</strong> Partner with experienced cybersecurity professionals who understand the specific needs of SMEs.</li>
      </ol>
      <p class="mt-4">At Bharat-First-Shield, we offer tailored VAPT solutions for SMEs, helping them build a strong defense against cyber threats without breaking their budget. Contact us to learn how we can help secure your business.</p>
    `,
    imageUrl: 'https://placehold.co/800x400.png',
    tags: ['VAPT', 'SME Security', 'Cyberattacks', 'Best Practices'],
    category: 'Security Guidance'
  },
  {
    slug: 'understanding-soc-as-a-service',
    title: 'Understanding SOC as a Service: Is It Right for Your Organization?',
    date: '2024-05-10',
    author: 'Priya Singh',
    excerpt: 'A Security Operations Center (SOC) is vital for modern cybersecurity. SOC as a Service offers a flexible and cost-effective way for organizations to access advanced threat monitoring...',
    content: `
      <p>In today's complex threat landscape, having a Security Operations Center (SOC) is crucial for proactive threat detection and response. However, building and maintaining an in-house SOC can be resource-intensive and expensive. This is where SOC as a Service comes into play, offering a viable alternative for many organizations.</p>
      <h2 class="text-2xl font-semibold my-4 text-primary">What is SOC as a Service?</h2>
      <p>SOC as a Service (SOCaaS) is a subscription-based model where an organization outsources its SOC functions to a third-party provider. This provider delivers 24/7 monitoring, threat detection, incident response, and security expertise, leveraging their own technology stack and skilled analysts.</p>
      <h2 class="text-2xl font-semibold my-4 text-primary">Benefits of SOCaaS</h2>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li><strong>Cost-Effectiveness:</strong> Significantly lower upfront investment and operational costs compared to an in-house SOC.</li>
        <li><strong>Access to Expertise:</strong> Gain access to a team of highly skilled cybersecurity professionals and advanced technologies.</li>
        <li><strong>24/7 Monitoring:</strong> Continuous security monitoring ensures threats are detected and addressed around the clock.</li>
        <li><strong>Scalability:</strong> Services can be easily scaled up or down based on your organization's needs.</li>
        <li><strong>Faster Deployment:</strong> Quicker to implement than building an in-house SOC from scratch.</li>
      </ul>
      <h2 class="text-2xl font-semibold my-4 text-primary">Is SOCaaS Right for You?</h2>
      <p>SOCaaS can be an excellent solution for organizations that:</p>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Lack the internal resources or expertise to run an effective SOC.</li>
        <li>Need to enhance their security posture quickly.</li>
        <li>Are looking for a cost-effective way to achieve 24/7 security monitoring.</li>
        <li>Want to focus on their core business operations while entrusting security to experts.</li>
      </ul>
      <p class="mt-4">Bharat-First-Shield provides comprehensive SOCaaS solutions tailored to your organization's specific risk profile and compliance requirements. Reach out to us to discuss how we can elevate your security monitoring and response capabilities.</p>
    `,
    imageUrl: 'https://placehold.co/800x400.png',
    tags: ['SOC', 'SOCaaS', 'Threat Monitoring', 'Managed Security'],
    category: 'Services Explained'
  }
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getRecentBlogPosts(count: number = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, count);
}
