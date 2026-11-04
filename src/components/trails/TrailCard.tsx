import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { TrailRoute } from '../../types';
import { ElevationProfile } from './ElevationProfile';

interface TrailCardProps {
  trail: TrailRoute;
}

export const TrailCard: React.FC<TrailCardProps> = ({ trail }) => {
  const getDifficultyBadge = (difficulty: TrailRoute['difficulty']) => {
    switch (difficulty) {
      case 'Mudah (Family)':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Menengah':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Menantang':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-mist-100 text-basalt-800 border-mist-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-mist-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-mist-300 transition-all duration-300 flex flex-col">
      {/* Cover Image & Category Pill */}
      <div className="relative aspect-[16/10] overflow-hidden bg-basalt-800">
        <img
          src={trail.coverImage}
          alt={trail.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
        
        {/* Badges on Image */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full text-xs font-mono font-medium tracking-wide bg-canopy-950/85 backdrop-blur-sm text-mist-50 border border-white/20">
            {trail.category}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getDifficultyBadge(
              trail.difficulty
            )}`}
          >
            {trail.difficulty}
          </span>
          <span className="text-xs font-mono text-white/90 drop-shadow">
            Max {trail.maxAltitudeMdpl} MDPL
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-basalt-900 group-hover:text-ember-600 transition-colors leading-snug">
            <Link to={`/trails/${trail.slug}`}>
              {trail.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-basalt-600 line-clamp-2 leading-relaxed font-sans">
            {trail.summary}
          </p>
        </div>

        {/* Tactical Telemetry Bar (Komoot 3-col Grid) */}
        <div className="mt-5 pt-4 border-t border-mist-200">
          <div className="grid grid-cols-3 divide-x divide-mist-200 text-center py-1">
            <div className="px-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-basalt-400 block">
                Jarak
              </span>
              <span className="text-sm font-mono font-bold text-basalt-900 flex items-center justify-center gap-1 mt-0.5">
                <Compass className="w-3.5 h-3.5 text-ember-600 shrink-0" />
                {trail.distanceKm} km
              </span>
            </div>

            <div className="px-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-basalt-400 block">
                Elevasi
              </span>
              <span className="text-sm font-mono font-bold text-basalt-900 flex items-center justify-center gap-1 mt-0.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                +{trail.elevationGainM} m
              </span>
            </div>

            <div className="px-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-basalt-400 block">
                Durasi
              </span>
              <span className="text-sm font-mono font-bold text-basalt-900 flex items-center justify-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-basalt-600 shrink-0" />
                {trail.durationEstimate.split(' ')[0]} jam
              </span>
            </div>
          </div>
        </div>

        {/* Mini Elevation SVG preview */}
        <div className="mt-3 pt-2 bg-mist-50/70 rounded-lg p-2 border border-mist-200/50">
          <div className="flex items-center justify-between text-[10px] font-mono text-basalt-400 mb-1">
            <span>PROFIL ELEVASI</span>
            <span>+{trail.elevationGainM}m</span>
          </div>
          <ElevationProfile points={trail.elevationProfilePoints} height={40} />
        </div>

        {/* Action Link */}
        <div className="mt-4 pt-3 flex items-center justify-between text-xs font-semibold text-ember-600">
          <span className="font-mono text-basalt-400 text-[11px]">
            {trail.waypoints.length} Pos Waypoint
          </span>
          <Link
            to={`/trails/${trail.slug}`}
            className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            <span>Detail Jalur</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

