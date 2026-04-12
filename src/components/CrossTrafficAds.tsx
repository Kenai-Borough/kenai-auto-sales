import { motion } from 'framer-motion'
import { ArrowRight, Briefcase, Compass, House, Trees } from 'lucide-react'

const promos = [
  { icon: House, title: "Need a Garage? Browse Homes", description: "Find homes with shop space, driveways, and room for Alaska gear and toys.", href: "https://kenaihomesales.com", cta: "See homes", panelClass: "from-sky-500/15 to-slate-950/0", accentClass: "bg-sky-400" },
  { icon: Trees, title: "Find Land for Your Dream Shop", description: "Scout acreage for a build, storage yard, or cabin with work space.", href: "https://kenailandsales.com", cta: "Explore land", panelClass: "from-emerald-500/15 to-slate-950/0", accentClass: "bg-emerald-400" },
  { icon: Compass, title: "Explore the Kenai", description: "Use the local guide to plan events, fishing trips, and borough-wide stops.", href: "https://kenaiborough.com", cta: "Visit guide", panelClass: "from-cyan-500/15 to-slate-950/0", accentClass: "bg-cyan-400" },
  { icon: Briefcase, title: "Post Other Items for Sale", description: "Move parts, tools, trailers, and general gear through local classifieds.", href: "https://kenailistings.com", cta: "Open classifieds", panelClass: "from-lime-500/15 to-slate-950/0", accentClass: "bg-lime-400" },
] as const

export function CrossTrafficAds() {
  return (
    <section className="space-y-0">
      <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-glow">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Kenai Peninsula network</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Keep your search moving across the Kenai ecosystem.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">Helpful next steps from sister sites across the peninsula—property, rentals, vehicles, classifieds, and local guides that fit the moment naturally.</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {promos.map((promo, index) => {
            const Icon = promo.icon
            return (
              <motion.a
                key={promo.href}
                href={promo.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className={"relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow transition" + ' bg-gradient-to-br ' + promo.panelClass}
              >
                <span className={'absolute inset-y-4 left-0 w-1 rounded-full ' + promo.accentClass} />
                <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-slate-900 dark:bg-white/5 dark:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900 dark:text-white">{promo.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{promo.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110">
                  {promo.cta} <ArrowRight className="h-4 w-4" />
                </span>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
