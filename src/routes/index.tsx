import { createFileRoute } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import avatar from "@/assets/avatar.jpg";
import { ParticleNetwork } from "@/components/ParticleNetwork";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "0day — Personal" },
      { name: "description", content: "Pentester / Builder / Entrepreneur — personal landing page." },
      { property: "og:title", content: "0day — Personal" },
      { property: "og:description", content: "Pentester / Builder / Entrepreneur — personal landing page." },
    ],
  }),
  component: Index,
});

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://youtube.com", label: "YouTube", Icon: Youtube },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com", label: "GitHub", Icon: Github },
];

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <ParticleNetwork />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
          <img
            src={avatar}
            alt="Avatar"
            width={1024}
            height={1024}
            className="h-40 w-40 rounded-full border border-border bg-card object-cover shadow-xl sm:h-52 sm:w-52"
          />

          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <h1 className="font-mono text-6xl font-black tracking-tight sm:text-8xl">
              0day
            </h1>
            <p className="mt-4 font-mono text-lg sm:text-xl">Your Name Here</p>
            <p className="mt-2 font-mono text-sm text-muted-foreground sm:text-base">
              Pentester / Builder / Entrepreneur
            </p>

            <div className="mt-6 flex items-center gap-5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="text-foreground transition-transform hover:scale-110 hover:text-muted-foreground"
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <a
        href="mailto:hello@example.com"
        className="fixed bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-3 py-2 font-mono text-xs text-foreground backdrop-blur transition-colors hover:bg-card"
      >
        <Mail className="h-3.5 w-3.5" />
        hello@example.com
      </a>
    </main>
  );
}
