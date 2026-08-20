export type ToolGuideStep = {
  title: string;
  text: string;
};

export type ToolItem = {
  slug: string;
  name: string;
  category: string;
  description: string;
  inputFormats: string[];
  outputFormats: string[];
  bestFor: string;
  steps: ToolGuideStep[];
  tips: string[];
};

export const siteConfig = {
  name: 'Velora',
  tagline: 'Convert your files with a softer touch.',
  description: 'A polished converter for images, PDFs, and media with a premium, illustrated feel.',
};

export const tools: ToolItem[] = [
  {
    slug: 'image-convert',
    name: 'Image Convert',
    category: 'Image',
    description: 'Switch between JPG, PNG, and WEBP effortlessly.',
    inputFormats: ['JPG', 'JPEG', 'PNG', 'WEBP'],
    outputFormats: ['PNG', 'JPG', 'WEBP'],
    bestFor: 'Quick format changes for websites, apps, and portfolios.',
    steps: [
      { title: 'Upload your image', text: 'Choose a JPG, PNG, or WEBP file from your device.' },
      { title: 'Pick the new format', text: 'Select the output format you want to download.' },
      { title: 'Run the tool', text: 'Velora converts the file and prepares a clean download.' },
    ],
    tips: ['PNG is great for transparency.', 'JPG is usually smaller for photos.', 'WEBP is useful for modern web images.'],
  },
  {
    slug: 'image-resize',
    name: 'Image Resize',
    category: 'Image',
    description: 'Resize visuals for web, profile, and content use.',
    inputFormats: ['JPG', 'JPEG', 'PNG', 'WEBP'],
    outputFormats: ['Same as uploaded image'],
    bestFor: 'Profile images, banners, thumbnails, and social media posts.',
    steps: [
      { title: 'Upload the image', text: 'Choose the image you want to resize.' },
      { title: 'Set width and height', text: 'Enter the new size that best fits your use case.' },
      { title: 'Convert and download', text: 'The resized image will appear in the result panel.' },
    ],
    tips: ['Use common sizes like 1080×1080 for social posts.', 'Very small sizes may reduce clarity.', 'Keep width and height balanced for better-looking results.'],
  },
  {
    slug: 'image-compress',
    name: 'Image Compress',
    category: 'Image',
    description: 'Shrink image size while keeping it clean.',
    inputFormats: ['JPG', 'JPEG', 'PNG', 'WEBP'],
    outputFormats: ['Compressed image file'],
    bestFor: 'Reducing upload size for websites, email, and online forms.',
    steps: [
      { title: 'Upload your image', text: 'Choose the image that feels too large in file size.' },
      { title: 'Choose quality', text: 'Start around 70 for a balanced result.' },
      { title: 'Run compression', text: 'Velora reduces the file size and keeps the image usable.' },
    ],
    tips: ['Higher quality keeps more detail but saves less space.', 'Photos often compress better than illustrations.', 'Test 60 to 80 first before going very low.'],
  },

  {
    slug: 'image-background-remover',
    name: 'Background Remover',
    category: 'Image',
    description: 'Remove the background and export a cleaner transparent PNG.',
    inputFormats: ['JPG', 'JPEG', 'PNG', 'WEBP'],
    outputFormats: ['PNG'],
    bestFor: 'Product photos, profile images, thumbnails, stickers, and quick design cutouts.',
    steps: [
      { title: 'Upload your image', text: 'Choose a clear image with a subject you want to isolate.' },
      { title: 'Run the remover', text: 'Velora separates the main subject from the background.' },
      { title: 'Download the transparent PNG', text: 'Use the result in designs, slides, or product listings.' },
    ],
    tips: ['Works best when the subject stands out clearly from the background.', 'The output is exported as PNG to preserve transparency.', 'Busy or low-contrast backgrounds may need a second try with a cleaner image.'],
  },
  {
    slug: 'pdf-merge',
    name: 'PDF Merge',
    category: 'PDF',
    description: 'Combine multiple PDF files into one neat file.',
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    bestFor: 'Joining reports, lecture notes, invoices, and assignments.',
    steps: [
      { title: 'Upload at least two PDFs', text: 'Select all files you want to combine into one document.' },
      { title: 'Keep them in the right order', text: 'The files should already be arranged the way you want them combined.' },
      { title: 'Merge and download', text: 'Velora creates one clean merged PDF file.' },
    ],
    tips: ['Use clear file names before merging so you can track the order.', 'This works best with normal PDF files, not scanned password-protected ones.'],
  },
  {
    slug: 'pdf-split',
    name: 'PDF Split',
    category: 'PDF',
    description: 'Extract specific pages into smaller PDF files.',
    inputFormats: ['PDF'],
    outputFormats: ['PDF'],
    bestFor: 'Pulling out chapters, sections, or a page range from a larger PDF.',
    steps: [
      { title: 'Upload the PDF', text: 'Choose the document you want to split.' },
      { title: 'Set start and end pages', text: 'Enter the page range you want to extract.' },
      { title: 'Create the smaller PDF', text: 'Velora generates a new PDF for the selected pages.' },
    ],
    tips: ['Make sure the start page is not greater than the end page.', 'Check the original PDF page count first if you are unsure.'],
  },
  {
    slug: 'video-convert',
    name: 'Video Convert',
    category: 'Video',
    description: 'Convert AVI, MKV, MOV, WEBM, and MP4 between common video formats.',
    inputFormats: ['MP4', 'MOV', 'MKV', 'AVI', 'WEBM'],
    outputFormats: ['MP4', 'AVI', 'MKV', 'MOV', 'WEBM'],
    bestFor: 'Changing a video into a format that is easier to share or upload.',
    steps: [
      { title: 'Upload your video', text: 'Choose the video file from your computer.' },
      { title: 'Select an output format', text: 'Pick MP4, AVI, MKV, MOV, or WEBM.' },
      { title: 'Convert and download', text: 'Velora processes the file and gives you the new version.' },
    ],
    tips: ['MP4 is the safest choice for general compatibility.', 'AVI is older and may lower quality more than MP4.', 'Longer videos take more time to convert.'],
  },
  {
    slug: 'video-compress',
    name: 'Video Compress',
    category: 'Video',
    description: 'Reduce file size with light, medium, or strong compression.',
    inputFormats: ['MP4', 'MOV', 'MKV', 'AVI', 'WEBM'],
    outputFormats: ['Compressed MP4'],
    bestFor: 'Making large videos easier to upload, share, or store.',
    steps: [
      { title: 'Upload the video', text: 'Choose the large video you want to reduce in size.' },
      { title: 'Pick compression level', text: 'Start with medium if you are not sure.' },
      { title: 'Compress and compare', text: 'Download the result and check if the quality still matches your needs.' },
    ],
    tips: ['Light keeps more quality.', 'Strong saves more space but can visibly reduce quality.', 'Use medium first for a safer balance.'],
  },
  {
    slug: 'video-to-gif',
    name: 'Video to GIF',
    category: 'Video',
    description: 'Turn short video clips into animated GIFs.',
    inputFormats: ['MP4', 'MOV', 'MKV', 'AVI', 'WEBM'],
    outputFormats: ['GIF'],
    bestFor: 'Short reactions, quick demos, and lightweight animated snippets.',
    steps: [
      { title: 'Upload a short clip', text: 'Choose a video that is not too long for best results.' },
      { title: 'Run the GIF tool', text: 'Velora converts the clip into an animated GIF.' },
      { title: 'Download the GIF', text: 'Save it and use it in chat, slides, or social content.' },
    ],
    tips: ['Short clips work best.', 'GIFs can get large quickly.', 'The output may look softer than the original video.'],
  },
  {
    slug: 'video-extract-audio',
    name: 'Extract Audio',
    category: 'Video',
    description: 'Pull audio from a video and save it as MP3.',
    inputFormats: ['MP4', 'MOV', 'MKV', 'AVI', 'WEBM'],
    outputFormats: ['MP3'],
    bestFor: 'Saving voice, music, or lecture audio from a video file.',
    steps: [
      { title: 'Upload the video', text: 'Choose the file that contains the audio you want.' },
      { title: 'Run extraction', text: 'Velora separates the audio from the video.' },
      { title: 'Download the MP3', text: 'Use the audio file for listening or further editing.' },
    ],
    tips: ['The extracted audio is currently exported as MP3.', 'This is useful for interviews, lectures, and background audio.'],
  },
  {
    slug: 'audio-convert',
    name: 'Audio Convert',
    category: 'Audio',
    description: 'Convert MP3, WAV, OGG, AAC, and M4A between common audio formats.',
    inputFormats: ['MP3', 'WAV', 'OGG', 'AAC', 'M4A'],
    outputFormats: ['MP3', 'WAV', 'OGG', 'AAC', 'M4A'],
    bestFor: 'Making audio files easier to share, edit, or reuse on other platforms.',
    steps: [
      { title: 'Upload the audio file', text: 'Choose the music, voice, or audio clip you want to convert.' },
      { title: 'Select the output format', text: 'Pick the format that fits your next use.' },
      { title: 'Convert and download', text: 'Velora creates the new audio file for you.' },
    ],
    tips: ['MP3 is a safe general choice.', 'WAV is larger but can preserve more detail.', 'If compatibility matters, start with MP3.'],
  },
];
