'use client';
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SIZES = [
  { id: 'portrait', label: 'Portrait', dimensions: 'Portrait', price: 549 },
  { id: 'landscape', label: 'Landscape', dimensions: 'Landscape', price: 549 },
  { id: 'square', label: 'Square', dimensions: 'Square', price: 549 },
  { id: 'love', label: 'Love', dimensions: 'Heart Shape', price: 549 },
  { id: 'hexagon', label: 'Hexagon', dimensions: 'Hexagon Shape', price: 549 },
  { id: 'round', label: 'Round', dimensions: 'Round Shape', price: 549 }
];

type FrameItem = {
  id: string;
  url: string;
  sizeId: string;
  quantity: number;
};

export const AcrylicFramesProductPage = () => {
  const [frameItems, setFrameItems] = useState<FrameItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showError, setShowError] = useState(false);

  // 3D Tilt effect
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!previewRef.current) return;
    const rect = previewRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((y - centerY) / centerY) * -10; 
    const tiltY = ((x - centerX) / centerX) * 10;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const processFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (!validFiles.length) return;
    
    setIsUploading(true);
    setShowError(false);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      const newItems = validFiles.map(file => ({
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file),
        sizeId: SIZES[0].id,
        quantity: 1
      }));
      
      setFrameItems(prev => {
        const nextItems = [...prev, ...newItems];
        if (prev.length === 0 && nextItems.length > 0) {
          setActiveItemId(nextItems[0].id);
        }
        return nextItems;
      });
      
      setTimeout(() => setIsUploading(false), 400);
    }, 1200);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const handleAddToCart = () => {
    if (frameItems.length === 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 800);
      return;
    }
    console.log("Added to cart", frameItems);
  };

  const removeImage = (idToRemove: string) => {
    setFrameItems(prev => {
      const filtered = prev.filter(item => item.id !== idToRemove);
      if (activeItemId === idToRemove) {
        setActiveItemId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  const updateItemSize = (id: string, newSizeId: string) => {
    setFrameItems(prev => prev.map(item => item.id === id ? { ...item, sizeId: newSizeId } : item));
  };

  const updateItemQuantity = (id: string, delta: number) => {
    setFrameItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const grandTotal = frameItems.reduce((acc, item) => {
    const sizeConfig = SIZES.find(s => s.id === item.sizeId);
    return acc + (sizeConfig ? sizeConfig.price * item.quantity : 0);
  }, 0);

  const activeItem = frameItems.find(item => item.id === activeItemId);
  const activeSize = activeItem ? SIZES.find(s => s.id === activeItem.sizeId) : SIZES[0];

  // Helper to determine aspect ratio based on selected shape
  const getAspectRatioClass = (sizeId?: string) => {
    switch(sizeId) {
      case 'portrait': return 'aspect-[3/4] rounded-sm';
      case 'landscape': return 'aspect-[4/3] rounded-sm';
      case 'square': return 'aspect-square rounded-sm';
      case 'love': return 'aspect-square rounded-full'; // Simplified representation
      case 'hexagon': return 'aspect-square rounded-[30%]'; // Simplified representation
      case 'round': return 'aspect-square rounded-full';
      default: return 'aspect-[3/4] rounded-sm';
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-sans pb-24 text-black overflow-x-hidden pt-24 relative selection:bg-[#E85D26] selection:text-white">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-8 flex flex-col lg:flex-row gap-16 relative">
        
        {/* Left Column: Form */}
        <div className="flex-1 w-full space-y-10 relative z-10">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif tracking-tight mb-4 text-[#1a1a18]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Acrylic Frames
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#6b6560] font-light max-w-md leading-relaxed"
            >
              Sleek, modern, and vibrant. Showcase your memories in crystal clear, high-quality acrylic.
            </motion.p>
          </div>

          <div className="space-y-10">
            {/* Step 1: Upload */}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#6b6560]">1. Upload Photos</h3>
              </div>
              
              <motion.div 
                animate={showError && frameItems.length === 0 ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`relative border-2 border-dashed rounded-xl overflow-hidden group transition-all duration-300 ${
                  isDragging ? 'border-[#E85D26] bg-[#E85D26]/5 scale-[1.02]' : 
                  (showError && frameItems.length === 0) ? 'border-red-500 bg-red-50' : 'border-black/10 bg-white/50 hover:bg-white hover:border-[#E85D26]/50'
                } ${isUploading ? 'pointer-events-none' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <input 
                  type="file" multiple accept="image/*" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  onChange={(e) => e.target.files && processFiles(e.target.files)}
                />
                
                <div className="flex flex-col items-center justify-center p-8 h-32">
                  <AnimatePresence mode="wait">
                    {isUploading ? (
                      <motion.div key="uploading" className="flex flex-col items-center gap-4 w-full max-w-xs">
                        <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-[#E85D26]" 
                            initial={{ width: 0 }} animate={{ width: `${uploadProgress}%` }} 
                          />
                        </div>
                        <p className="font-mono text-xs uppercase tracking-widest text-[#E85D26]">Processing...</p>
                      </motion.div>
                    ) : (
                      <motion.div key="idle" className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mb-1 group-hover:bg-[#E85D26]/10 transition-colors">
                          <svg className="w-5 h-5 text-[#6b6560] group-hover:text-[#E85D26] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                        <p className="font-medium text-[#1a1a18] text-sm">Drag & drop to add more</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* Step 2: Configure Items */}
            {frameItems.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#6b6560] mb-4">2. Configure Frames</h3>
                
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
                  <AnimatePresence>
                    {frameItems.map((item) => {
                      const itemSize = SIZES.find(s => s.id === item.sizeId) || SIZES[0];
                      const itemTotal = itemSize.price * item.quantity;
                      const isActive = activeItemId === item.id;

                      return (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, height: 0, marginTop: 0, marginBottom: 0 }}
                          key={item.id}
                          onClick={() => setActiveItemId(item.id)}
                          className={`relative p-3 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row gap-4 items-center ${
                            isActive ? 'border-[#E85D26] bg-white shadow-md' : 'border-black/5 bg-white/50 hover:bg-white hover:border-black/20'
                          }`}
                        >
                          <div className={`flex-shrink-0 w-16 h-16 overflow-hidden bg-[#e5e5e5] border border-black/10 ${getAspectRatioClass(item.sizeId)}`}>
                            <img src={item.url} alt="thumbnail" className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
                            {/* Size Selector */}
                            <div className="flex-1">
                              <label className="text-[10px] uppercase font-mono tracking-widest text-[#E85D26] mb-1 block font-bold">Select Size & Shape</label>
                              <div className="relative group shadow-sm">
                                <select 
                                  value={item.sizeId} 
                                  onChange={(e) => updateItemSize(item.id, e.target.value)}
                                  className="w-full bg-white border-2 border-[#E85D26]/40 hover:border-[#E85D26] rounded-lg text-sm pl-3 pr-8 py-2.5 outline-none focus:ring-4 focus:ring-[#E85D26]/10 transition-all appearance-none cursor-pointer font-medium text-black"
                                >
                                  {SIZES.map(s => (
                                    <option key={s.id} value={s.id}>{s.label} - ₹{s.price}</option>
                                  ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-[#E85D26]">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                              </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="w-full sm:w-28">
                              <label className="text-[10px] uppercase font-mono tracking-widest text-black/40 mb-1 block">Quantity</label>
                              <div className="flex items-center bg-black/5 rounded-lg border border-transparent overflow-hidden h-[42px]">
                                <button 
                                  onClick={(e) => { e.stopPropagation(); updateItemQuantity(item.id, -1); }}
                                  className="px-3 h-full text-black/60 hover:text-black hover:bg-black/10 transition-colors"
                                >-</button>
                                <span className="flex-1 text-center text-sm font-medium">{item.quantity}</span>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); updateItemQuantity(item.id, 1); }}
                                  className="px-3 h-full text-black/60 hover:text-black hover:bg-black/10 transition-colors"
                                >+</button>
                              </div>
                            </div>
                          </div>

                          {/* Price & Remove */}
                          <div className="flex items-center gap-4 sm:flex-col sm:gap-2 sm:items-end sm:justify-center">
                            <span className="font-medium text-sm text-[#E85D26]">₹{itemTotal.toFixed(2)}</span>
                            <button 
                              onClick={(e) => { e.stopPropagation(); removeImage(item.id); }}
                              className="text-black/30 hover:text-red-500 transition-colors p-1"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
            
            {/* Add to Cart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-4">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#1a1a18] text-white py-5 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 transform active:scale-[0.98] flex justify-between px-8 items-center"
              >
                <span>Add to Cart</span>
                <span className="font-medium">₹{grandTotal.toFixed(2)}</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Floating Hero Preview */}
        <div 
          className="flex-1 w-full lg:sticky lg:top-24 h-[600px] flex items-center justify-center relative z-10"
          style={{ perspective: '1200px' }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-md relative flex justify-center items-center h-full"
            ref={previewRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div 
              className="relative z-10 w-full flex justify-center items-center"
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                layout
                className={`transition-all duration-500 shadow-2xl relative bg-transparent overflow-hidden w-64 sm:w-72 md:w-80 ${getAspectRatioClass(activeSize?.id)}`}
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), inset 0 0 0 2px rgba(255,255,255,0.5)'
                }}
              >
                {/* Glass/Acrylic Effect */}
                <div className="absolute inset-0 z-20 pointer-events-none rounded-inherit border-[6px] border-white/20 mix-blend-screen"></div>
                <div className="absolute inset-0 z-30 pointer-events-none rounded-inherit bg-gradient-to-tr from-white/10 via-transparent to-white/40 mix-blend-overlay"></div>
                
                <div className="bg-[#e5e5e5] w-full h-full relative z-10">
                  <AnimatePresence mode="wait">
                    {activeItem ? (
                      <motion.img 
                        key={activeItem.id}
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        src={activeItem.url} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.div 
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full flex flex-col items-center justify-center text-black/20 bg-[#e5e5e5]"
                      >
                        <svg className="w-10 h-10 mb-2 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50 text-center">Empty<br/>Acrylic</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.div 
                  className="absolute inset-0 pointer-events-none opacity-60 mix-blend-overlay z-40"
                  animate={{
                    background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.9) ${25 + tilt.x}%, transparent 40%)`,
                  }}
                  transition={{ type: "tween", ease: "linear", duration: 0 }}
                />
              </motion.div>

              <motion.div 
                className={`absolute -inset-4 bg-black/20 blur-2xl -z-10 ${getAspectRatioClass(activeSize?.id)}`}
                animate={{
                  x: tilt.y * -1,
                  y: tilt.x * 1 + 20,
                  opacity: Math.max(0.2, 0.4 - Math.abs(tilt.x) * 0.01)
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
