"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Button from "@/app/docs/button/button";
import { ExternalLink, Mail, TrendingUp } from "lucide-react";

const sponsorshipPlans = [
  {
    name: "Monthly",
    price: "$10",
    duration: "1 Month",
    features: [
      "Logo placement on homepage",
      "Website link in banner ads",
      "Monthly exposure to our audience",
      "Social media mentions",
    ],
    popular: false,
  },
  {
    name: "Yearly",
    price: "$100",
    duration: "12 Months",
    features: [
      "Logo placement on homepage",
      "Website link in banner ads",
      "Year-long exposure to our audience",
      "Priority placement",
      "Monthly social media mentions",
      "2 months free (vs monthly plan)",
    ],
    popular: true,
  },
  {
    name: "Lifetime",
    price: "$500",
    duration: "Forever",
    features: [
      "Permanent logo placement",
      "Permanent website link",
      "Lifetime exposure to our audience",
      "Top priority placement",
      "Regular social media mentions",
      "Special 'Founding Sponsor' badge",
    ],
    popular: false,
  },
];

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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4 relative">
      {/* Top Fade Grid Pattern Background */}
      <div className="absolute inset-0 z-0">
        {/* Light mode Top Fade Grid */}
        <div
          className="absolute inset-0 z-0 dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(226,232,240,0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(226,232,240,0.4) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />

        {/* Dark mode Top Fade Grid */}
        <div
          className="absolute inset-0 z-0 hidden dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(71,85,105,0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(71,85,105,0.2) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Sponsor Sera UI</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Showcase your brand to our growing developer community
          </p>
          <p className="text-muted-foreground">
            Get your logo and website link featured on our platform
          </p>
        </div>

        {/* Visitor Stats */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Our Reach
            </CardTitle>
            <CardDescription>
              See the impact your sponsorship will have
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <img
              src="https://i.postimg.cc/8z65s96b/Screenshot-2025-07-27-055210.webp"
              alt="Visitor Statistics"
              className="w-full max-w-3xl mx-auto rounded-lg border shadow-lg"
            />
          </CardContent>
        </Card>

        {/* Sponsorship Plans */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Choose Your Sponsorship Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sponsorshipPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${plan.popular ? "border-2 border-primary" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {plan.price}
                  </div>
                  <CardDescription>{plan.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() =>
                      window.open(
                        "mailto:codewithnazmul@gmail.com?subject=Sponsorship Inquiry - " +
                          plan.name +
                          " Plan",
                        "_blank"
                      )
                    }
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" />
              Ready to Sponsor?
            </CardTitle>
            <CardDescription>
              Contact us to get your brand featured on Sera UI
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button
              size="lg"
              className="mb-4"
              onClick={() =>
                window.open(
                  "mailto:codewithnazmul@gmail.com?subject=Sponsorship Inquiry",
                  "_blank"
                )
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
