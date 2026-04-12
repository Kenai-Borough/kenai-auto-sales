import type { BodyType, Vehicle } from '../types';

const photoSets = {
  truck: [
    'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80',
  ],
  SUV: [
    'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80',
  ],
  sedan: [
    'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
  ],
  van: [
    'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1200&q=80',
  ],
  ATV: [
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1501706362039-c6e80948cc5f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1200&q=80',
  ],
  snowmobile: [
    'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=1200&q=80',
  ],
  boat: [
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1528150177508-5c79f4f6f1de?auto=format&fit=crop&w=1200&q=80',
  ],
  RV: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1520637836862-4d197d17c90a?auto=format&fit=crop&w=1200&q=80',
  ],
} satisfies Record<BodyType, string[]>;

const baseFeatures = ['Block heater', 'All-weather mats', 'Winterized battery', 'Remote start'];
const alaskaFeatures = ['4WD/AWD', 'Heated seats', 'Winter tires', 'Tow package', 'Studded tires'];

const sellers = {
  private: {
    name: 'Mason Hale',
    type: 'private' as const,
    phone: '(907) 555-0112',
    location: 'Soldotna, AK',
    rating: 4.8,
    responseTime: 'Usually replies in 20 min',
  },
  dealer: {
    name: 'Kenai Trail Motors',
    type: 'dealer' as const,
    phone: '(907) 555-0188',
    location: 'Kenai, AK',
    rating: 4.9,
    responseTime: 'Dealer desk open 8a–8p',
    dealerName: 'Kenai Trail Motors',
  },
};

type Seed = [
  string,
  number,
  string,
  string,
  string,
  BodyType,
  number,
  number,
  Vehicle['condition'],
  Vehicle['fuelType'],
  string,
  string,
  string,
  string,
  'private' | 'dealer',
  string,
  number,
  number,
  string[],
  number,
];

