import { mergeOptions } from 'element-plus/es/components/table/src/util';
import { QRCodeRenderersOptions, toDataURL } from 'qrcode';
import { FileToBase64 } from '@utils/file';

type  QrCodeOptionsPosition = ['left' | 'center' | 'right' | number, 'top' | 'center' | 'bottom' | number]
type base64String = string

export interface QrCodeOptions {
  dark: string;
  light: string;
  scale: number;
  margin: number;
  quality: number;
  width: number | undefined;
  level: 'L' | 'M' | 'Q' | 'H';
  // logo
  logo: File | base64String;
  logoOffset: [number, number];
  logoPosition: QrCodeOptionsPosition;
  // background
  offset: [number, number];
  position: QrCodeOptionsPosition;
  background: File | base64String;
}

function handleOptions(options: Partial<QrCodeOptions> = {}): QrCodeOptions {
  return mergeOptions<QrCodeOptions, Partial<QrCodeOptions>>({
    scale: 4,
    margin: 2,
    level: 'L',
    quality: 1,
    width: undefined,
    dark: '#000000ff',
    light: '#ffffffff',
    //
    logo: '',
    logoOffset: [0, 0],
    logoPosition: ['center', 'center'],
    //
    offset: [0, 0],
    background: '',
    position: ['center', 'center'],
  }, options);
}

function getQrCodeOptions(options: QrCodeOptions): QRCodeRenderersOptions {
  const { scale, margin, width, level, dark, light } = options;
  return { scale, margin, width, errorCorrectionLevel: level, color: { dark, light } };
}

function handleImage(value: File | base64String): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    if (typeof value === 'string') {
      img.src = value;
    } else {
      // 等待转换
      FileToBase64(value).then(base64 => {
        if (/^data:image\/\w+;/.test(base64)) {
          img.src = base64;
        } else {
          reject(new Error('The image file is not passed in'));
        }
      });
    }
    img.onerror = e => reject(e);
    img.onload = () => resolve(img);
  });
}

function handlePosition(box: { width: number; height: number }, value: { width: number; height: number }, offset: [number, number], position: QrCodeOptionsPosition) {
  let x = (box.width - value.width) / 2;
  let y = (box.height - value.height) / 2;
  const [positionX, positionY] = position;
  // x
  if (positionX === 'left') {
    x = 0;
  } else if (positionX === 'right') {
    x = box.width - value.width;
  } else if (typeof positionX == 'number') {
    x = positionX;
  }
  // y
  if (positionY === 'top') {
    y = 0;
  } else if (positionY === 'bottom') {
    y = box.height - value.height;
  } else if (typeof positionY == 'number') {
    y = positionY;
  }
  //offset
  return { x: x + offset[0], y: y + offset[1] };
}

// 如果有背景图片
export async function QrCodeOptions(value: string, config?: Partial<QrCodeOptions>) {
  const options = handleOptions(config);

  // 生成图片
  const logo = options.logo ? await handleImage(options.logo) : undefined;
  const qrcode = await handleImage(await toDataURL(value, getQrCodeOptions(options)));
  const background = options.background ? await handleImage(options.background) : undefined;

  //
  const width = Math.max(background?.width || 0, qrcode.width);
  const height = Math.max(background?.height || 0, qrcode.height);
  const dom = document.createElement('canvas');
  const cxt = dom.getContext('2d') as CanvasRenderingContext2D;
  dom.width = width;
  dom.height = height;

  // 写入 background
  if (background) {
    const x = (width - background.width) / 2;
    const y = (height - background.height) / 2;
    cxt.drawImage(background, x, y, background.width, background.height);
  }

  // 写入 qrcode
  const qrcodePosition = handlePosition({ width, height }, qrcode, options.offset, options.position);
  cxt.drawImage(qrcode, qrcodePosition.x, qrcodePosition.y, qrcode.width, qrcode.height);

  // 写入 logo
  if (logo) {
    const logoPosition = handlePosition({ width, height }, logo, options.logoOffset, options.logoPosition);
    cxt.drawImage(logo, logoPosition.x, logoPosition.y, logo.width, logo.height);
  }

  // 输出
  return dom.toDataURL('png', options.quality);
}

export default QrCodeOptions;
