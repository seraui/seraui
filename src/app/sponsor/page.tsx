"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Button from "@/app/docs/button/button";
import { ExternalLink, Mail } from "lucide-react";

const contactLinks = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com/in/codernazmulhossain/",
    icon: "💼",
    description: "Professional networking and career updates",
  },
  {
    platform: "Discord",
    url: "https://discord.gg/XqQkbTptvJ",
    icon: "💬",
    description: "Join our community for real-time discussions",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com/codervai",
    icon: "📘",
    description: "Follow for updates and behind-the-scenes content",
  },
  {
    platform: "X (Twitter)",
    url: "https://x.com/devshowcse",
    icon: "🐦",
    description: "Latest thoughts and tech insights",
  },
];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Help Keep Sera UI Alive</h1>
          <p className="text-xl text-muted-foreground mb-2">
            We&apos;re hitting Vercel&apos;s free tier limits!
          </p>
          <p className="text-muted-foreground">
            Your support helps maintain and improve this open-source project
          </p>
        </div>

        {/* Main CTA */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Get in Touch
            </CardTitle>
            <CardDescription>
              Ready to sponsor or have questions? Let&apos;s connect!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              size="lg"
              className="mb-4"
              onClick={() =>
                window.open("mailto:codewithnazmul@gmail.com", "_blank")
              }
            >
              <Mail className="w-4 h-4 mr-2" />
              codewithnazmul@gmail.com
            </Button>
            <p className="text-sm text-muted-foreground">
              Or reach out through any of the platforms below
            </p>
          </CardContent>
        </Card>

        {/* Contact Links */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {contactLinks.map((link) => (
            <Card
              key={link.platform}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{link.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{link.platform}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {link.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(link.url, "_blank")}
                    >
                      Connect
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Thank you for considering supporting Sera UI! 🙏
          </p>
        </div>
      </div>
    </div>
  );
}
