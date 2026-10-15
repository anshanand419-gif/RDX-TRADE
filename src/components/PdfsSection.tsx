import React from 'react';
import { useTrading } from '../context/TradingContext';
import { TRENDING_PDFS } from '../data/tradingData';
import { PDFItem } from '../types';
import { FileText, Download, Eye, Bookmark, BookmarkCheck, ArrowDownToLine, Sparkles } from 'lucide-react';

export const PdfsSection: React.FC = () => {
  const { openPdfViewer, toggleSaveItem, isItemSaved, showToast } = useTrading();

  const handleDownloadPdf = (pdf: PDFItem) => {
    let content = `TRADING WITH RDX - ESSENTIAL PDF GUIDE\n\n${pdf.title}\nCategory: ${pdf.category}\nPages: ${pdf.pages}\n\nOVERVIEW:\n${pdf.description}\n\nHIGHLIGHTS:\n${pdf.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}\n\nDETAILED SECTIONS & RULES:\n`;

    pdf.contentSections.forEach((section) => {
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
    a.download = pdf.downloadFilename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`Downloaded "${pdf.title}"!`, 'success');
  };

  return (
    <section id="trading-pdfs" className="py-16 lg:py-24 bg-[#070b13] border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Tactical Cheat Sheets &amp; Blueprints</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white tracking-tight mb-3">
            High-Winrate Trading PDFs &amp; Cheatsheets
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Quick-reference visual cheat sheets designed to keep next to your trading monitors during market hours. Free to view online or download instantly.
          </p>
        </div>

        {/* PDFs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TRENDING_PDFS.map((pdf) => {
            const isSaved = isItemSaved(pdf.id);

            return (
              <div
                key={pdf.id}
                className="bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 group"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-emerald-400" />
                    </div>
                    <button
                      onClick={() => toggleSaveItem(pdf.id)}
                      className="p-1.5 text-slate-400 hover:text-amber-400 rounded-lg transition-colors"
                      title={isSaved ? 'Saved in library' : 'Save PDF'}
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <h3 className="text-base font-heading font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                    {pdf.title}
                  </h3>

                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 pb-3 border-b border-slate-800">
                    <span className="font-mono-numbers">{pdf.pages} pages</span>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono-numbers">{pdf.fileSize}</span>
                    <span className="text-slate-600">·</span>
                    <span className="font-mono-numbers text-slate-300">{pdf.downloadCount.toLocaleString()} downloads</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 line-clamp-2">
                    {pdf.description}
                  </p>

                  {/* Highlight bullets */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-400">
                    {pdf.highlights.slice(0, 2).map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">›</span>
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                  <button
                    onClick={() => openPdfViewer(pdf)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View Blueprint</span>
                  </button>

                  <button
                    onClick={() => handleDownloadPdf(pdf)}
                    className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Get PDF</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
