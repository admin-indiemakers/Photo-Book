import { uploadImageAction as serverUploadImageAction } from '@/app/actions/upload';

/**
 * Drop-in wrapper for `uploadImageAction` that uploads image files to Supabase Storage via Server Action.
 */
export async function uploadImageAction(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    return await serverUploadImageAction(formData);
  } catch (err: any) {
    return { success: false, error: err.message || 'An error occurred during image upload' };
  }
}


