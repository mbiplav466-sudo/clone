import React from 'react';

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm ${
        hover ? 'transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', icon: Icon }) {
  return (
    <h3 className={`text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2 ${className}`}>
      {Icon && <Icon className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
      {children}
    </h3>
  );
}
