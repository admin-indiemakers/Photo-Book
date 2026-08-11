import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  orderId: string;
  onSubmit: (data: any) => Promise<void>;
}

export default function ReviewModal({ isOpen, onClose, product, orderId, onSubmit }: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit({
      product_id: product.id,
      order_id: orderId,
      rating,
      review_text: reviewText,
      images: image ? [image] : []
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-[#FAF6EE] p-6 sm:p-8 rounded-3xl w-full max-w-lg shadow-2xl relative border border-[#DDD5C5]"
        >
          <div className="washi-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-[#3A342D]/50 hover:text-[#C27871] transition-colors"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          <h2 className="text-2xl sm:text-3xl text-[#3A342D] mb-1" style={{ fontFamily: "'Protest Riot', cursive, sans-serif" }}>
            Write a Review
          </h2>
          <p className="font-glory text-sm text-[#3A342D]/70 font-bold mb-6">
            Share your experience with your {product?.name || 'keepsake'}. ♡
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-glory font-bold text-[#3A342D] mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform hover:scale-110"
                  >
                    <span className="material-symbols-outlined text-3xl" style={{ color: star <= rating ? '#E1B382' : '#DDD5C5', fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-glory font-bold text-[#3A342D] mb-2">Your Review</label>
              <textarea
                required
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Tell us what you loved about it..."
                className="w-full p-3 bg-white border border-[#DDD5C5] rounded-xl focus:border-[#C27871] outline-none resize-none text-[#3A342D] font-glory"
              />
            </div>

            <div>
              <label className="block font-glory font-bold text-[#3A342D] mb-2">Upload a Photo (Optional)</label>
              <div className="flex flex-col sm:flex-row gap-3">
                {image && (
                  <div className="relative w-20 h-20 bg-white border border-[#DDD5C5] rounded-xl overflow-hidden flex-shrink-0">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="absolute -top-1 -right-1 bg-white rounded-full text-red-500 shadow hover:text-red-600 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">cancel</span>
                    </button>
                  </div>
                )}
                
                <label className="flex-1 min-h-[5rem] bg-white border border-dashed border-[#DDD5C5] hover:border-[#C27871] rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors text-[#3A342D]/50 hover:text-[#C27871]">
                  <span className="material-symbols-outlined text-2xl mb-1">add_photo_alternate</span>
                  <span className="font-glory text-xs font-bold">Click to Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      
                      try {
                        const fd = new FormData();
                        fd.append('image', file);
                        const res = await fetch('http://localhost:5000/api/products/upload-image', {
                          method: 'POST',
                          body: fd
                        });
                        if (!res.ok) throw new Error('Upload failed');
                        const data = await res.json();
                        setImage(data.url);
                      } catch (err) {
                        alert('Image upload failed.');
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#C27871] text-white rounded-full font-protest text-sm tracking-wider uppercase hover:bg-[#3A342D] transition-colors shadow-md mt-6 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
