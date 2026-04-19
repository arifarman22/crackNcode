"use client";
import { ReactNode } from "react";
import Button from "./Button";
import { RefreshCw } from "lucide-react";

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
  onRowClick?: (item: T) => void;
}

export default function AdminTable<T extends { id: string }>({ columns, data, loading, error, onRetry, onRowClick }: Props<T>) {
  if (loading) {
    return (
      <div className="card-glass p-8 text-center text-gray-500">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-glass p-8 text-center">
        <p className="text-red-400 text-sm mb-3">{error}</p>
        {onRetry && <Button size="sm" variant="secondary" onClick={onRetry}><RefreshCw size={14} /> Retry</Button>}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="card-glass p-8 text-center text-gray-500">No data found.</div>
    );
  }

  return (
    <div className="card-glass overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {columns.map((col) => (
                <th key={col.key} className="text-left py-3 px-4 text-gray-400 font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`border-b border-white/5 transition-colors ${
                  onRowClick ? "cursor-pointer hover:bg-white/5" : ""
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-4">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
