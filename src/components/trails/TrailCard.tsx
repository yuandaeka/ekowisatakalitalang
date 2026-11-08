import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp, Navigation2, CheckCircle, ChevronRight } from 'lucide-react';
import { TrailRoute } from '../../types';
import { ElevationProfile } from './ElevationProfile';

interface TrailCardProps {
  trail: TrailRoute;
}

export const TrailCard: React.FC<TrailCardProps> = ({ trail }) => {
  const getDifficultyPill = (difficulty: TrailRoute['difficulty']) => {
    switch (difficulty) {
      case 'Mudah (Family)':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          label: 'Mudah',
        };
      case 'Menengah':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
          label: 'Sedang',
        };
      case 'Menantang':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
          label: 'Sulit',
        };
      default:
        return {
          bg: 'bg-gray-100 text-gray-700 border-gray-200',
          dot: 'bg-gray-400',
          label: difficulty,
        };
    }
  };

  const diff = getDifficultyPill(trail.difficulty);

  return (
    <div className="group bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-sm hover:shadow-komoot-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Media Container */}
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
          <img
            src={trail.coverImage}
            alt={trail.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

          {/* Activity Category Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 backdrop-blur-sm text-gray-800 shadow-sm border border-gray-100 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${diff.dot}`} />
              <span>{trail.category}</span>
            </span>
          </div>

          {/* Difficulty Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${diff.bg} shadow-sm backdrop-blur-sm`}>
              {diff.label}
            </span>
          </div>

          {/* Bottom Max Altitude Pill */}
          <div className="absolute bottom-3 right-3">
            <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium text-white bg-black/60 backdrop-blur-sm">
              {trail.maxAltitudeMdpl} mdpl
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Curator / Author Row */}
          <div className="flex items-center gap-2 mb-2.5 text-xs text-gray-500">
            <div className="w-5 h-5 rounded-full bg-komoot-green/20 text-komoot-green flex items-center justify-center font-bold text-[10px]">
              KT
            </div>
            <span className="font-medium text-gray-700">Pokdarwis Balerante</span>
            <CheckCircle className="w-3.5 h-3.5 text-komoot-green fill-komoot-green/20" />
            <span className="text-gray-300">•</span>
            <span className="text-[11px] font-mono text-gray-400">{trail.waypoints.length} Pos</span>
          </div>

          {/* Title */}
          <h3 className="font-sans text-lg font-bold text-gray-900 group-hover:text-komoot-green transition-colors leading-snug">
            <Link to={`/trails/${trail.slug}`}>
              {trail.title}
            </Link>
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {trail.summary}
          </p>

          {/* Metric Telemetry Row (Komoot 3-Metrics Style) */}
          <div className="mt-4 pt-3.5 border-t border-gray-100 grid grid-cols-3 gap-2 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Jarak</span>
              <span className="text-sm font-bold text-gray-900 font-mono mt-0.5 block">
                {trail.distanceKm} km
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Waktu</span>
              <span className="text-sm font-bold text-gray-900 font-mono mt-0.5 block flex items-center gap-1">
                <Clock className="w-3 h-3 text-gray-400" />
                {trail.durationEstimate.split(' ')[0]} jam
              </span>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block">Elevasi</span>
              <span className="text-sm font-bold text-komoot-green font-mono mt-0.5 block flex items-center gap-0.5">
                <TrendingUp className="w-3.5 h-3.5" />
                +{trail.elevationGainM}m
              </span>
            </div>
          </div>

          {/* Elevation Profile Visual (Signature Komoot Green Ribbon) */}
          <div className="mt-4 pt-2 bg-komoot-bg rounded-xl p-2.5 border border-gray-100">
            <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
              <span>Profil Ketinggian Jalur</span>
              <span className="text-komoot-green font-bold">+{trail.elevationGainM}m</span>
            </div>
            <ElevationProfile points={trail.elevationProfilePoints} height={36} strokeColor="#72A422" />
          </div>

        </div>
      </div>

      {/* Card Action Link */}
      <div className="px-5 pb-5 pt-1">
        <Link
          to={`/trails/${trail.slug}`}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-gray-700 bg-gray-50 hover:bg-komoot-green hover:text-white transition-all flex items-center justify-center gap-1.5 border border-gray-200 hover:border-komoot-green"
        >
          <span>Detail Rute & Waypoint</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
};
