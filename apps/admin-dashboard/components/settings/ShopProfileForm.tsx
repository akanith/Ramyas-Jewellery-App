import { Store, Phone, MapPin, Hash } from "lucide-react";

interface ShopField {
  icon: React.ElementType;
  label: string;
  value: string;
}

export default function ShopProfileForm() {
  const fields: ShopField[] = [
    { icon: Store, label: "Shop Name", value: "Ramyas Jewellers" },
    { icon: Phone, label: "Contact Number", value: "+91 44 2345 6789" },
    { icon: MapPin, label: "Address", value: "12, Jewellery Arcade, T. Nagar, Chennai — 600 017" },
    { icon: Hash, label: "GST Number", value: "33ABCDE1234F1Z5" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="flex items-start gap-3 p-4 bg-cream-50 rounded-xl border border-cream-200"
        >
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 shadow-card">
            <Icon className="w-4 h-4 text-primary" strokeWidth={1.8} />
          </div>
          <div>
            <p className="text-2xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
              {label}
            </p>
            <p className="text-sm font-semibold text-gray-800">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
