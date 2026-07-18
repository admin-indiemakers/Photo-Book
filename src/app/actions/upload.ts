'use server';

import { supabaseAdmin } from '@/lib/supabase';

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const filePath = formData.get('filePath') as string;
    
    if (!file || !filePath) {
      return { success: false, error: 'Missing file or path' };
    }
    
    const buffer = await file.arrayBuffer();
    
    const { data, error } = await supabaseAdmin.storage
      .from('customer-uploads')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      });
      
    if (error) {
      return { success: false, error: error.message };
    }
    
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('customer-uploads')
      .getPublicUrl(filePath);
      
    return { success: true, url: publicUrlData.publicUrl };
  } catch (err: any) {
    return { success: false, error: err.message || 'An error occurred during upload' };
  }
}
