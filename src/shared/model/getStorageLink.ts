export const getStorageLink = (fileRoutePath = "") => {
  const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET_NAME;
  if (!projectRef || !bucketName) return;
  return `${projectRef}/storage/v1/object/public/${bucketName}${fileRoutePath}`;
};
