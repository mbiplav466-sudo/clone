import React, { useState } from 'react';
import { useHealth } from '../../context/HealthContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import {
  Activity,
  ShieldAlert,
  Moon,
  Sun,
  Key,
  Heart,
  FileText,
  User,
  LogOut,
  LogIn,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { SettingsModal } from '../settings/SettingsModal';
import { AuthModal } from '../auth/AuthModal';

export function Navbar() {
  const { healthScore, drugInteractions, apiKey, setActiveTab } = useHealth();
  const { darkMode, toggleTheme } = useTheme();
  const { currentUser, isLoggedIn, logout, openAuthModal } = useAuth();
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const highRiskInteractions = drugInteractions.filter(d => d.severity === 'HIGH');

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('chat')}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-600 dark:from-teal-400 dark:to-emerald-400">
                    HealthPulse
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Clinical Intelligence & Triage</p>
              </div>
            </div>

            {/* Quick Indicators & Stats */}
            <div className="hidden md:flex items-center gap-4">
              
              {/* Health Score Pill */}
              <div
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer hover:bg-slate-200/70 dark:hover:bg-slate-700/80 transition-colors"
                onClick={() => setActiveTab('vitals')}
                title="Calculated from recent vitals, sleep, and compliance"
              >
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20 animate-pulse" />
                <span className="text-slate-600 dark:text-slate-300">Health Index:</span>
                <span className={`font-bold ${healthScore >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {healthScore} / 100
                </span>
              </div>

              {/* Drug Interaction Alert Pill */}
              {highRiskInteractions.length > 0 && (
                <div
                  onClick={() => setActiveTab('meds')}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 text-xs font-semibold cursor-pointer animate-pulse"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{highRiskInteractions.length} Drug Warning</span>
                </div>
              )}

              {/* API Key Status */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                  apiKey
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800'
                    : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>{apiKey ? 'Gemini Live' : 'Simulated Engine'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>

              {/* Doctor Visit Summary Button */}
              <button
                onClick={() => setActiveTab('summary')}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>Doctor Briefing</span>
              </button>

              {/* User Authentication Menu */}
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs font-semibold"
                  >
                    <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold">
                      {currentUser?.name ? currentUser.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                      {currentUser?.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  {/* User Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50 animate-fadeIn">
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100">{currentUser?.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{currentUser?.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 text-xs font-bold shadow-sm transition-all"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}

            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {isLoggedIn ? (
                <button
                  onClick={logout}
                  className="p-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="p-2 rounded-xl text-teal-600 dark:text-teal-400 hover:bg-teal-50"
                  title="Sign In"
                >
                  <LogIn className="w-5 h-5" />
                </button>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Modals */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <AuthModal />
    </>
  );
}
