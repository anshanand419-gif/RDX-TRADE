import React, { useState } from 'react';
import { useTrading } from '../context/TradingContext';
import { Course, Lesson } from '../types';
import { X, Play, Clock, CheckCircle2, BookOpen, Star, Sparkles, Video, ShieldCheck } from 'lucide-react';

export const CoursePlayerModal: React.FC = () => {
  const { activeCoursePlayer, closeCoursePlayer, showToast } = useTrading();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  if (!activeCoursePlayer) return null;

  const currentLesson = selectedLesson || activeCoursePlayer.modules[0]?.lessons[0];

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) => {
      if (prev.includes(lessonId)) {
        return prev.filter((id) => id !== lessonId);
      } else {
        showToast('Lesson marked as completed!', 'success');
        return [...prev, lessonId];
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060910] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-white">
                {activeCoursePlayer.title}
              </h3>
              <p className="text-[11px] text-slate-400">
                Instructor: {activeCoursePlayer.instructor} · {activeCoursePlayer.duration}
              </p>
            </div>
          </div>

          <button
            onClick={closeCoursePlayer}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Player Layout */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left: Video Stage & Lesson Details */}
          <div className="lg:col-span-7 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 flex flex-col justify-between">
            <div>
              {/* Simulated Video Stage */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800 mb-4 group">
                <img
                  src={activeCoursePlayer.thumbnail}
                  alt={currentLesson?.title}
                  className="w-full h-full object-cover opacity-80"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-4 text-center">
                  <button
                    onClick={() => {
                      setIsPlaying(!isPlaying);
                      showToast(isPlaying ? 'Video paused' : 'Lesson video streaming...', 'info');
                    }}
                    className="w-14 h-14 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 transform hover:scale-105 transition-all mb-3"
                  >
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </button>
                  <div className="text-xs font-semibold text-white">
                    {isPlaying ? 'Streaming HD Lesson...' : 'Click to Play Lesson Video'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Duration: {currentLesson?.duration}
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 rounded text-[10px] text-slate-300 font-mono">
                  Lesson 1080p 60fps · TRADING WITH RDX
                </div>
              </div>

              {/* Current Lesson Notes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-base font-heading font-bold text-white">
                    {currentLesson?.title}
                  </h4>
                  {currentLesson && (
                    <button
                      onClick={() => toggleLessonComplete(currentLesson.id)}
                      className={`px-2.5 py-1 text-xs rounded-lg flex items-center gap-1.5 transition-colors ${
                        completedLessons.includes(currentLesson.id)
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{completedLessons.includes(currentLesson.id) ? 'Completed' : 'Mark Complete'}</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentLesson?.description}
                </p>

                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-slate-200">
                  <span className="font-semibold text-emerald-400">Core Takeaway: </span>
                  <span>{currentLesson?.keyTakeaway}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Course: {activeCoursePlayer.title}</span>
              <span className="text-emerald-400 font-semibold">Verified Student Curriculum</span>
            </div>
          </div>

          {/* Right: Module & Lessons Tree */}
          <div className="lg:col-span-5 p-6 bg-slate-950/60 overflow-y-auto max-h-[500px]">
            <div className="text-xs font-semibold text-white uppercase tracking-wider mb-4 pb-2 border-b border-slate-800 flex items-center justify-between">
              <span>Syllabus &amp; Lessons</span>
              <span className="text-[11px] text-slate-400 font-mono">
                {completedLessons.length} Done
              </span>
            </div>

            <div className="space-y-4">
              {activeCoursePlayer.modules.map((mod) => (
                <div key={mod.moduleNumber} className="space-y-2">
                  <div className="text-xs font-bold text-slate-300 flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 text-[10px] flex items-center justify-center font-mono">
                      {mod.moduleNumber}
                    </span>
                    <span>{mod.title}</span>
                  </div>

                  <div className="space-y-1.5 pl-2">
                    {mod.lessons.map((lesson) => {
                      const isSelected = (currentLesson?.id === lesson.id);
                      const isDone = completedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setSelectedLesson(lesson);
                            setIsPlaying(false);
                          }}
                          className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'bg-emerald-500/15 border border-emerald-500/40 text-white font-medium'
                              : 'bg-slate-900/60 border border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-emerald-400 font-mono text-[10px]">
                              {isDone ? '✓' : '▶'}
                            </span>
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-500 font-mono shrink-0">
                            {lesson.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
