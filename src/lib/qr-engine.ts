import QRCode from 'qrcode';
import type { QRPayload, QRStyle } from './generators/types';
import { payloadToString } from './generators/payload';

export async function qrToCanvas(
  canvas: HTMLCanvasElement,
  payload: QRPayload,
  style: QRStyle
): Promise<void> {
  await QRCode.toCanvas(canvas, payloadToString(payload), {
    color: { dark: style.fgColor, light: style.bgColor },
    errorCorrectionLevel: style.errorCorrection,
    margin: style.margin,
    width: 512
  });
}

export async function qrToSvgString(
  payload: QRPayload,
  style: QRStyle
): Promise<string> {
  return QRCode.toString(payloadToString(payload), {
    type: 'svg',
    color: { dark: style.fgColor, light: style.bgColor },
    errorCorrectionLevel: style.errorCorrection,
    margin: style.margin
  });
}