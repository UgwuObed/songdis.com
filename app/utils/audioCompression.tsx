import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

let ffmpeg: FFmpeg | null = null;

export const compressAudio = async (file: File): Promise<Blob> => {
  if (!ffmpeg) {
    ffmpeg = new FFmpeg();
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
  }

  const fileName = 'input.' + file.name.split('.').pop();
  const outputName = 'output.mp3';

  await ffmpeg.writeFile(fileName, await fetchFile(file));

  await ffmpeg.exec([
    '-i', fileName,
    '-b:a', '128k',
    '-ar', '44100',
    outputName
  ]);

  const data = await ffmpeg.readFile(outputName);
  const blob = new Blob([data], { type: 'audio/mpeg' });
  

  await ffmpeg.deleteFile(fileName);
  await ffmpeg.deleteFile(outputName);

  return blob;
};