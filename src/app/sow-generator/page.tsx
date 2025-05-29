
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';
import { ClipboardEdit } from "lucide-react";

const sowFormSchema = z.object({
  clientName: z.string().min(2, "Client name is required."),
  projectName: z.string().min(5, "Project name must be at least 5 characters."),
  serviceType: z.enum(["VAPT", "SOC", "Digital Forensics", "Consulting"], {
    required_error: "You need to select a service type.",
  }),
  projectSummary: z.string().min(20, "Project summary must be at least 20 characters."),
  keyObjectives: z.string().min(10, "Please list at least one key objective."),
  timeline: z.string().optional(),
});

type SowFormData = z.infer<typeof sowFormSchema>;

export default function SowGeneratorPage() {
  const [generatedSow, setGeneratedSow] = useState<SowFormData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SowFormData>({
    resolver: zodResolver(sowFormSchema),
    defaultValues: {
      clientName: "",
      projectName: "",
      projectSummary: "",
      keyObjectives: "",
      timeline: "",
    },
  });

  async function onSubmit(values: SowFormData) {
    setIsLoading(true);
    // Simulate SOW generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setGeneratedSow(values);
    setIsLoading(false);
    toast({
      title: "SOW Draft Generated",
      description: "Review the draft Statement of Work below.",
    });
  }

  return (
    <div className="space-y-10">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
          <ClipboardEdit className="h-10 w-10 text-primary" />
          Statement of Work (SOW) Generator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Provide a summary of your requirements, and we'll help you draft an initial Statement of Work.
        </p>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Fill in the form to generate your SOW draft.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name / Company</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Acme Corp" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name / Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Q3 Security Audit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="serviceType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="VAPT">Vulnerability Assessment & Penetration Testing (VAPT)</SelectItem>
                        <SelectItem value="SOC">Security Operations Center (SOC) Services</SelectItem>
                        <SelectItem value="Digital Forensics">Digital Forensics & Incident Response</SelectItem>
                        <SelectItem value="Consulting">Cybersecurity Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="projectSummary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Summary / Scope Overview</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Briefly describe the project and its main goals." rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keyObjectives"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Key Objectives / Deliverables</FormLabel>
                    <FormControl>
                      <Textarea placeholder="List the primary objectives or expected deliverables (e.g., Identify critical vulnerabilities, Provide remediation report)." rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Timeline (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 4 weeks, Q4 2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                {isLoading ? "Generating SOW..." : "Generate SOW Draft"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {generatedSow && (
        <>
          <Separator className="my-10" />
          <Card className="shadow-lg bg-card/50">
            <CardHeader>
              <CardTitle className="text-2xl">Draft Statement of Work</CardTitle>
              <CardDescription>This is a preliminary draft based on the information you provided. Our team will work with you to finalize the details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 prose prose-invert max-w-none dark:prose-invert">
              <h2>Project: {generatedSow.projectName}</h2>
              <p><strong>Client:</strong> {generatedSow.clientName}</p>
              <p><strong>Service Type:</strong> {generatedSow.serviceType}</p>
              {generatedSow.timeline && <p><strong>Expected Timeline:</strong> {generatedSow.timeline}</p>}
              
              <Separator />

              <h3>1. Project Summary & Scope</h3>
              <p>{generatedSow.projectSummary}</p>

              <h3>2. Key Objectives & Deliverables</h3>
              {/* Display objectives as a list if they contain newlines, or as a paragraph */}
              {generatedSow.keyObjectives.includes('\\n') || generatedSow.keyObjectives.split('\n').length > 1 ? (
                <ul>
                  {generatedSow.keyObjectives.split('\n').map((obj, index) => obj.trim() && <li key={index}>{obj.trim()}</li>)}
                </ul>
              ) : (
                <p>{generatedSow.keyObjectives}</p>
              )}
              
              <Separator />

              <h3>3. Next Steps</h3>
              <p>A representative from Bharat-First-Shield will contact you to discuss this draft SOW, clarify requirements, and provide a formal proposal. Please note that this generated document is for discussion purposes only and is not a binding agreement.</p>

              <p className="text-sm text-muted-foreground pt-4">
                Generated on: {new Date().toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
