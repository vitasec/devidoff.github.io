import { createFileRoute } from "@tanstack/react-router";
import { Github, Instagram, Linkedin, Youtube, Mail } from "lucide-react";
import avatar from "@/assets/avatar.jpg";
import { Tessellation } from "@/components/Tessellation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "vitasec" },
      { name: "description", content: "Pentester " },
      { property: "og:title", content: "David Abdurahmanov" },
      { property: "og:description", content: "Pentester " },
    ],
  }),
  component: Index,
});

const socials = [
  { href: "https://www.linkedin.com/in/david-a-b6991b332/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://github.com/vitasec", label: "GitHub", Icon: Github },
  { href: "https://www.instagram.com/dddaaaaavvdd/", label: "Instagram", Icon: Instagram },
  { href: "https://youtube.com/come-in-soon", label: "YouTube", Icon: Youtube },
];

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Tessellation />

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
            vitasec
            </h1>
            <p className="mt-4 font-mono text-lg sm:text-xl">David Abdurahmanov</p>
            <p className="mt-2 font-mono text-sm text-muted-foreground sm:text-base">
              Pentester 
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
        href="mailto:davidabdurahmanov1@proton.me"
        className="fixed bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-md border border-border bg-card/80 px-3 py-2 font-mono text-xs text-foreground backdrop-blur transition-colors hover:bg-card"
      >
        <Mail className="h-3.5 w-3.5" />
        davidabdurahmanov1@proton.me
      </a>
    </main>
  );
}
