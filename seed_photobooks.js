require('dotenv').config({path: '.env'}); 
const { createClient } = require('@supabase/supabase-js'); 
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY); 

async function run() {
  const templates = [
    { name: 'Wanderlust', slug: 'wanderlust', category: 'photo_book', description: 'Travel photobook template', base_price: 39.00, stock_quantity: 100, images: ['https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80'], attributes: {pages: 12, theme: 'Travel'}, sku: 'PB-WAND' },
    { name: 'Wedding Bliss', slug: 'wedding-bliss', category: 'photo_book', description: 'Wedding photobook template', base_price: 89.00, stock_quantity: 100, images: ['https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'], attributes: {pages: 40, theme: 'Wedding'}, sku: 'PB-WEDD' },
    { name: 'Little One', slug: 'little-one', category: 'photo_book', description: 'Family photobook template', base_price: 49.00, stock_quantity: 100, images: ['https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80'], attributes: {pages: 24, theme: 'Family'}, sku: 'PB-LITT' },
    { name: 'Family Time', slug: 'family-time', category: 'photo_book', description: 'Family photobook template', base_price: 69.00, stock_quantity: 100, images: ['https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&q=80'], attributes: {pages: 36, theme: 'Family'}, sku: 'PB-FAMT' },
    { name: 'Milestones', slug: 'milestones', category: 'photo_book', description: 'Occasions photobook template', base_price: 59.00, stock_quantity: 100, images: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80'], attributes: {pages: 28, theme: 'Occasions'}, sku: 'PB-MILE' },
    { name: 'Year in Review', slug: 'year-in-review', category: 'photo_book', description: 'Occasions photobook template', base_price: 99.00, stock_quantity: 100, images: ['https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80'], attributes: {pages: 50, theme: 'Occasions'}, sku: 'PB-YEAR' },
    { name: 'Creative Portfolio', slug: 'creative-portfolio', category: 'photo_book', description: 'Portfolio photobook template', base_price: 45.00, stock_quantity: 100, images: ['https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&q=80'], attributes: {pages: 20, theme: 'Portfolio'}, sku: 'PB-CREA' },
    { name: 'Family Recipes', slug: 'family-recipes', category: 'photo_book', description: 'Family photobook template', base_price: 55.00, stock_quantity: 100, images: ['https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&q=80'], attributes: {pages: 30, theme: 'Family'}, sku: 'PB-RECI' }
  ];

  for (const tpl of templates) {
    const { error } = await supabase.from('products').upsert(tpl, { onConflict: 'slug' });
    if (error) console.error(error);
  }
  console.log("Templates seeded into products table!");
}
run();
