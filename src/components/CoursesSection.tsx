import React from 'react';
import { useTrading } from '../context/TradingContext';
import { TRENDING_COURSES } from '../data/tradingData';
import { Course } from '../types';
import { Video, Star, Clock, BookOpen, Users, Play, ArrowRight } from 'lucide-react';

export const CoursesSection: React.FC = () => {
  const { openCoursePlayer, openPaymentModal } = useTrading();

  return (
    <section id="masterclasses" className="py-16 lg:py-24 bg-[#080c14] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Comprehensive Video Curriculums</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight">
              Trading Masterclasses &amp; Video Courses
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl">
              Structured step-by-step masterclasses designed to take you from market basics to institutional order flow and derivatives mastery.
            </p>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TRENDING_COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 group"
            >
              <div>
                {/* Course Thumbnail */}
                <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-950">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

                  {/* Level label */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold text-slate-200 bg-slate-950/80 backdrop-blur-sm rounded-md border border-slate-700/80">
                    {course.level}
                  </div>

                  {/* Play badge */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <div className="w-12 h-12 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Title & Instructor */}
                  <h3 className="text-lg font-heading font-bold text-white group-hover:text-emerald-300 transition-colors mb-1.5">
                    {course.title}
                  </h3>
                  <div className="text-xs text-slate-400 mb-4">by {course.instructor}</div>

                  {/* Metadata strip without pills */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-800">
                    <span className="flex items-center text-amber-400 font-mono-numbers">
                      <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                      {course.rating}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="flex items-center gap-1 font-mono-numbers">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono-numbers">{course.modulesCount} modules</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  {/* Syllabus outline */}
                  <div className="space-y-1.5 mb-2">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Modules Included:
                    </div>
                    {course.modules.map((m) => (
                      <div key={m.moduleNumber} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                        <span className="truncate">{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => openCoursePlayer(course)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Explore Curriculum &amp; Notes</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
