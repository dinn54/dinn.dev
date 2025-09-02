export const checkStorageResourceHealth = async (fileRoutePath: string) => {
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_NAME;
  if (!projectRef || !bucketName) return false;
  try {
    const url = `https://${projectRef}.supabase.co/storage/v1/object/public/${bucketName}${fileRoutePath}`;
    const res = await fetch(url, { method: "HEAD" });
    if (res.ok) {
      return true;
    }
  } catch (e) {
    console.warn(e);
  } finally {
    return false;
  }
};
