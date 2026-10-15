import React from 'react';
import { useTrading } from '../context/TradingContext';
import { PDFItem } from '../types';
import { X, FileText, Download, Bookmark, BookmarkCheck, CheckCircle2, Lightbulb, Share2 } from 'lucide-react';

export const PdfViewerModal: React.FC = () => {
  const { activePdfViewer, closePdfViewer, toggleSaveItem, isItemSaved, showToast } = useTrading();

  if (!activePdfViewer) return null;

  const isSaved = isItemSaved(activePdfViewer.id);

  const handleDownload = () => {
    let content = `TRADING WITH RDX - ESSENTIAL PDF GUIDE\n\n${activePdfViewer.title}\nCategory: ${activePdfViewer.category}\nPages: ${activePdfViewer.pages}\n\nOVERVIEW:\n${activePdfViewer.description}\n\nHIGHLIGHTS:\n${activePdfViewer.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}\n\nDETAILED SECTIONS & RULES:\n`;

    activePdfViewer.contentSections.forEach((section) => {
      content += `\n=== ${section.heading} ===\n`;
      content += `${section.description}\n\nRules:\n`;
      section.bulletPoints.forEach((pt) => {
        content += `- ${pt}\n`;
      });
      content += `\nPRO-TIP: ${section.proTip}\n`;
    });

    content += `\n---\nJoin Live Mentorship & Get Daily Levels: TRADING WITH RDX\nOfficial Instagram: @griffin.arnav002`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activePdfViewer.downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded "${activePdfViewer.title}"!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#060910] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-heading font-bold text-white">
                {activePdfViewer.title}
              </h3>
              <p className="text-[11px] text-slate-400">
                {activePdfViewer.pages} Pages · {activePdfViewer.fileSize} · {activePdfViewer.downloadCount} Downloads
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveItem(activePdfViewer.id)}
              className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-slate-800"
              title="Bookmark"
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-400" /> : <Bookmark className="w-4 h-4" />}
            </button>

            <button
              onClick={handleDownload}
              className="p-1.5 text-slate-400 hover:text-emerald-400 rounded-lg hover:bg-slate-800"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={closePdfViewer}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              Document Purpose &amp; Overview
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {activePdfViewer.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
              Key Highlights Covered
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activePdfViewer.highlights.map((h, idx) => (
                <div key={idx} className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Content Sections */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Setup Blueprints &amp; Execution Rules
            </h4>

            {activePdfViewer.contentSections.map((sec, idx) => (
              <div key={idx} className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                <h5 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>{sec.heading}</span>
                </h5>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {sec.description}
                </p>

                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 space-y-1.5">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Checklist &amp; Placement:
                  </div>
                  {sec.bulletPoints.map((pt, pIdx) => (
                    <div key={pIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400">›</span>
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-2 text-xs text-amber-300">
                  <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
                  <div>
                    <span className="font-semibold text-amber-200">RDX Pro Tip: </span>
                    <span>{sec.proTip}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#060910] flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-500">
            Official RDX Trading Desk Materials. Updates on @griffin.arnav002
          </span>
          <button
            onClick={handleDownload}
            className="px-4 py-1.5 text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-slate-950 rounded-lg flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download High-Res PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
