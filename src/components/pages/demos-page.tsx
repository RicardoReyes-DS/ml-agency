import Link from "next/link";
import { ArrowRight, Brain, Eye, MessageSquare, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDictionary, localizeHref, type Locale } from "@/lib/i18n";
import { CONTACT_SUBJECTS, createMailto } from "@/lib/site";

const demoIcons = [Eye, MessageSquare, Brain, TrendingUp];

export function DemosPage({ locale }: { locale: Locale }) {
  const copy = getDictionary(locale).demos;

  return (
    <div className="min-h-screen bg-background">
      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 mb-8">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-gradient-primary font-mono">{copy.badge}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              {copy.title}
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-12">
              {copy.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gradient-primary hover:shadow-xl glow-primary text-white px-8 py-4 text-lg font-semibold transition-all duration-300">
                <a href={createMailto(locale === "es" ? CONTACT_SUBJECTS.revisionDeFlujo : CONTACT_SUBJECTS.workflowReview)}>
                  {copy.primaryCta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-primary/50 hover:border-accent/70 hover:bg-accent/5 text-foreground-muted hover:text-foreground px-8 py-4 text-lg font-semibold transition-all duration-300">
                <Link href={localizeHref(locale, "/#services")}>{copy.secondaryCta}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {copy.cards.map((demo, index) => {
              const Icon = demoIcons[index] ?? Eye;

              return (
                <Card key={demo.href} className="bg-surface/60 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{demo.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {demo.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="ghost" className="px-0 text-primary hover:text-accent font-medium">
                      <Link href={localizeHref(locale, demo.href)}>
                        {copy.exploreCta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
