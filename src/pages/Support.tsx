import { useState, useEffect } from "react";
import { HelpCircle, Phone, Mail, MessageSquare, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url: string;
}

const Support = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetch("/data/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data));

    fetch("/data/resources.json")
      .then((res) => res.json())
      .then((data) => setResources(data));
  }, []);

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...Array.from(new Set(faqs.map((f) => f.category)))];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll respond within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-monastery text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-4 text-gold" />
          <h1 className="text-4xl md:text-5xl font-bold monastery-heading mb-4 text-gradient-gold">
            Support Center
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Get help planning your monastery visits and explore Sikkim's spiritual heritage
          </p>
        </div>
      </section>

      {/* Emergency Helpline */}
      <section className="py-8 bg-gold/10 border-y border-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-gold" />
              <div>
                <p className="text-sm text-muted-foreground">24/7 Helpline</p>
                <p className="font-semibold text-lg">+91-3592-202033</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-gold" />
              <div>
                <p className="text-sm text-muted-foreground">Email Support</p>
                <p className="font-semibold text-lg">support@monastery360.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="chat">Live Chat</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about visiting monasteries in Sikkim</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Badge
                        key={category}
                        variant={selectedCategory === category ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category === "all" ? "All" : category}
                      </Badge>
                    ))}
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {filteredFaqs.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-start gap-2">
                            <Badge variant="secondary" className="mt-1">{faq.category}</Badge>
                            <span>{faq.question}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  {filteredFaqs.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No FAQs found matching your search.
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Form Tab */}
            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Send us a message and we'll respond within 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Name</label>
                        <Input placeholder="Your name" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <Input type="email" placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Subject</label>
                      <Input placeholder="How can we help?" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Message</label>
                      <Textarea placeholder="Describe your question or issue..." rows={6} required />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">Other Ways to Reach Us</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gold" />
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-sm text-muted-foreground">+91-3592-202033 (Mon-Sat, 9AM-6PM IST)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gold" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">support@monastery360.com</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Live Chat Tab */}
            <TabsContent value="chat" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Chat Support</CardTitle>
                  <CardDescription>Get instant answers to your questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-8 text-center">
                    <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gold" />
                    <h3 className="text-lg font-semibold mb-2">Chat Coming Soon</h3>
                    <p className="text-muted-foreground mb-4">
                      We're setting up our live chat support. In the meantime, please use our contact form or call our helpline.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button variant="outline">Contact Form</Button>
                      <Button>Call Helpline</Button>
                    </div>
                  </div>

                  <Card className="bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
                    <CardHeader>
                      <CardTitle className="text-lg">Quick Answers</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        How do I get to Rumtek Monastery?
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        What are the monastery visiting hours?
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        Do I need permits to visit?
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        What should I wear to monasteries?
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Guides & Resources</CardTitle>
                  <CardDescription>Helpful resources for planning your monastery visits</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {resources.map((resource) => (
                      <Card key={resource.id} className="hover:bg-muted/50 transition-colors">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="h-5 w-5 text-gold" />
                                <h3 className="font-semibold">{resource.title}</h3>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                              <Badge variant="secondary">{resource.category}</Badge>
                            </div>
                            <Button variant="outline" size="sm">View</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gold/10 border-gold/20">
                <CardHeader>
                  <CardTitle>Need More Help?</CardTitle>
                  <CardDescription>Our team is here to assist you</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Can't find what you're looking for? Our support team is ready to help with personalized assistance for your monastery visits.
                  </p>
                  <div className="flex gap-3">
                    <Button className="flex-1">Contact Support</Button>
                    <Button variant="outline" className="flex-1">Call Helpline</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Support;
