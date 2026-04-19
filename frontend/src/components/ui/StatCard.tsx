"use client";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  color?: string;
}

export default function StatCard({ label, value, icon: Icon, trend, color = "from-brand-500 to-blue-500" }: Props) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="card-glass flex items-center gap-4"
    >
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
        {trend && <p className="text-xs text-green-400">{trend}</p>}
      </div>
    </motion.div>
  );
}
