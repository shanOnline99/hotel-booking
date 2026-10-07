"use client";

import { useState } from "react";
import { MOCK_RATE_PLANS } from "@/lib/mock-data";
import { Plus, MoreVertical, Edit2, Trash2, CheckCircle2, Percent } from "lucide-react";
import { RatePlan } from "@/types";

export default function RatePlansPage() {
  const [ratePlans, setRatePlans] = useState<RatePlan[]>(MOCK_RATE_PLANS);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this rate plan?")) {
      setRatePlans(ratePlans.filter((plan) => plan.id !== id));
      setActiveDropdown(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Rate Plans</h1>
          <p className="text-gray-500 mt-1">Manage pricing strategies and packages.</p>
        </div>
        <button className="px-4 py-2 bg-[#1e293b] text-white font-medium rounded-lg hover:bg-black transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create Rate Plan
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {ratePlans.map((plan) => {
          const isDropdownOpen = activeDropdown === plan.id;
          const percentageIncrease = Math.round((plan.priceMultiplier - 1) * 100);

          return (
            <div key={plan.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-visible hover:shadow-md transition-shadow flex flex-col">
              <div className="p-6 flex-1 flex flex-col relative">
                
                {/* Actions */}
                <div className="absolute top-4 right-4 z-10">
                  <button 
                    onClick={() => setActiveDropdown(isDropdownOpen ? null : plan.id)}
                    className="p-1.5 text-gray-400 hover:text-[#1e293b] hover:bg-gray-100 rounded-md transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-8 w-40 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200">
                      <div className="py-1">
                        <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Edit2 className="w-4 h-4" /> Edit Plan
                        </button>
                        <button 
                          onClick={() => handleDelete(plan.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-4 pr-8">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-[#1e293b] capitalize">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 h-10">{plan.description}</p>
                </div>

                <div className="mb-6 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-sm font-semibold border border-blue-100">
                    <Percent className="w-3.5 h-3.5" />
                    {percentageIncrease === 0 ? "Base Price" : `+${percentageIncrease}% on Base Price`}
                  </span>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Included Benefits</p>
                  <ul className="space-y-2">
                    {plan.includedBenefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        <span className="capitalize">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
