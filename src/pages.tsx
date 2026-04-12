import { useMemo, useState } from 'react';
import { emailService } from './lib/email';
import { emailTemplates } from './lib/email-templates';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CarFront, Filter, Gauge, Landmark, Search, Shield, Sparkles, Truck, Users } from 'lucide-react';
import { Badge, Button, Card, FeaturedCarousel, FinanceCalculator, MapCard, MetricCard, SectionHeading, SellerCard, VehicleCard, useToast } from './components';
import { bodyTypes, conditionOptions, featureOptions, featuredVehicles, fuelOptions, homeStats, makes, models, sellerTypes, vehicles } from './data/vehicles';
import { currency, number } from './lib/utils';
import { CrossTrafficAds } from './components/CrossTrafficAds';

const cmpLabel = (price: number, marketAverage: number) => {
  const delta = price / marketAverage;
  if (delta <= 0.92) return 'Great deal';
  if (delta <= 0.99) return 'Good value';
  if (delta <= 1.08) return 'Fair price';
  return 'Overpriced';
};

const heroBackground = '/hero-illustration.svg';

export const HomePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ make: '', model: '', year: '', price: '80000', mileage: '120000' });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    Object.entries(search).forEach(([key, value]) => value && params.set(key, value));
    navigate(`/browse?${params.toString()}`);
  };

  return (
    <>
      <Helmet>
        <title>Kenai Auto Sales | Kenai Peninsula, Alaska</title>
        <meta name="description" content="Browse Kenai auto sales, Alaska trucks, boats, trailers, and snow-ready rigs with local filters built for Peninsula roads, work, and play." />
      </Helmet>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-rugged p-8 shadow-glow md:p-12">
        <img src={heroBackground} alt="Alaska truck in the wilderness" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/20" />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            <Badge className="bg-accent/15 text-orange-100">Rugged local marketplace · Dark mode by default</Badge>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">Find the right Alaska-ready ride for Kenai roads, trails, and tides.</h1>
              <p className="max-w-2xl text-base text-slate-200 sm:text-lg">Search winterized trucks, family SUVs, skiffs, sleds, and dealer inventory with cold-weather details that actually matter: block heaters, rust ratings, studded tires, and tow setups.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">{homeStats.map((item) => <MetricCard key={item.label} label={item.label} value={item.value} detail="Kenai Peninsula live marketplace snapshot" />)}</div>
          </div>

          <Card className="relative bg-slate-950/80">
            <div className="mb-5 flex items-center gap-2 text-white"><Search className="h-5 w-5 text-accent" /> Search the marketplace</div>
            <form className="grid gap-4" onSubmit={onSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <select value={search.make} onChange={(event) => setSearch((current) => ({ ...current, make: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"><option value="">Any make</option>{makes.map((make) => <option key={make}>{make}</option>)}</select>
                <select value={search.model} onChange={(event) => setSearch((current) => ({ ...current, model: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none"><option value="">Any model</option>{models.map((model) => <option key={model}>{model}</option>)}</select>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <input value={search.year} onChange={(event) => setSearch((current) => ({ ...current, year: event.target.value }))} placeholder="Min year" className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none" />
                <label className="space-y-2 text-sm text-slate-300"><span>Max price {currency(Number(search.price))}</span><input type="range" min="3000" max="90000" step="500" value={search.price} onChange={(event) => setSearch((current) => ({ ...current, price: event.target.value }))} className="w-full accent-accent" /></label>
                <label className="space-y-2 text-sm text-slate-300"><span>Max mileage {number(Number(search.mileage))}</span><input type="range" min="0" max="180000" step="5000" value={search.mileage} onChange={(event) => setSearch((current) => ({ ...current, mileage: event.target.value }))} className="w-full accent-accent" /></label>
              </div>
              <Button type="submit" className="w-full justify-center">Explore listings</Button>
            </form>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-300"><Badge>4WD favorites</Badge><Badge>Dealer inventory</Badge><Badge>Trail & tow rigs</Badge><Badge>Boats & sleds</Badge></div>
          </Card>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeading eyebrow="Featured inventory" title="Fresh local listings ready for the Peninsula" description="From F-150s and 4Runners to sleds, skiffs, and travel trailers, these featured listings pair great visuals with Alaska-specific specs." action={<Link to="/browse" className="text-sm font-semibold text-accent">View all inventory</Link>} />
        <FeaturedCarousel vehicles={featuredVehicles} />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          ['Buy local with confidence', 'See block heaters, rust ratings, winter packages, title status, and cold-weather mods before you drive out.'],
          ['Sell faster on Kenai', 'Launch a step-by-step seller flow with pricing cues, photo guidance, and dealer-grade presentation.'],
          ['Built for Alaska lifestyles', 'Filter for plow packages, tow setups, lift kits, studded tires, or AWD family haulers.'],
        ].map(([title, description]) => <Card key={title}><Sparkles className="h-8 w-8 text-accent" /><h3 className="mt-4 text-xl font-semibold text-white">{title}</h3><p className="mt-3 text-sm text-slate-300">{description}</p></Card>)}
      </section>

      <section className="grid gap-6 rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-4">
          <SectionHeading eyebrow="Sell your vehicle" title="List your truck, SUV, sled, or skiff in minutes" description="Publish with VIN/manual entry, Alaska condition details, market-aware pricing, and a polished review step." />
          <div className="grid gap-4 sm:grid-cols-2">{['Decode VIN or enter manually', 'Show mods, rust, and winter package', 'Upload up to 30 photos', 'Compare pricing before publish'].map((item) => <Badge key={item}>{item}</Badge>)}</div>
        </div>
        <Card className="flex flex-col justify-between gap-6 bg-accent/10">
          <div>
            <p className="text-sm text-orange-100">Seller momentum</p>
            <h3 className="mt-2 text-3xl font-semibold text-white">Average local listing goes live in under 9 minutes.</h3>
          </div>
          <Link to="/sell"><Button className="w-full justify-center">Start your listing</Button></Link>
        </Card>
      </section>
          <CrossTrafficAds />
</>
  );
};

export const BrowsePage = () => {
  const [params] = useSearchParams();
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState('newest');
  const [filters, setFilters] = useState({ make: params.get('make') ?? '', model: params.get('model') ?? '', year: Number(params.get('year') ?? 2015), price: Number(params.get('price') ?? 90000), mileage: Number(params.get('mileage') ?? 150000), bodyType: '', condition: '', feature: '', fuel: '', sellerType: '' });
  const results = useMemo(() => vehicles.filter((vehicle) => (!filters.make || vehicle.make === filters.make) && (!filters.model || vehicle.model === filters.model) && vehicle.year >= filters.year && vehicle.price <= filters.price && vehicle.mileage <= filters.mileage && (!filters.bodyType || vehicle.bodyType === filters.bodyType) && (!filters.condition || vehicle.condition === filters.condition) && (!filters.feature || vehicle.features.includes(filters.feature) || vehicle.modifications.includes(filters.feature)) && (!filters.fuel || vehicle.fuelType === filters.fuel) && (!filters.sellerType || vehicle.seller.type === filters.sellerType)).sort((a, b) => sort === 'price' ? a.price - b.price : sort === 'mileage' ? a.mileage - b.mileage : sort === 'year' ? b.year - a.year : b.views - a.views), [filters, sort]);

  return (
    <>
      <Helmet><title>Browse Vehicles | Kenai Auto Sales</title></Helmet>
      <SectionHeading eyebrow="Browse inventory" title="Dial in the exact rig, toy, or trailer you need" description="Filter by make, model, year, price, mileage, body type, condition, features, fuel, and seller type—then flip between card and list views." />
      <section className="grid gap-6 lg:grid-cols-[320px,1fr]">
        <Card className="space-y-5 self-start lg:sticky lg:top-24">
          <div className="flex items-center gap-2 text-white"><Filter className="h-5 w-5 text-accent" /> Filters</div>
          <div className="grid gap-4">
            <select value={filters.make} onChange={(event) => setFilters((current) => ({ ...current, make: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"><option value="">Any make</option>{makes.map((make) => <option key={make}>{make}</option>)}</select>
            <select value={filters.model} onChange={(event) => setFilters((current) => ({ ...current, model: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"><option value="">Any model</option>{models.map((model) => <option key={model}>{model}</option>)}</select>
            <label className="text-sm text-slate-300">Min year: {filters.year}<input type="range" min="2008" max="2024" value={filters.year} onChange={(event) => setFilters((current) => ({ ...current, year: Number(event.target.value) }))} className="mt-2 w-full accent-accent" /></label>
            <label className="text-sm text-slate-300">Max price: {currency(filters.price)}<input type="range" min="3000" max="90000" step="500" value={filters.price} onChange={(event) => setFilters((current) => ({ ...current, price: Number(event.target.value) }))} className="mt-2 w-full accent-accent" /></label>
            <label className="text-sm text-slate-300">Max mileage: {number(filters.mileage)} mi<input type="range" min="0" max="180000" step="5000" value={filters.mileage} onChange={(event) => setFilters((current) => ({ ...current, mileage: Number(event.target.value) }))} className="mt-2 w-full accent-accent" /></label>
            <select value={filters.bodyType} onChange={(event) => setFilters((current) => ({ ...current, bodyType: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"><option value="">Any body type</option>{bodyTypes.map((item) => <option key={item}>{item}</option>)}</select>
            <select value={filters.condition} onChange={(event) => setFilters((current) => ({ ...current, condition: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"><option value="">Any condition</option>{conditionOptions.map((item) => <option key={item}>{item}</option>)}</select>
            <select value={filters.feature} onChange={(event) => setFilters((current) => ({ ...current, feature: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"><option value="">Any feature</option>{featureOptions.map((item) => <option key={item}>{item}</option>)}</select>
            <select value={filters.fuel} onChange={(event) => setFilters((current) => ({ ...current, fuel: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"><option value="">Any fuel</option>{fuelOptions.map((item) => <option key={item}>{item}</option>)}</select>
            <select value={filters.sellerType} onChange={(event) => setFilters((current) => ({ ...current, sellerType: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white"><option value="">Any seller</option>{sellerTypes.map((item) => <option key={item}>{item}</option>)}</select>
          </div>
        </Card>
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-slate-300">{results.length} vehicles found</p>
            <div className="flex flex-wrap gap-3">
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-full border border-white/10 bg-slate-900 px-4 py-2 text-sm text-white"><option value="newest">Newest</option><option value="price">Price</option><option value="mileage">Mileage</option><option value="year">Year</option></select>
              <div className="flex rounded-full border border-white/10 bg-slate-900 p-1 text-sm">
                <button onClick={() => setView('grid')} className={`rounded-full px-4 py-2 ${view === 'grid' ? 'bg-accent text-white' : 'text-slate-300'}`}>Grid</button>
                <button onClick={() => setView('list')} className={`rounded-full px-4 py-2 ${view === 'list' ? 'bg-accent text-white' : 'text-slate-300'}`}>List</button>
              </div>
            </div>
          </div>
          <motion.div layout className="grid gap-5">{results.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} mode={view} />)}</motion.div>
        </div>
      </section>
    </>
  );
};

export const VehicleDetailPage = () => {
  const { id } = useParams();
  const vehicle = vehicles.find((item) => item.id === id) ?? vehicles[0];
  const [selectedPhoto, setSelectedPhoto] = useState(vehicle.photos[0]);
  const similar = vehicles.filter((item) => item.id !== vehicle.id && item.bodyType === vehicle.bodyType).slice(0, 3);

  return (
    <>
      <Helmet><title>{vehicle.year} {vehicle.make} {vehicle.model} | Kenai Auto Sales</title></Helmet>
      <section className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-6">
          <div className="space-y-4">
            <img src={selectedPhoto} alt={`${vehicle.make} ${vehicle.model}`} className="h-[28rem] w-full rounded-[2rem] object-cover" />
            <div className="grid gap-3 sm:grid-cols-3">{vehicle.photos.map((photo) => <button key={photo} onClick={() => setSelectedPhoto(photo)} className="overflow-hidden rounded-2xl border border-white/10"><img src={photo} alt="Vehicle detail" className="h-28 w-full object-cover" /></button>)}</div>
          </div>
          <Card className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm text-accent">{vehicle.location}</p>
                <h1 className="text-4xl font-semibold text-white">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
                <p className="mt-2 text-slate-300">{vehicle.trim} · {vehicle.condition} condition · {vehicle.postedAt}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-white">{currency(vehicle.price)}</p>
                <Badge className="mt-2 bg-emerald-500/10 text-emerald-100">{cmpLabel(vehicle.price, vehicle.marketAverage)}</Badge>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{[['Mileage', `${number(vehicle.mileage)} mi`], ['Engine', vehicle.engine], ['Transmission', vehicle.transmission], ['Drivetrain', vehicle.drivetrain], ['Fuel', vehicle.fuelType], ['Color', vehicle.color], ['Rust rating', vehicle.rustRating], ['Title', vehicle.titleStatus]].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4"><p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p><p className="mt-2 text-sm text-white">{value}</p></div>)}</div>
            <p className="text-sm leading-7 text-slate-300">{vehicle.description}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="bg-slate-950/70"><h3 className="text-lg font-semibold text-white">Features</h3><div className="mt-4 flex flex-wrap gap-2">{vehicle.features.map((feature) => <Badge key={feature}>{feature}</Badge>)}</div></Card>
              <Card className="bg-slate-950/70"><h3 className="text-lg font-semibold text-white">Alaska-specific notes</h3><ul className="mt-4 space-y-3 text-sm text-slate-300"><li>Winter package: {vehicle.winterPackage ? 'Installed' : 'Not installed'}</li><li>Studded tires: {vehicle.studdedTires ? 'Included' : 'Not included'}</li><li>Rust assessment: {vehicle.rustRating}</li><li>Modifications: {vehicle.modifications.join(', ')}</li><li>Accident history: {vehicle.accidentHistory}</li></ul></Card>
            </div>
          </Card>
          <FinanceCalculator price={vehicle.price} />
          <MapCard vehicle={vehicle} />
        </div>
        <div className="space-y-6">
          <SellerCard vehicle={vehicle} />
          <Card>
            <h3 className="text-lg font-semibold text-white">Price comparison</h3>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-300">Market average</p>
              <p className="text-2xl font-semibold text-white">{currency(vehicle.marketAverage)}</p>
              <p className="mt-2 text-sm text-slate-300">This listing is {vehicle.price <= vehicle.marketAverage ? currency(vehicle.marketAverage - vehicle.price) + ' below' : currency(vehicle.price - vehicle.marketAverage) + ' above'} the local average.</p>
            </div>
          </Card>
          <Card className="space-y-4"><h3 className="text-lg font-semibold text-white">Similar vehicles</h3>{similar.map((item) => <VehicleCard key={item.id} vehicle={item} />)}</Card>
        </div>
      </section>
    </>
  );
};

export const SellPage = () => {
  const steps = ['Vehicle basics', 'Condition & mods', 'Photos', 'Pricing', 'Review & publish'];
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ make: 'Toyota', model: 'Tacoma', year: '2020', price: 38500, vin: '', condition: 'good', mods: ['Lift kit', 'Tow package'] });
  const suggested = vehicles.find((vehicle) => vehicle.make === form.make && vehicle.model === form.model)?.marketAverage ?? 39500;

  return (
    <>
      <Helmet><title>Sell Your Vehicle | Kenai Auto Sales</title></Helmet>
      <SectionHeading eyebrow="Sell your vehicle" title="Launch a polished Alaska-ready listing in five steps" description="Decode a VIN or enter details manually, document winter gear, upload up to 30 photos, compare pricing, and publish with confidence." />
      <section className="grid gap-6 lg:grid-cols-[300px,1fr]">
        <Card className="space-y-4">{steps.map((label, index) => <div key={label} className={`rounded-2xl border px-4 py-3 ${index === step ? 'border-accent bg-accent/10 text-white' : 'border-white/10 text-slate-300'}`}><p className="text-xs uppercase tracking-[0.2em] text-slate-500">Step {index + 1}</p><p className="mt-1 font-medium">{label}</p></div>)}</Card>
        <Card className="space-y-6">
          {step === 0 && <div className="grid gap-4 md:grid-cols-2"><input placeholder="VIN" value={form.vin} onChange={(event) => setForm((current) => ({ ...current, vin: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" /><input placeholder="Year" value={form.year} onChange={(event) => setForm((current) => ({ ...current, year: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" /><input placeholder="Make" value={form.make} onChange={(event) => setForm((current) => ({ ...current, make: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" /><input placeholder="Model" value={form.model} onChange={(event) => setForm((current) => ({ ...current, model: event.target.value }))} className="rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" /></div>}
          {step === 1 && <div className="space-y-4"><select value={form.condition} onChange={(event) => setForm((current) => ({ ...current, condition: event.target.value }))} className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"><option>new</option><option>excellent</option><option>good</option><option>fair</option><option>project</option></select><div className="flex flex-wrap gap-2">{['4WD/AWD', 'Heated seats', 'Remote start', 'Studded tires', 'Plow package', 'Tow package', 'Lift kit', 'Winch'].map((mod) => <button key={mod} onClick={() => setForm((current) => ({ ...current, mods: current.mods.includes(mod) ? current.mods.filter((item) => item !== mod) : [...current.mods, mod] }))} className={`rounded-full border px-3 py-2 text-sm ${form.mods.includes(mod) ? 'border-accent bg-accent/10 text-white' : 'border-white/10 text-slate-300'}`}>{mod}</button>)}</div></div>}
          {step === 2 && <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">{Array.from({ length: 10 }).map((_, index) => <div key={index} className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-white/15 bg-slate-950/70 text-sm text-slate-400">Photo {index + 1}</div>)}</div>}
          {step === 3 && <div className="space-y-4"><label className="block text-sm text-slate-300">Ask price<input type="range" min="3000" max="90000" step="500" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: Number(event.target.value) }))} className="mt-2 w-full accent-accent" /></label><div className="grid gap-4 md:grid-cols-2"><Card className="bg-slate-950/60"><p className="text-sm text-slate-400">Your price</p><p className="mt-2 text-2xl font-semibold text-white">{currency(form.price)}</p></Card><Card className="bg-slate-950/60"><p className="text-sm text-slate-400">Local market comparison</p><p className="mt-2 text-2xl font-semibold text-white">{currency(suggested)}</p></Card></div></div>}
          {step === 4 && <div className="space-y-4 text-sm text-slate-300"><p><span className="text-white">Vehicle:</span> {form.year} {form.make} {form.model}</p><p><span className="text-white">Condition:</span> {form.condition}</p><p><span className="text-white">Mods:</span> {form.mods.join(', ')}</p><p><span className="text-white">Price:</span> {currency(form.price)}</p><Card className="bg-accent/10 text-orange-100">Ready to publish to buyers, sellers, and dealer leads across the Peninsula.</Card></div>}
          <div className="flex flex-wrap justify-between gap-3">
            <Button className="bg-white/10" disabled={step === 0} onClick={() => setStep((current) => Math.max(current - 1, 0))}>Back</Button>
            <Button onClick={() => setStep((current) => Math.min(current + 1, steps.length - 1))}>{step === steps.length - 1 ? 'Publish listing' : 'Continue'}</Button>
          </div>
        </Card>
      </section>
    </>
  );
};

export const DashboardPage = () => {
  const inventoryMix = [{ name: 'Trucks', value: 36 }, { name: 'SUVs', value: 28 }, { name: 'Powersports', value: 20 }, { name: 'Boats/RVs', value: 16 }];
  const performance = [{ week: 'Mon', views: 220 }, { week: 'Tue', views: 260 }, { week: 'Wed', views: 310 }, { week: 'Thu', views: 340 }, { week: 'Fri', views: 390 }, { week: 'Sat', views: 420 }, { week: 'Sun', views: 360 }];

  return (
    <>
      <Helmet><title>Dashboard | Kenai Auto Sales</title></Helmet>
      <SectionHeading eyebrow="Dashboard" title="Seller, buyer, dealer, and admin signals in one view" description="Track active listings, saved vehicles, inventory health, inquiries, and local traffic at a glance." />
      <section className="grid gap-6 xl:grid-cols-4">{[['Active listings', '18', 'Seller inventory live'], ['Saved vehicles', '42', 'Buyer shortlist'], ['Dealer leads', '27', 'This week'], ['Profile views', '3.1k', 'Trailing 30 days']].map(([label, value, detail]) => <MetricCard key={label} label={label} value={value} detail={detail} />)}</section>
      <section className="grid gap-6 lg:grid-cols-2">
        <Card><div className="mb-4 flex items-center gap-2 text-white"><Gauge className="h-5 w-5 text-accent" /> Listing traffic</div><ResponsiveContainer width="100%" height={280}><AreaChart data={performance}><defs><linearGradient id="views" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f97316" stopOpacity={0.6} /><stop offset="95%" stopColor="#f97316" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#1e293b" /><XAxis dataKey="week" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Area type="monotone" dataKey="views" stroke="#f97316" fill="url(#views)" /></AreaChart></ResponsiveContainer></Card>
        <Card><div className="mb-4 flex items-center gap-2 text-white"><Truck className="h-5 w-5 text-accent" /> Inventory mix</div><ResponsiveContainer width="100%" height={280}><PieChart><Pie data={inventoryMix} dataKey="value" nameKey="name" outerRadius={90} fill="#f97316" /><Tooltip /></PieChart></ResponsiveContainer></Card>
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <Card><Users className="h-8 w-8 text-accent" /><h3 className="mt-4 text-xl font-semibold text-white">Buyer tools</h3><ul className="mt-4 space-y-2 text-sm text-slate-300"><li>Saved vehicles and searches</li><li>Message center for seller responses</li><li>Financing watchlist and alerts</li></ul></Card>
        <Card><CarFront className="h-8 w-8 text-accent" /><h3 className="mt-4 text-xl font-semibold text-white">Seller tools</h3><ul className="mt-4 space-y-2 text-sm text-slate-300"><li>Listing performance and views</li><li>Inquiry tracking by source</li><li>Price drop suggestions</li></ul></Card>
        <Card><Shield className="h-8 w-8 text-accent" /><h3 className="mt-4 text-xl font-semibold text-white">Admin controls</h3><ul className="mt-4 space-y-2 text-sm text-slate-300"><li>Moderation queue</li><li>Risk alerts and fraud checks</li><li>Marketplace health analytics</li></ul></Card>
      </section>
    </>
  );
};

export const DealerPage = () => {
  const dealerRows = vehicles.filter((vehicle) => vehicle.seller.type === 'dealer').slice(0, 6);
  const { push } = useToast();

  return (
    <>
      <Helmet><title>Dealer Portal | Kenai Auto Sales</title></Helmet>
      <SectionHeading eyebrow="Dealer portal" title="Inventory management and lead tracking for Kenai dealers" description="Bulk upload inventory, manage featured placements, and turn local traffic into qualified leads." />
      <section className="grid gap-6 xl:grid-cols-[1fr,0.85fr]">
        <Card>
          <h3 className="text-xl font-semibold text-white">Inventory management</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-300">
              <thead className="text-slate-500"><tr><th className="pb-3">Vehicle</th><th className="pb-3">Price</th><th className="pb-3">Views</th><th className="pb-3">Status</th></tr></thead>
              <tbody>{dealerRows.map((vehicle) => <tr key={vehicle.id} className="border-t border-white/10"><td className="py-3 text-white">{vehicle.year} {vehicle.make} {vehicle.model}</td><td>{currency(vehicle.price)}</td><td>{vehicle.views}</td><td><Badge>{vehicle.status}</Badge></td></tr>)}</tbody>
            </table>
          </div>
        </Card>
        <div className="grid gap-6">
          <Card><h3 className="text-xl font-semibold text-white">Lead funnel</h3><ResponsiveContainer width="100%" height={240}><BarChart data={[{ stage: 'Views', count: 940 }, { stage: 'Saves', count: 212 }, { stage: 'Leads', count: 61 }, { stage: 'Appointments', count: 19 }]}><CartesianGrid stroke="#1e293b" /><XAxis dataKey="stage" stroke="#94a3b8" /><YAxis stroke="#94a3b8" /><Tooltip /><Bar dataKey="count" fill="#f97316" radius={[10, 10, 0, 0]} /></BarChart></ResponsiveContainer></Card>
          <Card className="bg-accent/10"><h3 className="text-xl font-semibold text-white">Featured placement upsell</h3><p className="mt-3 text-sm text-orange-100">Reserve homepage carousel space, spotlight your winter inventory, and syndicate top listings across sister sites in the Kenai network.</p><Button className="mt-5" onClick={() => void (async () => { const leadEmail = emailTemplates.dealerLeadNotification({ campaignName: 'Featured placement request', contactName: 'Dealer portal visitor', contactEmail: 'dealer@kenaiautosales.com', detailUrl: `${window.location.origin}/dealer` }); const result = await emailService.send({ to: 'hello@kenaiautosales.com', ...leadEmail, metadata: { notificationType: 'dealer-lead' } }); push(result.queued ? 'Featured placement request saved. Email delivery may be delayed.' : 'Featured placement request sent to the network team.') })()}>Request featured placement</Button></Card>
        </div>
      </section>
    </>
  );
};

export const BuyersGuidePage = () => (
  <>
    <Helmet><title>Buyer's Guide | Kenai Auto Sales</title></Helmet>
    <SectionHeading eyebrow="Buyer's guide" title="Alaska-first advice for buying the right local vehicle" description="Use this guide to evaluate winter equipment, rust, paperwork, and DMV steps before you buy." />
    <section className="grid gap-6 lg:grid-cols-3">{[['Title transfer checklist', 'Verify VIN, title status, lien release, bill of sale, and emissions/inspection paperwork before exchanging funds.'], ['Winter essentials', 'Prioritize 4WD/AWD, block heater, healthy battery, studded or quality winter tires, and a rust-resistant underbody.'], ['Rust inspection guide', 'Check brake lines, rocker panels, suspension mounting points, wheel wells, and hitch/tow points for salt exposure.']].map(([title, body]) => <Card key={title}><Landmark className="h-8 w-8 text-accent" /><h3 className="mt-4 text-xl font-semibold text-white">{title}</h3><p className="mt-3 text-sm text-slate-300">{body}</p></Card>)}</section>
    <section className="grid gap-6 lg:grid-cols-2">
      <Card><h3 className="text-xl font-semibold text-white">Kenai-specific winter must-haves</h3><ul className="mt-4 space-y-3 text-sm text-slate-300"><li>4WD/AWD or locking diff for icy access roads</li><li>Block heater and battery warmer for sub-zero starts</li><li>Studded tires or fresh snow-rated rubber</li><li>Tow points, recovery strap, and emergency kit</li><li>Rust proofing and regular underbody rinses</li></ul></Card>
      <Card><h3 className="text-xl font-semibold text-white">Helpful Alaska resources</h3><div className="mt-4 space-y-3 text-sm text-slate-300"><a className="block text-accent" href="https://doa.alaska.gov/dmv/titles/">Alaska DMV title & registration</a><a className="block text-accent" href="https://511.alaska.gov/">Alaska road conditions</a><a className="block text-accent" href="https://www.weather.gov/afc/">National Weather Service Anchorage</a></div></Card>
    </section>
  </>
);

export const AuthPage = () => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const { push } = useToast();

  return (
    <>
      <Helmet><title>Sign In | Kenai Auto Sales</title></Helmet>
      <section className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <Card className="bg-accent/10"><h1 className="text-3xl font-semibold text-white">Access buyer, seller, dealer, and admin tools.</h1><p className="mt-4 text-sm text-orange-100">Supabase auth is prewired for email/password and role-based access. Connect your project credentials to enable production auth.</p></Card>
        <Card>
          <div className="mb-6 flex rounded-full border border-white/10 bg-slate-900 p-1 text-sm">
            <button onClick={() => setMode('signin')} className={`rounded-full px-4 py-2 ${mode === 'signin' ? 'bg-accent text-white' : 'text-slate-300'}`}>Sign in</button>
            <button onClick={() => setMode('signup')} className={`rounded-full px-4 py-2 ${mode === 'signup' ? 'bg-accent text-white' : 'text-slate-300'}`}>Create account</button>
          </div>
          <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); push(`${mode === 'signin' ? 'Sign in' : 'Sign up'} flow ready for Supabase.`); }}>
            <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="Email" />
            <input className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white" placeholder="Password" type="password" />
            {mode === 'signup' && <select className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white"><option>buyer</option><option>seller</option><option>dealer</option><option>admin</option></select>}
            <Button type="submit" className="w-full justify-center">{mode === 'signin' ? 'Sign in' : 'Create account'}</Button>
          </form>
        </Card>
      </section>
    </>
  );
};

export const AdminPage = () => (
  <>
    <Helmet><title>Admin | Kenai Auto Sales</title></Helmet>
    <SectionHeading eyebrow="Admin" title="Moderation, users, and marketplace analytics" description="Review suspicious listings, inspect category trends, and manage role-based access for buyers, sellers, dealers, and admins." />
    <section className="grid gap-6 lg:grid-cols-3">
      <Card><h3 className="text-xl font-semibold text-white">Moderation queue</h3><ul className="mt-4 space-y-3 text-sm text-slate-300"><li>2018 Silverado · duplicate photo flag</li><li>Dealer profile · missing business license</li><li>High-value sled · manual review for pricing anomaly</li></ul></Card>
      <Card><h3 className="text-xl font-semibold text-white">User roles</h3><ul className="mt-4 space-y-3 text-sm text-slate-300"><li>Buyers: 1,420</li><li>Sellers: 390</li><li>Dealers: 24</li><li>Admins: 3</li></ul></Card>
      <Card><h3 className="text-xl font-semibold text-white">Marketplace health</h3><ul className="mt-4 space-y-3 text-sm text-slate-300"><li>Spam rate: 0.4%</li><li>Average time to lead: 3.1 hrs</li><li>Featured listing CTR: 11.8%</li></ul></Card>
    </section>
  </>
);

export const NotFoundPage = () => <section className="mx-auto max-w-xl text-center"><Helmet><title>Not Found | Kenai Auto Sales</title></Helmet><Card><h1 className="text-3xl font-semibold text-white">That route drifted off trail.</h1><p className="mt-4 text-sm text-slate-300">Try heading back to the marketplace homepage.</p><Link to="/"><Button className="mt-6">Return home</Button></Link></Card></section>;
