import { getSignedUploadUrlAction } from '@/app/actions/upload';
import { supabase } from '@/lib/supabase';

/**
 * Drop-in replacement for `uploadImageAction` that bypasses Next.js server limits (4.5MB).
 * This function uses a signed URL to upload directly from the client browser to Supabase Storage.
 */
export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get('file') as File;
    const filePath = formData.get('filePath') as string;
    
    if (!file || !filePath) {
      return { success: false, error: 'Missing file or path' };
    }
    
    // 1. Get Signed URL from server (bypasses RLS safely since server creates it)
    const signResult = await getSignedUploadUrlAction(filePath);
    if (!signResult.success || !signResult.token) {
      return { success: false, error: signResult.error || 'Failed to get signed URL' };
    }
    
    // 2. Upload directly from browser to Supabase using the signed URL
    const { data, error } = await supabase.storage
      .from('customer-uploads')
      .uploadToSignedUrl(filePath, signResult.token, file, {
        upsert: true
      });
      
    if (error) {
      return { success: false, error: error.message };
    }
    
    // 3. Get the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('customer-uploads')
      .getPublicUrl(filePath);
      
    return { success: true, url: publicUrlData.publicUrl };
  } catch (err: any) {
    return { success: false, error: err.message || 'An error occurred during client upload' };
  }
}
