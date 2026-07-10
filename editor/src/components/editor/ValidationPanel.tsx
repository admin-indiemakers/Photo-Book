'use client';
import React, { useState, useMemo } from 'react';
import { useEditorStore, Page, EditorElement } from '@/store/useEditorStore';
import { AlertTriangle, CheckCircle, XCircle, Info, ChevronDown, ChevronUp, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const PAGE_WIDTH = 600;
const PAGE_HEIGHT = 800;
const SAFE_AREA = 20;
const BLEED = 10;
const MIN_DPI = 150; // minimum acceptable DPI for print

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  severity: ValidationSeverity;
  pageIndex: number;
  pageName: string;
  elementId?: string;
  message: string;
  suggestion: string;
}

export function validateBook(pages: Page[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  pages.forEach((page, pageIndex) => {
    const pageName = page.name || `Page ${pageIndex + 1}`;

    // Check for empty pages
    if (page.elements.length === 0) {
      issues.push({
        severity: 'warning',
        pageIndex,
        pageName,
        message: 'Empty page',
        suggestion: 'Add content to this page or remove it.',
      });
    }

    page.elements.forEach((el) => {
      // Check elements outside safe area
      if (el.x < SAFE_AREA || el.y < SAFE_AREA ||
          el.x + el.width > PAGE_WIDTH - SAFE_AREA ||
          el.y + el.height > PAGE_HEIGHT - SAFE_AREA) {
        issues.push({
          severity: 'warning',
          pageIndex,
          pageName,
          elementId: el.id,
          message: `${el.type} element extends beyond the safe area`,
          suggestion: 'Elements outside the safe area may be cut off during printing. Move it within the dashed guide.',
        });
      }

      // Check elements outside page (past bleed)
      if (el.x + el.width < -BLEED || el.y + el.height < -BLEED ||
          el.x > PAGE_WIDTH + BLEED || el.y > PAGE_HEIGHT + BLEED) {
        issues.push({
          severity: 'error',
          pageIndex,
          pageName,
          elementId: el.id,
          message: `${el.type} element is completely outside the page`,
          suggestion: 'This element will not appear in print. Move it onto the page or delete it.',
        });
      }

      // Check text elements
      if (el.type === 'text') {
        if (!el.text || el.text.trim().length === 0) {
          issues.push({
            severity: 'warning',
            pageIndex,
            pageName,
            elementId: el.id,
            message: 'Empty text element',
            suggestion: 'Add text content or remove the empty text box.',
          });
        }
        if (el.fontSize && el.fontSize < 8) {
          issues.push({
            severity: 'warning',
            pageIndex,
            pageName,
            elementId: el.id,
            message: `Text font size (${el.fontSize}px) may be too small for print`,
            suggestion: 'Use a minimum font size of 8px for readability in print.',
          });
        }
      }

      // Check image elements
      if (el.type === 'image') {
        if (!el.src) {
          issues.push({
            severity: 'error',
            pageIndex,
            pageName,
            elementId: el.id,
            message: 'Image element has no source',
            suggestion: 'Upload an image or remove this placeholder.',
          });
        }
        // Opacity warning
        if (el.opacity < 0.3) {
          issues.push({
            severity: 'info',
            pageIndex,
            pageName,
            elementId: el.id,
            message: `Image has very low opacity (${Math.round(el.opacity * 100)}%)`,
            suggestion: 'This image may appear very faint in print.',
          });
        }
      }

      // Check tiny elements
      if (el.width < 10 || el.height < 10) {
        issues.push({
          severity: 'info',
          pageIndex,
          pageName,
          elementId: el.id,
          message: `Very small ${el.type} element (${Math.round(el.width)}×${Math.round(el.height)}px)`,
          suggestion: 'This element may not be visible in print.',
        });
      }
    });
  });

  return issues;
}

export default function ValidationPanel({ onClose }: { onClose: () => void }) {
  const { pages, setCurrentPage, setSelectedElements } = useEditorStore();
  const [expandedPage, setExpandedPage] = useState<number | null>(null);

  const issues = useMemo(() => validateBook(pages), [pages]);
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  const infos = issues.filter(i => i.severity === 'info');

  const issuesByPage = useMemo(() => {
    const map = new Map<number, ValidationIssue[]>();
    issues.forEach(issue => {
      const list = map.get(issue.pageIndex) || [];
      list.push(issue);
      map.set(issue.pageIndex, list);
    });
    return map;
  }, [issues]);

  const handleIssueClick = (issue: ValidationIssue) => {
    setCurrentPage(pages[issue.pageIndex].id);
    if (issue.elementId) {
      setSelectedElements([issue.elementId]);
    }
  };

  const SeverityIcon = ({ severity }: { severity: ValidationSeverity }) => {
    switch (severity) {
      case 'error': return <XCircle size={14} className="text-red-500 shrink-0" />;
      case 'warning': return <AlertTriangle size={14} className="text-amber-500 shrink-0" />;
      case 'info': return <Info size={14} className="text-blue-400 shrink-0" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-[520px] max-h-[80vh] flex flex-col overflow-hidden border border-[#e8e2d9]">
        {/* Header */}
        <div className="p-5 border-b border-[#e8e2d9] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E85D26]/10 flex items-center justify-center">
              <Printer size={20} className="text-[#E85D26]" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-semibold text-[#1a1a18]">Print Readiness Check</h2>
              <p className="text-xs text-[#6b6560]">{pages.length} pages • {issues.length} issue{issues.length !== 1 ? 's' : ''} found</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-[#6b6560]">✕</Button>
        </div>

        {/* Summary badges */}
        <div className="px-5 py-3 flex gap-3 border-b border-[#e8e2d9] bg-[#faf8f5]">
          {errors.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-600 text-xs font-medium">
              <XCircle size={12} /> {errors.length} Error{errors.length !== 1 ? 's' : ''}
            </span>
          )}
          {warnings.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-600 text-xs font-medium">
              <AlertTriangle size={12} /> {warnings.length} Warning{warnings.length !== 1 ? 's' : ''}
            </span>
          )}
          {infos.length > 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-500 text-xs font-medium">
              <Info size={12} /> {infos.length} Info
            </span>
          )}
          {issues.length === 0 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium">
              <CheckCircle size={12} /> All checks passed!
            </span>
          )}
        </div>

        {/* Issues list */}
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {pages.map((page, pageIndex) => {
              const pageIssues = issuesByPage.get(pageIndex) || [];
              const isExpanded = expandedPage === pageIndex;
              const hasErrors = pageIssues.some(i => i.severity === 'error');
              const hasWarnings = pageIssues.some(i => i.severity === 'warning');

              return (
                <div key={page.id} className="border border-[#e8e2d9] rounded-lg overflow-hidden">
                  <button
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-xs transition-colors ${
                      pageIssues.length > 0 ? 'hover:bg-[#faf8f5]' : 'bg-green-50/50'
                    }`}
                    onClick={() => setExpandedPage(isExpanded ? null : pageIndex)}
                  >
                    <span className="font-medium text-[#1a1a18] flex-1 text-left">
                      {page.name || `Page ${pageIndex + 1}`}
                    </span>
                    {pageIssues.length === 0 && <CheckCircle size={14} className="text-green-500" />}
                    {hasErrors && <XCircle size={14} className="text-red-500" />}
                    {!hasErrors && hasWarnings && <AlertTriangle size={14} className="text-amber-500" />}
                    {pageIssues.length > 0 && (
                      <>
                        <span className="text-[10px] text-[#a09890]">{pageIssues.length}</span>
                        {isExpanded ? <ChevronUp size={12} className="text-[#a09890]" /> : <ChevronDown size={12} className="text-[#a09890]" />}
                      </>
                    )}
                  </button>
                  {isExpanded && pageIssues.length > 0 && (
                    <div className="border-t border-[#e8e2d9]">
                      {pageIssues.map((issue, i) => (
                        <button
                          key={i}
                          className="w-full flex items-start gap-2.5 px-3 py-2 text-left hover:bg-[#faf8f5] transition-colors border-b last:border-b-0 border-[#f0ece6]"
                          onClick={() => handleIssueClick(issue)}
                        >
                          <SeverityIcon severity={issue.severity} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-medium text-[#1a1a18]">{issue.message}</p>
                            <p className="text-[10px] text-[#a09890] mt-0.5">{issue.suggestion}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-[#e8e2d9] flex justify-between items-center">
          <p className="text-[10px] text-[#a09890]">
            {errors.length === 0 ? '✓ No critical issues' : `⚠ ${errors.length} critical issue${errors.length !== 1 ? 's' : ''} must be fixed`}
          </p>
          <Button
            onClick={async () => {
              if (errors.length === 0) {
                try {
                  const res = await fetch('/api/orders', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pages, canvasSettings: useEditorStore.getState().canvasSettings })
                  });
                  if (res.ok) {
                    alert('Order submitted successfully!');
                    onClose();
                  } else {
                    alert('Failed to submit order');
                  }
                } catch (e) {
                  alert('Error submitting order');
                }
              } else {
                onClose();
              }
            }}
            className="h-8 text-xs font-semibold bg-[#E85D26] hover:bg-[#D4520A] text-white"
          >
            {errors.length === 0 ? 'Submit Order' : 'Close'}
          </Button>
        </div>
      </div>
    </div>
  );
}
