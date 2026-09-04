export async function compositeLogo(
  canvas: HTMLCanvasElement,
  logo: { dataUrl: string; sizePercent: number }
): Promise<void> {
  const sizePercent = Math.min(Math.max(logo.sizePercent, 10), 30);
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot get 2d context');

  const img = await loadImage(logo.dataUrl);
  const logoSize = (canvas.width * sizePercent) / 100;
  const x = (canvas.width - logoSize) / 2;
  const y = (canvas.height - logoSize) / 2;

  // White rounded rect background for scannability
  const padding = logoSize * 0.08;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x - padding, y - padding, logoSize + padding * 2, logoSize + padding * 2);

  ctx.drawImage(img, x, y, logoSize, logoSize);
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}