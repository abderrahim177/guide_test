import React from 'react';
import { Plus, Package, DollarSign } from 'lucide-react';

export default function EquipmentRent() {
  const items = [
    { name: 'Trekking Poles (Pair)', price: '$10/day', stock: 5, status: 'Available' },
    { name: '4-Season Tent', price: '$25/day', stock: 2, status: 'Available' },
    { name: 'Sleeping Bag (-10°C)', price: '$15/day', stock: 0, status: 'Out of Stock' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Equipment for Rent</h1>
          <p className="text-slate-500 text-xs">Manage gear available for visitors to rent.</p>
        </div>
        <button className="bg-emerald-800 text-white px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5 hover:bg-emerald-900 text-xs">
          <Plus className="w-4 h-4" /> Add Gear
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] border-b border-slate-100">
            <tr>
              <th className="p-3.5">Equipment Name</th>
              <th className="p-3.5">Daily Rate</th>
              <th className="p-3.5">In Stock</th>
              <th className="p-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item, idx) => (
              <tr key={idx}>
                <td className="p-3.5 font-bold text-slate-900">{item.name}</td>
                <td className="p-3.5 text-slate-600">{item.price}</td>
                <td className="p-3.5 font-semibold text-slate-800">{item.stock}</td>
                <td className="p-3.5">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    item.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}