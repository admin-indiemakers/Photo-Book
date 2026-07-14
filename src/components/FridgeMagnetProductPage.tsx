'use client';
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SIZES = [
  { id: 'standard', label: 'Standard', dimensions: 'Standard Size', price: 299 }
];

export const FridgeMagnetProductPage = () => {
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [uploadedImages, setUploadedImages] = useState<{id: string, url: string}[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showError, setShowError] = useState(false);

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
      
      const newImages = validFiles.map(file => ({
        id: Math.random().toString(36).substring(7),
        url: URL.createObjectURL(file)
      }));
      
      setUploadedImages(prev => [...prev, ...newImages]);
      if (uploadedImages.length === 0) setActiveImageIndex(0);
      
      setTimeout(() => setIsUploading(false), 400);
    }, 1200);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const handleAddToCart = () => {
    if (uploadedImages.length === 0) {
      setShowError(true);
      setTimeout(() => setShowError(false), 800);
      return;
    }
    console.log("Added to cart");
  };

  const removeImage = (index: number) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    if (activeImageIndex >= newImages.length) {
      setActiveImageIndex(Math.max(0, newImages.length - 1));
    }
  };

  const totalPrice = selectedSize.price.toFixed(2);

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-sans pb-24 text-black overflow-x-hidden pt-24 relative selection:bg-[#E85D26] selection:text-white">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 pt-8 flex flex-col lg:flex-row gap-16 relative">
        <div className="flex-1 w-full space-y-14 relative z-10">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-serif tracking-tight mb-4 text-[#1a1a18]"
              style={{ fontFamily: "'DM Serif Display', serif" }}
            >
              Fridge Magnets
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#6b6560] font-light max-w-md leading-relaxed"
            >
              Turn your favorite moments into premium magnetic prints that brighten up any space.
            </motion.p>
          </div>

          <div className="space-y-12">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#6b6560]">1. Select Size</h3>
                <span className="text-xs font-mono text-[#E85D26]">{selectedSize.dimensions}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {SIZES.map((size) => (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={size.id}
                    onClick={() => setSelectedSize(size)}
                    className={`relative p-4 rounded-xl border transition-colors flex flex-col items-center justify-center gap-3 overflow-hidden ${
                      selectedSize.id === size.id 
                        ? 'border-[#E85D26] bg-white shadow-[0_0_0_1px_#E85D26]' 
                        : 'border-black/5 bg-white/50 hover:bg-white hover:border-black/20'
                    }`}
                  >
                    <div className="w-10 h-10 border-2 border-black/20 rounded-md"></div>
                    <span className="font-medium text-sm text-[#1a1a18]">{size.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#6b6560]">2. Quantity</h3>
                <span className="text-xs font-mono text-[#E85D26]">₹{totalPrice}</span>
              </div>
              <div className="flex gap-3 bg-white/50 p-1.5 rounded-xl border border-black/5">
                <div className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-all bg-white shadow-sm border border-black/5 text-[#E85D26] text-center">
                  Pack of 1
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <h3 className="text-xs font-mono uppercase tracking-widest text-[#6b6560] mb-4">3. Upload Photos</h3>
              
              <motion.div 
                animate={showError ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`relative border-2 border-dashed rounded-xl overflow-hidden group transition-all duration-300 ${
                  isDragging ? 'border-[#E85D26] bg-[#E85D26]/5 scale-[1.02]' : 
                  showError ? 'border-red-500 bg-red-50' : 'border-black/10 bg-white/50 hover:bg-white hover:border-[#E85D26]/50'
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
                
                <div className="flex flex-col items-center justify-center p-10 h-40">
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
                        <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-2 group-hover:bg-[#E85D26]/10 transition-colors">
                          <svg className="w-5 h-5 text-[#6b6560] group-hover:text-[#E85D26] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                        <p className="font-medium text-[#1a1a18] text-sm">Drag & drop photos here</p>
                        <p className="text-xs text-[#6b6560]">Supports multiple files</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {uploadedImages.length > 0 && (
                <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                  <AnimatePresence>
                    {uploadedImages.map((img, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5, width: 0 }}
                        key={img.id}
                        className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 cursor-pointer border-2 transition-colors ${activeImageIndex === idx ? 'border-[#E85D26]' : 'border-transparent'}`}
                        onClick={() => setActiveImageIndex(idx)}
                      >
                        <img src={img.url} alt="thumb" className="w-full h-full object-cover" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                          className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 hover:opacity-100 transition-opacity"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="pt-8">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-[#1a1a18] text-white py-5 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 transform active:scale-[0.98]"
              >
                Add to Cart — ₹{totalPrice}
              </button>
            </motion.div>
          </div>
        </div>

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
              className="relative z-10"
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                layout
                className="transition-colors duration-500 shadow-xl relative bg-white p-3 rounded-lg border border-gray-200"
                style={{
                  boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.15)'
                }}
              >
                <div className="bg-[#e5e5e5] overflow-hidden relative w-64 sm:w-72 md:w-80 shadow-inner rounded-md aspect-square">
                  <AnimatePresence mode="popLayout">
                    {uploadedImages.length > 0 ? (
                      <motion.img 
                        key={uploadedImages[activeImageIndex].id}
                        initial={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        src={uploadedImages[activeImageIndex].url} 
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
                        <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Empty Magnet</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.div 
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay rounded-lg"
                  animate={{
                    background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) ${25 + tilt.x}%, transparent 30%)`,
                  }}
                  transition={{ type: "tween", ease: "linear", duration: 0 }}
                />
              </motion.div>

              <motion.div 
                className="absolute -inset-2 bg-black/10 blur-xl -z-10 rounded-xl"
                animate={{
                  x: tilt.y * -0.5,
                  y: tilt.x * 0.5 + 10,
                  opacity: Math.max(0.1, 0.3 - Math.abs(tilt.x) * 0.01)
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
