import React, { useState } from "react";
import { Backpack, Shield, Tent, Compass, Flame, SunMedium, Droplets, Trash2, Plus, Minus, Check, ArrowRight, ShoppingCart } from "lucide-react";

export default function EquipmentRentalPanier() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "3-Season High Atlas Tent",
      category: "Camping",
      pricePerDay: 70,
      quantity: 1,
      icon: <Tent className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: 2,
      name: "Sleeping Bag (-5°C Comfort)",
      category: "Sleeping",
      pricePerDay: 50,
      quantity: 1,
      icon: <Backpack className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: 3,
      name: "Telescopic Trekking Poles",
      category: "Trekking",
      pricePerDay: 30,
      quantity: 2,
      icon: <Compass className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: 4,
      name: "Portable Camping Stove + Gas",
      category: "Cooking",
      pricePerDay: 40,
      quantity: 0,
      icon: <Flame className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: 5,
      name: "LED Headlamp (Rechargeable)",
      category: "Lighting",
      pricePerDay: 20,
      quantity: 0,
      icon: <SunMedium className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: 6,
      name: "Thermal Water Flask (1.5L)",
      category: "Hydration",
      pricePerDay: 15,
      quantity: 0,
      icon: <Droplets className="w-5 h-5 text-emerald-600" />,
    },
  ]);

  const [rentalDays, setRentalDays] = useState(3);
  const [insuranceSelected, setInsuranceSelected] = useState(true);

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty >= 0 ? newQty : 0 };
      }
      return item;
    }));
  };

  const cartItems = items.filter(item => item.quantity > 0);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.pricePerDay * item.quantity * rentalDays), 0);
  const insuranceFee = insuranceSelected ? 25 * rentalDays : 0;
  const totalAmount = subtotal + insuranceFee;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 font-['Poppins',sans-serif] text-stone-800">
      
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            AtlasVenture Gear Store
          </span>
          <h2 className="text-2xl font-extrabold text-stone-900 mt-1">
            Mountain Equipment & Camping Rental
          </h2>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl flex items-center gap-3">
          <span className="text-xs font-bold text-stone-600">Rental Duration:</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
              className="w-7 h-7 bg-white border border-emerald-300 rounded-lg flex items-center justify-center font-bold text-emerald-700 hover:bg-emerald-100 cursor-pointer transition-all"
            >
              -
            </button>
            <span className="font-extrabold text-sm text-emerald-900 w-14 text-center">{rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}</span>
            <button 
              onClick={() => setRentalDays(rentalDays + 1)}
              className="w-7 h-7 bg-white border border-emerald-300 rounded-lg flex items-center justify-center font-bold text-emerald-700 hover:bg-emerald-100 cursor-pointer transition-all"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-bold text-stone-700 uppercase tracking-wide mb-2">
            Available Equipment Catalogue
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white border rounded-2xl p-4 flex flex-col justify-between transition-all ${
                  item.quantity > 0 ? 'border-emerald-500 bg-emerald-50/20 shadow-xs' : 'border-stone-200 hover:border-emerald-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm mb-1">
                    {item.name}
                  </h4>
                  <span className="text-xs text-stone-500 font-medium">
                    {item.pricePerDay} MAD / day
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-600">Quantity:</span>
                  <div className="flex items-center bg-stone-50 border border-stone-200 rounded-xl p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-7 text-center text-xs font-bold text-stone-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-6 h-6 bg-white rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div 
            onClick={() => setInsuranceSelected(!insuranceSelected)}
            className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all mt-4 ${
              insuranceSelected ? 'border-emerald-600 bg-emerald-50/40 shadow-xs' : 'border-stone-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${insuranceSelected ? 'bg-emerald-600 text-white' : 'bg-stone-100 text-stone-400'}`}>
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-xs text-stone-900 block">Damage & Loss Protection (Optional)</span>
                <span className="text-[11px] text-stone-500">25 MAD per rental day for all items.</span>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${insuranceSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'}`}>
              {insuranceSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </div>
        </div>

        <div className="bg-emerald-50/70 border-2 border-emerald-500/30 rounded-3xl p-6 space-y-5 h-fit shadow-md">
          <div className="flex items-center gap-2 border-b border-emerald-200 pb-3">
            <ShoppingCart className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-stone-900">
              Rental Cart Summary
            </h3>
          </div>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <p className="text-xs text-stone-500 text-center py-6 font-medium">
                No items added yet. Select quantities from the catalogue.
              </p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-emerald-100 text-xs">
                  <div>
                    <span className="font-bold text-stone-900 block">{item.name}</span>
                    <span className="text-[10px] text-stone-500">{item.quantity}x • {item.pricePerDay * item.quantity * rentalDays} MAD</span>
                  </div>
                  <button 
                    onClick={() => updateQuantity(item.id, -item.quantity)}
                    className="text-stone-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="space-y-2 text-xs pt-3 border-t border-emerald-200/80 font-medium text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal ({rentalDays} {rentalDays === 1 ? 'Day' : 'Days'}):</span>
              <span className="font-bold text-stone-900">{subtotal} MAD</span>
            </div>
            <div className="flex justify-between">
              <span>Protection Fee:</span>
              <span className="font-bold text-stone-900">{insuranceFee} MAD</span>
            </div>
          </div>

          <div className="border-t border-emerald-200 pt-4 flex items-center justify-between">
            <span className="font-bold text-stone-900 text-sm">Total Amount:</span>
            <span className="font-extrabold text-xl text-emerald-700">{totalAmount} MAD</span>
          </div>

          <button 
            disabled={cartItems.length === 0}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3.5 px-4 rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}