const seeds: Seed[] = [
  ['f150-lariat', 2021, 'Ford', 'F-150', 'Lariat FX4', 'truck', 48210, 53900, 'excellent', 'gas', '10-speed automatic', '4WD', '3.5L EcoBoost', 'Antimatter Blue', 'private', 'Soldotna', 60.4864, -151.0583, ['Plow package', 'Lift kit'], 57100],
  ['f250-xl', 2018, 'Ford', 'F-250', 'XL Super Duty', 'truck', 78120, 38900, 'good', 'diesel', '6-speed automatic', '4WD', '6.7L Power Stroke', 'Oxford White', 'dealer', 'Kenai', 60.5544, -151.2583, ['Service body', 'Tow mirrors'], 41200],
  ['ram1500-laramie', 2020, 'Ram', '1500', 'Laramie', 'truck', 54220, 44950, 'excellent', 'gas', '8-speed automatic', '4WD', '5.7L HEMI', 'Granite Crystal', 'dealer', 'Soldotna', 60.4864, -151.0583, ['Plow package', 'Bed cover'], 46800],
  ['silverado-trail', 2019, 'Chevrolet', 'Silverado 1500', 'LT Trail Boss', 'truck', 66140, 41200, 'good', 'gas', '8-speed automatic', '4WD', '5.3L V8', 'Satin Steel', 'private', 'Nikiski', 60.6906, -151.2888, ['Lift kit', 'Winch'], 42500],
  ['tacoma-trd', 2022, 'Toyota', 'Tacoma', 'TRD Off-Road', 'truck', 28550, 45800, 'excellent', 'gas', '6-speed automatic', '4WD', '3.5L V6', 'Lunar Rock', 'dealer', 'Kenai', 60.5544, -151.2583, ['Roof rack', 'All-terrain tires'], 47900],
  ['tundra-limited', 2023, 'Toyota', 'Tundra', 'Limited TRD', 'truck', 14980, 64900, 'new', 'hybrid', '10-speed automatic', '4WD', '3.4L i-FORCE MAX', 'Magnetic Gray', 'dealer', 'Soldotna', 60.4864, -151.0583, ['Tow package', 'Skid plates'], 67100],
  ['outback-wilderness', 2022, 'Subaru', 'Outback', 'Wilderness', 'SUV', 32100, 37900, 'excellent', 'gas', 'CVT', 'AWD', '2.4L Turbo', 'Geyser Blue', 'private', 'Homer', 59.6425, -151.5483, ['Studded tires', 'Cargo platform'], 39500],
  ['4runner-limited', 2021, 'Toyota', '4Runner', 'Limited', 'SUV', 40220, 49850, 'excellent', 'gas', '5-speed automatic', '4WD', '4.0L V6', 'Midnight Black', 'dealer', 'Kenai', 60.5544, -151.2583, ['Remote start', 'Tow package'], 52100],
  ['wrangler-rubicon', 2019, 'Jeep', 'Wrangler', 'Rubicon', 'SUV', 51200, 36500, 'good', 'gas', '8-speed automatic', '4WD', '3.6L V6', 'Firecracker Red', 'private', 'Soldotna', 60.4864, -151.0583, ['Lift kit', 'Winch'], 38100],
  ['sequoia-plat', 2023, 'Toyota', 'Sequoia', 'Platinum', 'SUV', 18500, 69200, 'new', 'hybrid', '10-speed automatic', '4WD', '3.5L Twin Turbo', 'Celestial Silver', 'dealer', 'Kenai', 60.5544, -151.2583, ['Tow package', 'Roof box'], 71800],
  ['model-y-awd', 2023, 'Tesla', 'Model Y', 'Long Range', 'SUV', 12450, 46900, 'excellent', 'electric', 'Single-speed', 'AWD', 'Dual Motor', 'Pearl White', 'private', 'Soldotna', 60.4864, -151.0583, ['Heated steering wheel', 'Winter package'], 49200],
  ['sienna-xle', 2020, 'Toyota', 'Sienna', 'XLE AWD', 'van', 58770, 33800, 'good', 'gas', '8-speed automatic', 'AWD', '3.5L V6', 'Predawn Gray', 'dealer', 'Kenai', 60.5544, -151.2583, ['Roof rack', 'Remote start'], 35100],
  ['polaris-ranger', 2021, 'Polaris', 'Ranger', 'XP 1000 Northstar', 'ATV', 2110, 14900, 'excellent', 'gas', 'Automatic', 'AWD', '999cc', 'Stealth Gray', 'private', 'Ninilchik', 60.0519, -151.6687, ['Winch', 'Cab heater'], 15800],
  ['honda-pioneer', 2020, 'Honda', 'Pioneer', '1000-5 Deluxe', 'ATV', 3340, 13200, 'good', 'gas', 'Automatic', '4WD', '999cc', 'Phantom Camo', 'dealer', 'Soldotna', 60.4864, -151.0583, ['Snow plow', 'Windshield'], 13950],
  ['arcticcat-zr', 2022, 'Arctic Cat', 'ZR', '8000 Riot', 'snowmobile', 980, 13800, 'excellent', 'gas', 'CVT', 'Track drive', '794cc C-TEC2', 'Team Arctic', 'private', 'Cooper Landing', 60.485, -149.8294, ['Studded track', 'Tunnel bag'], 14200],
  ['ski-doo-expedition', 2021, 'Ski-Doo', 'Expedition', 'SE 900 ACE', 'snowmobile', 1420, 12400, 'excellent', 'gas', 'CVT', 'Track drive', '899cc ACE', 'Black/Yellow', 'dealer', 'Kenai', 60.5544, -151.2583, ['Tow hitch', 'Wide track'], 13050],
  ['lund-skiff', 2018, 'Lund', 'Adventure', '1775 Sport', 'boat', 0, 22800, 'good', 'gas', 'Outboard', 'Twin axle trailer', '90hp Mercury', 'Silver', 'private', 'Homer', 59.6425, -151.5483, ['Fish finder', 'Canvas cover'], 24100],
  ['hewescraft-ocean', 2020, 'Hewescraft', 'Ocean Pro', '180', 'boat', 0, 29800, 'excellent', 'gas', 'Outboard', 'Trailer included', '115hp Yamaha', 'Arctic White', 'dealer', 'Soldotna', 60.4864, -151.0583, ['Downriggers', 'Heater'], 31200],
  ['north-river', 2021, 'North River', 'Commander', '20', 'boat', 0, 41900, 'excellent', 'gas', 'Outboard', 'Trailer included', '150hp Yamaha', 'Gunmetal', 'dealer', 'Kenai', 60.5544, -151.2583, ['Radar', 'Cabin heater'], 43800],
  ['winnebago-solis', 2022, 'Winnebago', 'Solis', '59PX', 'RV', 18920, 86400, 'excellent', 'gas', '9-speed automatic', 'FWD', '3.6L Pentastar', 'Bright White', 'dealer', 'Soldotna', 60.4864, -151.0583, ['Solar', 'Lithium system'], 88900],
  ['forestriver-cherokee', 2019, 'Forest River', 'Cherokee', 'Wolf Pup', 'RV', 0, 18900, 'good', 'gas', 'Towable', 'Towable', 'Travel trailer', 'Gray', 'private', 'Kenai', 60.5544, -151.2583, ['Battery upgrade', 'Winter skirt'], 20100],
  ['rav4-hybrid', 2021, 'Toyota', 'RAV4', 'XSE Hybrid', 'SUV', 44440, 35900, 'excellent', 'hybrid', 'CVT', 'AWD', '2.5L Hybrid', 'Blueprint', 'private', 'Soldotna', 60.4864, -151.0583, ['Weather package', 'Cross bars'], 37600],
  ['camry-awd', 2020, 'Toyota', 'Camry', 'SE AWD', 'sedan', 52300, 25900, 'good', 'gas', '8-speed automatic', 'AWD', '2.5L I4', 'Supersonic Red', 'dealer', 'Kenai', 60.5544, -151.2583, ['Heated seats', 'Remote start'], 27100],
  ['suburban-lt', 2018, 'Chevrolet', 'Suburban', 'LT', 'SUV', 84200, 31500, 'fair', 'gas', '6-speed automatic', '4WD', '5.3L V8', 'Black', 'private', 'Nikiski', 60.6906, -151.2888, ['Tow package', 'Winter tires'], 32900],
];

