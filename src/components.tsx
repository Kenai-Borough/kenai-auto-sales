import { Component, createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import { Bell, CarFront, ChevronLeft, ChevronRight, Heart, Mail, MapPin, Menu, Moon, ShieldCheck, Star, Sun } from 'lucide-react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import type { ThemeMode, Vehicle } from './types';
import { cn, currency, monthlyPayment, number } from './lib/utils';
import { KenaiNetworkBanner } from './components/KenaiNetworkBanner';
import { KenaiNetworkBadge } from './components/KenaiNetworkBadge';
import { useKenaiAuth } from './contexts/KenaiAuthContext';

const networkLinks = [
  ['Kenai Borough', 'https://kenaiborough.com'],
  ['Kenai Borough Realty', 'https://kenaiboroughrealty.com'],
  ['Kenai Land Sales', 'https://kenailandsales.com'],
  ['Kenai Peninsula Rentals', 'https://kenaipeninsularentals.com'],
  ['Kenai Home Sales', 'https://kenaihomesales.com'],
  ['Kenai News', 'https://kenainews.com'],
  ['Kenai Listings', 'https://kenailistings.com'],
] as const;

export const Button = ({ className, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={cn('inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60', className)} {...props}>{children}</button>
);

export const Badge = ({ className, children }: PropsWithChildren<{ className?: string }>) => (
  <span className={cn('inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200', className)}>{children}</span>
);

export const Card = ({ className, children }: PropsWithChildren<{ className?: string }>) => (
  <div className={cn('rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur', className)}>{children}</div>
);

export const SectionHeading = ({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) => (
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="max-w-2xl text-sm text-slate-300 sm:text-base">{description}</p>
    </div>
    {action}
  </div>
);

export const MetricCard = ({ label, value, detail }: { label: string; value: string; detail: string }) => (
  <Card className="bg-slate-900/70">
    <p className="text-sm text-slate-400">{label}</p>
    <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    <p className="mt-2 text-sm text-slate-300">{detail}</p>
  </Card>
);

export const VehicleCard = ({ vehicle, mode = 'grid' }: { vehicle: Vehicle; mode?: 'grid' | 'list' }) => (
  <motion.article layout className={cn('overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 shadow-glow', mode === 'list' && 'grid gap-0 md:grid-cols-[320px,1fr]')}>
    <div className="relative h-60 overflow-hidden md:h-full">
      <img src={vehicle.photos[0]} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} className="h-full w-full object-cover" />
      <div className="absolute left-4 top-4 flex flex-wrap gap-2">
        <Badge>{vehicle.bodyType}</Badge>
        {vehicle.winterPackage && <Badge className="bg-accent/20 text-orange-100">Winter package</Badge>}
      </div>
    </div>
    <div className="flex flex-col gap-4 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-accent">{vehicle.postedAt}</p>
          <h3 className="text-2xl font-semibold text-white">{vehicle.year} {vehicle.make} {vehicle.model}</h3>
          <p className="text-sm text-slate-300">{vehicle.trim} · {vehicle.location}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{currency(vehicle.price)}</p>
          <p className="text-xs text-emerald-300">{vehicle.price <= vehicle.marketAverage ? 'Priced below market' : 'Premium listing'}</p>
        </div>
      </div>
      <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-3">
        <div><span className="text-slate-500">Mileage</span><div>{number(vehicle.mileage)} mi</div></div>
        <div><span className="text-slate-500">Drivetrain</span><div>{vehicle.drivetrain}</div></div>
        <div><span className="text-slate-500">Condition</span><div className="capitalize">{vehicle.condition}</div></div>
      </div>
      <div className="flex flex-wrap gap-2">{vehicle.features.slice(0, 4).map((feature) => <Badge key={feature}>{feature}</Badge>)}</div>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-slate-300"><Heart className="h-4 w-4 text-accent" /> {vehicle.views} local views</div>
        <Link to={`/vehicle/${vehicle.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-accent">View details</Link>
      </div>
    </div>
  </motion.article>
);

export const FeaturedCarousel = ({ vehicles }: { vehicles: Vehicle[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });
  return (
    <div className="space-y-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {vehicles.map((vehicle) => <div key={vehicle.id} className="min-w-0 flex-[0_0_100%] md:flex-[0_0_55%] xl:flex-[0_0_40%]"><VehicleCard vehicle={vehicle} /></div>)}
        </div>
      </div>
      <div className="flex gap-3">
        <Button className="bg-white/10" onClick={() => emblaApi?.scrollPrev()}><ChevronLeft className="h-4 w-4" /> Prev</Button>
        <Button className="bg-white/10" onClick={() => emblaApi?.scrollNext()}>Next <ChevronRight className="h-4 w-4" /></Button>
      </div>
    </div>
  );
};

const ToastContext = createContext<{ push: (message: string) => void }>({ push: () => undefined });

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<{ id: number; message: string }[]>([]);
  const value = useMemo(() => ({
    push: (message: string) => {
      const id = Date.now();
      setToasts((current) => [...current, { id, message }]);
      window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 2800);
    },
  }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-3 px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div key={toast.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} className="rounded-2xl border border-white/10 bg-slate-900/95 px-4 py-3 text-sm text-white shadow-glow">
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

export const FinanceCalculator = ({ price }: { price: number }) => {
  const [down, setDown] = useState(Math.round(price * 0.1));
  const [rate, setRate] = useState(7.1);
  const [months, setMonths] = useState(60);
  const payment = monthlyPayment(price, down, rate, months);

  return (
    <Card className="space-y-4">
      <div className="text-white">Financing calculator</div>
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ['Down payment', down, setDown, 0, price],
          ['APR %', rate, setRate, 0, 20],
          ['Term (months)', months, setMonths, 24, 84],
        ].map(([label, value, setter, min, max]) => (
          <label key={String(label)} className="space-y-2 text-sm text-slate-300">
            <span>{String(label)}</span>
            <input className="w-full accent-accent" type="range" min={Number(min)} max={Number(max)} step={label === 'APR %' ? 0.1 : 1} value={Number(value)} onChange={(event) => (setter as (value: number) => void)(Number(event.target.value))} />
            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-white">{label === 'APR %' ? `${Number(value).toFixed(1)}%` : label === 'Term (months)' ? `${value} mo` : currency(Number(value))}</div>
          </label>
        ))}
      </div>
      <div className="rounded-2xl border border-accent/30 bg-accent/10 p-4 text-white">
        <p className="text-sm text-orange-100">Estimated monthly payment</p>
        <p className="text-3xl font-bold">{currency(payment)}</p>
      </div>
    </Card>
  );
};

export const MapCard = ({ vehicle }: { vehicle: Vehicle }) => (
  <Card className="overflow-hidden p-0">
    <div className="border-b border-white/10 px-5 py-4 text-sm text-slate-300"><MapPin className="mr-2 inline h-4 w-4 text-accent" /> Approximate listing location · {vehicle.location}</div>
    <MapContainer center={[vehicle.lat, vehicle.lng]} zoom={9} scrollWheelZoom={false} className="h-72 w-full">
      <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <CircleMarker center={[vehicle.lat, vehicle.lng]} radius={10} pathOptions={{ color: '#f97316', fillColor: '#f97316', fillOpacity: 0.9 }}>
        <Popup>{vehicle.year} {vehicle.make} {vehicle.model}</Popup>
      </CircleMarker>
    </MapContainer>
  </Card>
);

export const SellerCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const { push } = useToast();
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-400">Seller</p>
          <h3 className="text-xl font-semibold text-white">{vehicle.seller.dealerName ?? vehicle.seller.name}</h3>
          <p className="text-sm text-slate-300">{vehicle.seller.location} · {vehicle.seller.responseTime}</p>
        </div>
        <Badge className="bg-emerald-500/10 text-emerald-200"><Star className="mr-1 inline h-3 w-3" /> {vehicle.seller.rating.toFixed(1)}</Badge>
      </div>
      <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
        <div><span className="text-slate-500">Seller type</span><div className="capitalize">{vehicle.seller.type}</div></div>
        <div><span className="text-slate-500">Contact</span><div>{vehicle.seller.phone}</div></div>
      </div>
      <form className="space-y-3" onSubmit={(event) => { event.preventDefault(); push(`Inquiry sent for ${vehicle.make} ${vehicle.model}.`); }}>
        <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none" placeholder="Your name" />
        <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none" placeholder="Email or phone" />
        <textarea className="min-h-28 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none" defaultValue={`Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model}. Is it still available?`} />
        <Button type="submit" className="w-full"><Mail className="h-4 w-4" /> Contact seller</Button>
      </form>
    </Card>
  );
};

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => (document.documentElement.classList.contains('dark') ? 'dark' : 'light'));
  const auth = useKenaiAuth();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('kenai-auto-sales-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background bg-aurora text-ink">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3 text-white">
            <div className="rounded-2xl bg-accent/15 p-2 text-accent"><CarFront className="h-6 w-6" /></div>
            <div>
              <div className="font-semibold">Kenai Auto Sales</div>
              <div className="text-xs text-slate-400">Alaska's local auto marketplace</div>
            </div>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-slate-300 md:flex">
            {[
              ['Browse', '/browse'],
              ['Sell', '/sell'],
              ['Dashboard', '/dashboard'],
              ['Dealer Portal', '/dealer'],
              ["Buyer's Guide", '/buyers-guide'],
              ['Admin', '/admin'],
            ].map(([label, href]) => <NavLink key={href} to={href} className={({ isActive }) => cn('transition hover:text-white', isActive && 'text-white')}>{label}</NavLink>)}
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <button onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} className="rounded-full border border-white/10 p-2 text-slate-200">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {auth.user ? <KenaiNetworkBadge /> : null}
            {auth.user ? <><Link to="/account" className="rounded-full border border-white/10 px-4 py-2 text-sm text-white">Account</Link><button onClick={() => void auth.signOut()} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white">Sign out</button></> : <Link to="/sign-in" className="rounded-full border border-white/10 px-4 py-2 text-sm text-white">Sign in</Link>}
          </div>
          <button onClick={() => setMobileOpen((current) => !current)} className="rounded-full border border-white/10 p-2 text-white md:hidden"><Menu className="h-5 w-5" /></button>
        </div>
        {mobileOpen && <div className="border-t border-white/10 px-4 py-4 md:hidden"><div className="flex flex-col gap-3 text-sm text-slate-200">{[['Browse', '/browse'], ['Sell', '/sell'], ['Dashboard', '/dashboard'], ['Dealer', '/dealer'], ["Buyer's Guide", '/buyers-guide'], [auth.user ? 'Account' : 'Sign in', auth.user ? '/account' : '/sign-in']].map(([label, href]) => <Link key={href} to={href} onClick={() => setMobileOpen(false)}>{label}</Link>)}</div></div>}
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-8 sm:px-6 lg:px-8"><Outlet /></main>
      <footer className="border-t border-white/10 bg-slate-950/90">
        <KenaiNetworkBanner />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:px-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-white">Built for Alaska buyers, sellers, and dealers.</h3>
            <p className="max-w-2xl text-sm text-slate-300">Find winter-ready trucks, local dealer inventory, and sleds or skiffs ready for Kenai Peninsula life.</p>
            <div className="flex flex-wrap gap-2">
              <Badge><ShieldCheck className="mr-1 inline h-3 w-3" /> Verified local marketplace</Badge>
              <Badge><Bell className="mr-1 inline h-3 w-3" /> Saved searches & alerts</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Kenai Network</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {networkLinks.map(([label, href]) => <a key={href} href={href} className="text-sm text-slate-300 transition hover:text-white">{label}</a>)}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export class ErrorBoundary extends Component<PropsWithChildren, { hasError: boolean }> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center text-white"><Card className="max-w-lg"><h1 className="text-2xl font-semibold">Something went sideways.</h1><p className="mt-3 text-slate-300">Refresh to reload Kenai Auto Sales.</p></Card></div>;
    }

    return this.props.children;
  }
}
