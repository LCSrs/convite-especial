export async function blobUrlToDataUrl(blobUrl: string): Promise<string> {
  const response = await fetch(blobUrl);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function preparePhotoForStorage(
  photoUrl: string | null,
): Promise<string | null> {
  if (!photoUrl) return null;
  if (photoUrl.startsWith("data:")) return photoUrl;
  if (photoUrl.startsWith("blob:")) return blobUrlToDataUrl(photoUrl);
  return photoUrl;
}
