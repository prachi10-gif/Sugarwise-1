import React from 'react';
import { LayoutDashboard, TrendingUp, Calendar, Utensils, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard() {
  // Mock scan history for visual demonstration
  const mockScans = [
    { id: '1', name: 'Britannia Good Day Biscuits', brand: 'Britannia', totalSugar: 22.0, addedSugar: 19.5, date: '2026-06-14' },
    { id: '2', name: 'Maggi 2-Minute Masala Noodles', brand: 'Nestle', totalSugar: 3.2, addedSugar: 0.5, date: '2026-06-13' },
    { id: '3', name: 'Amul Real Mango Ice Cream', brand: 'Amul', totalSugar: 18.0, addedSugar: 14.0, date: '2026-06-12' },
    { id: '4', name: 'Coca-Cola Can (330ml)', brand: 'Coca-Cola', totalSugar: 35.0, addedSugar: 35.0, date: '2026-06-10' },
  ];

  const calculateTeaspoons = (grams: number) => (grams / 4).toFixed(1);

  return (
    <div className="max-w-6xl w-full mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-tealAccent" />
            Your Sugar Dashboard
          </h1>
          <p className="text-neutral-400 mt-1">Track your daily intake and make informed healthy choices.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-4 py-2 bg-tealAccent/10 border border-tealAccent/20 rounded-xl text-tealAccent text-sm font-semibold">
            Status: Free Scans Active (3 left)
          </span>
        </div>
      </div>

      {/* Stats Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-4">
            <span className="text-sm font-medium">Total Products Scanned</span>
            <Utensils className="h-5 w-5 text-tealAccent" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">4</h2>
            <p className="text-xs text-neutral-400 mt-1">Stored locally in current session</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-4">
            <span className="text-sm font-medium">Avg Sugar / Serving</span>
            <TrendingUp className="h-5 w-5 text-amberAccent" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-amberAccent">
              {calculateTeaspoons(19.5)} <span className="text-lg font-normal text-neutral-400">tsps</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">Equal to ~78g total sugar</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-4">
            <span className="text-sm font-medium">Maximum Sugar Flag</span>
            <ShieldAlert className="h-5 w-5 text-red-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-red-500">
              {calculateTeaspoons(35.0)} <span className="text-lg font-normal text-neutral-400">tsps</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">Found in Coca-Cola Can</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card p-6 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-neutral-400 mb-4">
            <span className="text-sm font-medium">Weekly Ingestion Estimator</span>
            <Calendar className="h-5 w-5 text-tealAccent" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">
              {calculateTeaspoons(78.2 * 7)} <span className="text-lg font-normal text-neutral-400">tsps</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">Projected weekly consumption</p>
          </div>
        </motion.div>
      </div>

      {/* History Log Table */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-white mb-6">Recent Scans History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-glassBorder text-neutral-400 text-sm">
                <th className="pb-3 font-semibold">Product Name</th>
                <th className="pb-3 font-semibold">Brand</th>
                <th className="pb-3 font-semibold">Sugar (Grams)</th>
                <th className="pb-3 font-semibold">Teaspoons Equivalency</th>
                <th className="pb-3 font-semibold text-right">Scanned Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-glassBorder/40">
              {mockScans.map((scan) => (
                <tr key={scan.id} className="text-neutral-200 hover:bg-glassBorder/10 transition-colors">
                  <td className="py-4 font-medium">{scan.name}</td>
                  <td className="py-4 text-neutral-400">{scan.brand}</td>
                  <td className="py-4">
                    <div className="flex flex-col">
                      <span>{scan.totalSugar}g total</span>
                      {scan.addedSugar && <span className="text-xs text-amberAccent">({scan.addedSugar}g added)</span>}
                    </div>
                  </td>
                  <td className="py-4 font-bold text-tealAccent">
                    {calculateTeaspoons(scan.totalSugar)} tsp
                  </td>
                  <td className="py-4 text-right text-neutral-400 text-sm">{scan.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
