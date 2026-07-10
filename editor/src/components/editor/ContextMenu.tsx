'use client';
import React, { useEffect, useRef } from 'react';
import { useEditorStore } from '@/store/useEditorStore';
import {
  Copy, Clipboard, CopyPlus, Trash2, Lock, Unlock,
  ArrowUp, ArrowDown, ChevronsUp, ChevronsDown,
  Eye, EyeOff
} from 'lucide-react';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  danger?: boolean;
  dividerAfter?: boolean;
  disabled?: boolean;
}

export default function ContextMenu() {
  const {
    contextMenu, hideContextMenu,
    selectedElementIds, pages, currentPageId,
    copySelectedElements, pasteElements, duplicateSelectedElements,
    deleteSelectedElements, toggleLockSelected, toggleHideSelected,
    bringForward, bringToFront, sendBackward, sendToBack,
    clipboard,
  } = useEditorStore();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        hideContextMenu();
      }
    };
    if (contextMenu.visible) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [contextMenu.visible, hideContextMenu]);

  if (!contextMenu.visible) return null;

  const currentPage = pages.find(p => p.id === currentPageId);
  const hasSelection = selectedElementIds.length > 0;
  const selectedElement = hasSelection && currentPage
    ? currentPage.elements.find(el => el.id === selectedElementIds[0])
    : null;
  const isLocked = selectedElement?.locked ?? false;

  const items: MenuItem[] = [
    {
      label: 'Copy',
      icon: <Copy size={14} />,
      shortcut: 'Ctrl+C',
      action: () => { copySelectedElements(); hideContextMenu(); },
      disabled: !hasSelection,
    },
    {
      label: 'Paste',
      icon: <Clipboard size={14} />,
      shortcut: 'Ctrl+V',
      action: () => { pasteElements(); hideContextMenu(); },
      disabled: !clipboard,
    },
    {
      label: 'Duplicate',
      icon: <CopyPlus size={14} />,
      shortcut: 'Ctrl+D',
      action: () => { duplicateSelectedElements(); hideContextMenu(); },
      disabled: !hasSelection,
      dividerAfter: true,
    },
    {
      label: 'Bring Forward',
      icon: <ArrowUp size={14} />,
      shortcut: 'Ctrl+]',
      action: () => { bringForward(); hideContextMenu(); },
      disabled: !hasSelection,
    },
    {
      label: 'Bring to Front',
      icon: <ChevronsUp size={14} />,
      shortcut: 'Ctrl+Shift+]',
      action: () => { bringToFront(); hideContextMenu(); },
      disabled: !hasSelection,
    },
    {
      label: 'Send Backward',
      icon: <ArrowDown size={14} />,
      shortcut: 'Ctrl+[',
      action: () => { sendBackward(); hideContextMenu(); },
      disabled: !hasSelection,
    },
    {
      label: 'Send to Back',
      icon: <ChevronsDown size={14} />,
      shortcut: 'Ctrl+Shift+[',
      action: () => { sendToBack(); hideContextMenu(); },
      disabled: !hasSelection,
      dividerAfter: true,
    },
    {
      label: isLocked ? 'Unlock' : 'Lock',
      icon: isLocked ? <Unlock size={14} /> : <Lock size={14} />,
      shortcut: 'Ctrl+L',
      action: () => { toggleLockSelected(); hideContextMenu(); },
      disabled: !hasSelection,
    },
    {
      label: 'Hide',
      icon: <EyeOff size={14} />,
      action: () => { toggleHideSelected(); hideContextMenu(); },
      disabled: !hasSelection,
      dividerAfter: true,
    },
    {
      label: 'Delete',
      icon: <Trash2 size={14} />,
      shortcut: 'Del',
      action: () => { deleteSelectedElements(); hideContextMenu(); },
      disabled: !hasSelection,
      danger: true,
    },
  ];

  return (
    <div
      ref={menuRef}
      className="fixed z-[9999] min-w-[200px] py-1.5 bg-white/95 backdrop-blur-xl rounded-lg border border-[#e8e2d9] shadow-xl"
      style={{ left: contextMenu.x, top: contextMenu.y }}
    >
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <button
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs transition-colors
              ${item.disabled
                ? 'text-[#c0b9b2] cursor-not-allowed'
                : item.danger
                  ? 'text-red-500 hover:bg-red-50'
                  : 'text-[#1a1a18] hover:bg-[#f4efeb]'
              }`}
            onClick={item.disabled ? undefined : item.action}
            disabled={item.disabled}
          >
            <span className="w-4 flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-left">{item.label}</span>
            {item.shortcut && (
              <span className="text-[10px] text-[#a09890] ml-4">{item.shortcut}</span>
            )}
          </button>
          {item.dividerAfter && <div className="h-px bg-[#e8e2d9] my-1 mx-2" />}
        </React.Fragment>
      ))}
    </div>
  );
}