export const vehicles: Vehicle[] = seeds.map((seed, index) => {
  const [id, year, make, model, trim, bodyType, mileage, price, condition, fuelType, transmission, drivetrain, engine, color, sellerType, city, lat, lng, modifications, marketAverage] = seed;
  return {
    id,
    vin: `AK${year}${String(index + 1000).padStart(5, '0')}`,
    year,
    make,
    model,
    trim,
    bodyType,
    mileage,
    price,
    condition,
    fuelType,
    transmission,
    drivetrain,
    engine,
    color,
    features: [...baseFeatures, ...alaskaFeatures, ...(bodyType === 'boat' ? ['Fish-ready package'] : []), ...(bodyType === 'snowmobile' ? ['Hand warmers'] : [])],
    modifications: [...modifications],
    description: `${year} ${make} ${model} ${trim} dialed in for Kenai Peninsula roads, winter launches, and long-haul Alaska weekends. Maintained locally with clean paperwork and cold-weather confidence.`,
    photos: photoSets[bodyType],
    titleStatus: 'Clean Alaska title',
    accidentHistory: index % 5 === 0 ? 'No reported accidents' : 'Minor cosmetic history, professionally repaired',
    ownerCount: index % 3 === 0 ? 1 : 2,
    winterPackage: true,
    studdedTires: bodyType !== 'boat' && bodyType !== 'RV',
    rustRating: ['Low', 'Low', 'Moderate', 'Very Low'][index % 4],
    seller: sellerType === 'dealer' ? sellers.dealer : sellers.private,
    marketAverage,
    location: `${city}, Kenai Peninsula Borough, AK`,
    city,
    lat,
    lng,
    postedAt: `${3 + (index % 11)} days ago`,
    status: index % 7 === 0 ? 'sold' : 'active',
    views: 90 + index * 17,
  };
});

export const featuredVehicles = vehicles.filter((vehicle) => vehicle.status === 'active').slice(0, 7);
export const bodyTypes: BodyType[] = ['truck', 'SUV', 'sedan', 'van', 'ATV', 'snowmobile', 'boat', 'RV'];
export const conditionOptions = ['new', 'excellent', 'good', 'fair', 'project'] as const;
export const fuelOptions = ['gas', 'diesel', 'electric', 'hybrid'] as const;
export const featureOptions = ['4WD/AWD', 'Heated seats', 'Remote start', 'Studded tires', 'Plow package', 'Tow package', 'Lift kit', 'Winch'];
export const sellerTypes = ['private', 'dealer'] as const;
export const makes = Array.from(new Set(vehicles.map((vehicle) => vehicle.make))).sort();
export const models = Array.from(new Set(vehicles.map((vehicle) => vehicle.model))).sort();
export const homeStats = [
  { label: 'Vehicles listed', value: '1,240+' },
  { label: 'Local rigs sold', value: '890+' },
  { label: 'Avg. buyer savings', value: '$3,400' },
];
