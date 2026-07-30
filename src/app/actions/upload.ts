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
      const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
      const isMissingOrPlaceholder = !rawKey || rawKey.includes('PASTE_YOUR') || !rawKey.startsWith('eyJ');
      
      if (error.message.includes('row-level security policy') || error.message.includes('Compact JWS') || isMissingOrPlaceholder) {
        if (isMissingOrPlaceholder) {
          console.error('SUPABASE_SERVICE_ROLE_KEY is missing or contains placeholder text in .env.local.');
          return { 
            success: false, 
            error: 'Please replace PASTE_YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE in .env.local with your real Supabase service_role key (starts with eyJ...).' 
          };
        }
      }
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

export async function getSignedUploadUrlAction(filePath: string) {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from('customer-uploads')
      .createSignedUploadUrl(filePath);
      
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { 
      success: true, 
      signedUrl: data.signedUrl, 
      token: data.token, 
      path: data.path 
    };
  } catch (err: any) {
    return { success: false, error: err.message || 'An error occurred generating signed URL' };
  }
}
