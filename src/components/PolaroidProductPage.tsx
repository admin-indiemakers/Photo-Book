'use client';
import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import polaroid1 from '@/assets/Polariod 3.jpg';
import polaroid2 from '@/assets/Polariod 1.jpg';
import polaroid3 from '@/assets/Polariod 2.jpg';

const SIZES = [
  { id: '2.5x3', label: 'Mini', dimensions: '2.5inch X 3 inch', price: 299 },
  { id: '4x4', label: 'Square', dimensions: '4inch X 4 inch', price: 499 }
];

type PolaroidItem = {
  id: string;
  url: string;
  sizeId: string;
  quantity: number;
  caption: string;
};

export const PolaroidProductPage = () => {
  const [polaroidItems, setPolaroidItems] = useState<PolaroidItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showError, setShowError] = useState(false);
  const [toastError, setToastError] = useState<string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Force scroll recalculation when items change so Lenis knows the page got taller
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      if (typeof window !== 'undefined' && (window as any).ScrollTrigger) {
        (window as any).ScrollTrigger.refresh();
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, [polaroidItems]);

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

  const processFiles = async (files: FileList) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    if (!validFiles.length) return;

    setIsUploading(true);
    setShowError(false);
    setUploadProgress(10);

    try {
      const { uploadImageAction } = await import('@/app/actions/upload');
      const newItems: PolaroidItem[] = [];
      let processed = 0;

      for (const file of validFiles) {
        const fileExt = file.name.split('.').pop() || 'jpg';
        const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
        const filePath = `polaroids/${fileName}`;

        const formData = new FormData();
        formData.append('file', file);
        formData.append('filePath', filePath);

        const result = await uploadImageAction(formData);

        if (!result.success) {
          console.error("Upload error", result.error);
        } else if (result.url) {
          newItems.push({
            id: Math.random().toString(36).substring(7),
            url: result.url,
            sizeId: SIZES[0].id,
            quantity: 1,
            caption: ''
          });
        }
        processed++;
        setUploadProgress(10 + (processed / validFiles.length) * 90);
      }

      setPolaroidItems(prev => {
        const nextItems = [...prev, ...newItems];
        if (prev.length === 0 && nextItems.length > 0) {
          setActiveItemId(nextItems[0].id);
        }
        return nextItems;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setIsUploading(false), 400);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
  }, []);

  const addItemsToDatabaseCart = async () => {
    const { addToCart } = await import('@/app/actions/cart');
    const { supabase } = await import('@/lib/supabase');
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      alert('Please log in to add items to cart');
      window.location.href = '/login';
      return false;
    }
    
    const productId = 'aef5f9c4-9561-4fce-b763-32b9bd55e3ba'; // Custom Polaroids DB ID
    const customOptions = { items: polaroidItems };
    
    const result = await addToCart(session.user.id, productId, 1, customOptions, grandTotal);
    
    if (!result.success) {
      alert(result.error || 'Failed to add to cart. Are you logged in?');
      return false;
    }
    return true;
  };

  const total2x3 = polaroidItems.filter(item => item.sizeId === '2.5x3').reduce((acc, item) => acc + item.quantity, 0);
  const total4x4 = polaroidItems.filter(item => item.sizeId === '4x4').reduce((acc, item) => acc + item.quantity, 0);

  const packs2x3 = Math.ceil(total2x3 / 16);
  const packs4x4 = Math.ceil(total4x4 / 16);

  const grandTotal = (packs2x3 * 299) + (packs4x4 * 499);

  const validationError = (() => {
    if (polaroidItems.length === 0) return 'Please add at least one photo.';
    if (total2x3 > 0 && total2x3 % 16 !== 0) {
      const missing = 16 - (total2x3 % 16);
      return `You can add ${missing} more Mini pcs... the pack amount is the same!`;
    }
    if (total4x4 > 0 && total4x4 % 16 !== 0) {
      const missing = 16 - (total4x4 % 16);
      return `You can add ${missing} more Square pcs... the pack amount is the same!`;
    }
    return null;
  })();

  const handleAddToCart = async () => {
    if (validationError) {
      setToastError(validationError);
      setTimeout(() => setToastError(null), 3000);
      setShowError(true);
      setTimeout(() => setShowError(false), 800);
      return;
    }
    
    setIsAddingToCart(true);
    try {
      const success = await addItemsToDatabaseCart();
      if (success) {
        setShowSuccessMessage(true);
        setTimeout(() => {
          window.location.href = '/cart';
        }, 1500);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (validationError) {
      setToastError(validationError);
      setTimeout(() => setToastError(null), 3000);
      setShowError(true);
      setTimeout(() => setShowError(false), 800);
      return;
    }
    
    setIsAddingToCart(true);
    try {
      const success = await addItemsToDatabaseCart();
      if (success) {
        window.location.href = '/cart'; // Redirect to checkout flow
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const removeImage = (idToRemove: string) => {
    setPolaroidItems(prev => {
      const filtered = prev.filter(item => item.id !== idToRemove);
      if (activeItemId === idToRemove) {
        setActiveItemId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  const updateItemSize = (id: string, newSizeId: string) => {
    setPolaroidItems(prev => prev.map(item => item.id === id ? { ...item, sizeId: newSizeId } : item));
  };

  const updateItemQuantity = (id: string, delta: number) => {
    setPolaroidItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const updateItemCaption = (id: string, newCaption: string) => {
    setPolaroidItems(prev => prev.map(item => item.id === id ? { ...item, caption: newCaption } : item));
  };

  // The grandTotal and totals are already calculated above.

  const activeItem = polaroidItems.find(item => item.id === activeItemId);
  const activeSize = activeItem ? SIZES.find(s => s.id === activeItem.sizeId) : SIZES[0];

  return (
    <div className="min-h-screen bg-[#F7F5F0] font-sans pb-24 text-black pt-24 relative selection:bg-[#E85D26] selection:text-white">
      {/* Decorative film grain */}
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
              Custom Polaroids
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#6b6560] font-light max-w-md leading-relaxed"
            >
              Turn your digital memories into tangible, hand-finished instant prints. Configure size, quantity, and captions for each photo individually.
            </motion.p>
          </div>

          {polaroidItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 mt-6"
            >
              {/* Sizes */}
              <div className="bg-white/60 p-4 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-shadow sm:col-span-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E85D26] mb-2 flex items-center gap-2 font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                  Available Sizes
                </div>
                <div className="text-sm font-medium text-[#1a1a18]">Mini & Square</div>
                <div className="text-xs text-[#6b6560] mt-1">2 different sizes to choose from</div>
              </div>

              {/* Price */}
              <div className="bg-white/60 p-4 rounded-xl border border-black/5 shadow-sm hover:shadow-md transition-shadow sm:col-span-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E85D26] mb-2 flex items-center gap-2 font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Pricing
                </div>
                <div className="flex flex-col gap-2 mt-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-[#1a1a18]">Mini <span className="text-[#6b6560] font-normal text-xs ml-1">(2.5" x 3")</span></span>
                    <span className="font-mono text-[#E85D26] font-semibold">₹299 <span className="text-xs text-[#6b6560] font-normal lowercase tracking-normal ml-1">/ 1 pack (16 pcs)</span></span>
                  </div>
                  <div className="flex justify-between items-center text-sm pt-2 border-t border-black/5">
                    <span className="font-medium text-[#1a1a18]">Square <span className="text-[#6b6560] font-normal text-xs ml-1">(4" x 4")</span></span>
                    <span className="font-mono text-[#E85D26] font-semibold">₹499 <span className="text-xs text-[#6b6560] font-normal lowercase tracking-normal ml-1">/ 1 pack (16 pcs)</span></span>
                  </div>
                </div>
              </div>

              {/* Formats */}
              <div className="bg-white/60 p-4 rounded-xl border border-black/5 shadow-sm sm:col-span-2 hover:shadow-md transition-shadow">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#E85D26] mb-3 flex items-center gap-2 font-bold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  Supported Formats
                </div>
                <div className="flex flex-wrap gap-2">
                  {['.JPG', '.PNG', '.HEIC', '.WEBP', '.PDF', '.PSD', '.AI', '.EPS', '.TIFF', '+ more'].map(ext => (
                    <span key={ext} className="px-2.5 py-1 bg-black/5 text-[#1a1a18] text-[10px] font-mono rounded-md border border-black/5 hover:bg-black/10 transition-colors">{ext}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div className="space-y-10">
            {/* Step 1: Upload */}
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex justify-between items-end mb-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#6b6560]">1. Upload Photos</h3>
              </div>

              <motion.div
                animate={showError && polaroidItems.length === 0 ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`relative border-2 border-dashed rounded-xl overflow-hidden group transition-all duration-300 ${isDragging ? 'border-[#E85D26] bg-[#E85D26]/5 scale-[1.02]' :
                  (showError && polaroidItems.length === 0) ? 'border-red-500 bg-red-50' : 'border-black/10 bg-white/50 hover:bg-white hover:border-[#E85D26]/50'
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
                        <p className="font-medium text-[#1a1a18] text-sm">Drag & drop to add photos</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>

            {/* Step 2: Configure Items */}
            {polaroidItems.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#6b6560] mb-4">2. Configure Polaroids</h3>

                {/* Pack Builder Tracker */}
                <div className="bg-white/60 p-4 rounded-xl border border-[#E85D26]/20 shadow-sm mb-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#E85D26] mb-4 flex items-center gap-2 font-bold">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    Pack Builder Status
                  </div>
                  
                  <div className="space-y-5">
                    {total2x3 > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-[#1a1a18]">Mini (2.5x3) - {packs2x3} Pack{packs2x3 > 1 ? 's' : ''}</span>
                          <span className="text-[#6b6560] font-mono">{total2x3} / {packs2x3 * 16} pieces</span>
                        </div>
                        <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#E85D26] transition-all duration-300" style={{ width: `${(total2x3 / (packs2x3 * 16)) * 100}%` }}></div>
                        </div>
                        {total2x3 % 16 !== 0 && (
                          <div className="text-xs text-[#E85D26] mt-2 font-medium">You can add {16 - (total2x3 % 16)} more pcs... the pack amount is the same!</div>
                        )}
                      </div>
                    )}
                    {total4x4 > 0 && (
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-[#1a1a18]">Square (4x4) - {packs4x4} Pack{packs4x4 > 1 ? 's' : ''}</span>
                          <span className="text-[#6b6560] font-mono">{total4x4} / {packs4x4 * 16} pieces</span>
                        </div>
                        <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                          <div className="h-full bg-[#E85D26] transition-all duration-300" style={{ width: `${(total4x4 / (packs4x4 * 16)) * 100}%` }}></div>
                        </div>
                        {total4x4 % 16 !== 0 && (
                          <div className="text-xs text-[#E85D26] mt-2 font-medium">You can add {16 - (total4x4 % 16)} more pcs... the pack amount is the same!</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <AnimatePresence>
                    {polaroidItems.map((item) => {
                      const itemSize = SIZES.find(s => s.id === item.sizeId) || SIZES[0];
                      const isActive = activeItemId === item.id;

                      return (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, height: 0, marginTop: 0, marginBottom: 0 }}
                          key={item.id}
                          onClick={() => setActiveItemId(item.id)}
                          className={`relative p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-4 ${isActive ? 'border-[#E85D26] bg-white shadow-md' : 'border-black/5 bg-white/50 hover:bg-white hover:border-black/20'
                            }`}
                        >
                          <div className="flex flex-col sm:flex-row gap-4 items-center w-full">
                            <div className="flex-shrink-0 w-20 h-24 rounded-sm overflow-hidden bg-white border-8 border-b-[24px] border-white shadow-sm">
                              <img src={item.url} alt="thumbnail" className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full">
                              {/* Size Selector */}
                              <div className="flex-1">
                                <label className="text-[10px] uppercase font-mono tracking-widest text-[#E85D26] mb-1 block font-bold">Select Size</label>
                                <div className="relative group shadow-sm">
                                  <select
                                    value={item.sizeId}
                                    onChange={(e) => updateItemSize(item.id, e.target.value)}
                                    className="w-full bg-white border-2 border-[#E85D26]/40 hover:border-[#E85D26] rounded-lg text-sm pl-3 pr-8 py-2.5 outline-none focus:ring-4 focus:ring-[#E85D26]/10 transition-all appearance-none cursor-pointer font-medium text-black"
                                  >
                                    {SIZES.map(s => (
                                      <option key={s.id} value={s.id}>{s.label} ({s.dimensions}) - ₹{s.price} / pack of 16</option>
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
                              <button
                                onClick={(e) => { e.stopPropagation(); removeImage(item.id); }}
                                className="text-black/30 hover:text-red-500 transition-colors p-1"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            </div>
                          </div>

                          {/* Caption Input */}
                          <div className="w-full pt-2 border-t border-black/5">
                            <label className="text-[10px] uppercase font-mono tracking-widest text-black/40 mb-1 block">Caption (Optional)</label>
                            <input
                              type="text"
                              maxLength={30}
                              value={item.caption}
                              onChange={(e) => updateItemCaption(item.id, e.target.value)}
                              className="w-full bg-white border border-black/10 hover:border-black/20 rounded-lg text-sm px-3 py-2 outline-none focus:border-[#E85D26] focus:ring-1 focus:ring-[#E85D26] transition-all text-black placeholder:text-black/30"
                              placeholder="E.g., Summer 2026..."
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Add to Cart and Buy Now */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-4 space-y-3">
              {showSuccessMessage && (
                <div className="bg-green-50 text-green-700 text-sm p-3 rounded-lg border border-green-100 text-center font-medium">
                  Products are added to cart successfully!
                </div>
              )}
              
              <AnimatePresence>
                {toastError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }} 
                    className="bg-[#E85D26]/10 text-[#E85D26] text-sm p-3 rounded-lg border border-[#E85D26]/20 shadow-sm text-center font-medium"
                  >
                    {toastError}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex gap-3">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-white text-black border border-black/10 py-4 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-gray-50 transition-all duration-300 transform active:scale-[0.98] flex justify-center items-center disabled:opacity-50"
                >
                  <span>{isAddingToCart ? 'Adding...' : 'Add to Cart'}</span>
                </button>
                <button 
                  onClick={handleBuyNow}
                  disabled={isAddingToCart}
                  className="flex-1 bg-[#1a1a18] text-white py-4 rounded-xl font-mono text-sm uppercase tracking-widest hover:bg-[#E85D26] hover:shadow-xl hover:shadow-[#E85D26]/20 transition-all duration-300 transform active:scale-[0.98] flex justify-center items-center disabled:opacity-50"
                >
                  <span>Buy Now - ₹{grandTotal.toFixed(2)}</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Floating Hero Preview */}
        <div
          className="flex-1 w-full lg:sticky lg:top-24 h-[600px] flex items-center justify-center relative z-10"
          style={{ perspective: '1200px' }}
        >
          {polaroidItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full h-full flex flex-col gap-4 py-4"
            >
              {/* Main Product Image */}
              <div className="w-full h-[60%] rounded-2xl overflow-hidden bg-black/5 relative group shadow-sm border border-black/5">
                <img
                  src={polaroid1.src}
                  alt="Polaroid gallery"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white text-sm font-medium uppercase tracking-widest drop-shadow-md">Premium Quality</span>
                </div>
              </div>
              {/* Product Images Grid */}
              <div className="w-full h-[40%] flex gap-4">
                <div className="flex-1 rounded-2xl overflow-hidden bg-black/5 shadow-sm border border-black/5">
                  <img src={polaroid2.src} alt="Polaroid detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1 rounded-2xl overflow-hidden bg-black/5 shadow-sm border border-black/5">
                  <img src={polaroid3.src} alt="Polaroid lifestyle" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full max-w-md relative flex justify-center items-center h-full"
              ref={previewRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* 3D Wrapper */}
              <motion.div
                className="relative z-10"
                animate={{ rotateX: tilt.x, rotateY: tilt.y }}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Polaroid Frame */}
                <motion.div
                  layout
                  className={`transition-all duration-500 shadow-2xl relative bg-white ${activeSize?.id === '2.5x3' ? 'p-3 pb-12' : 'p-4 pb-16'}`}
                  style={{
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(0,0,0,0.05)'
                  }}
                >

                  {/* Photo Area */}
                  <div className={`bg-[#e5e5e5] overflow-hidden relative w-64 sm:w-72 md:w-80 shadow-inner transition-all duration-500 ${activeSize?.id === '2.5x3' ? 'aspect-[2.5/3]' : 'aspect-square'}`}>
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
                          <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Empty Canvas</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Caption Area */}
                  <div className="mt-3 text-center w-full px-2 h-8 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={activeItem?.caption || 'empty'}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-2xl text-black/80 whitespace-nowrap overflow-hidden text-ellipsis w-full"
                        style={{ fontFamily: "var(--font-hand, 'Caveat', cursive)" }}
                      >
                        {activeItem?.caption || ""}
                      </motion.p>
                    </AnimatePresence>
                  </div>

                  {/* Glossy 3D Reflection */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                    animate={{
                      background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) ${25 + tilt.x}%, transparent 30%)`,
                    }}
                    transition={{ type: "tween", ease: "linear", duration: 0 }}
                  />
                </motion.div>

                {/* Dynamic Drop Shadow Layer */}
                <motion.div
                  className="absolute -inset-4 bg-black/20 blur-2xl -z-10 rounded-xl"
                  animate={{
                    x: tilt.y * -1,
                    y: tilt.x * 1 + 20,
                    opacity: Math.max(0.2, 0.4 - Math.abs(tilt.x) * 0.01)
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
