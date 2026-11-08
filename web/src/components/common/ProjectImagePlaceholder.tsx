import { Image as ImageIcon } from 'lucide-react'

interface ProjectImagePlaceholderProps {
  folder: string;
  name: string;
  aspectRatio?: string;
}

export default function ProjectImagePlaceholder({ folder, name, aspectRatio = "video" }: ProjectImagePlaceholderProps) {
  return (
    <div className={`w-full aspect-${aspectRatio} glass-panel border-dashed border-2 border-white/10 rounded-2xl flex flex-col items-center justify-center gap-4 group hover:border-primary/40 transition-all bg-white/5`}>
      <div className="p-5 rounded-full bg-white/5 text-gray-500 group-hover:text-primary transition-colors">
        <ImageIcon size={40} strokeWidth={1} />
      </div>
      <div className="text-center px-6">
        <div className="text-xs font-mono text-gray-400 mb-1 uppercase tracking-widest">Image Placeholder</div>
        <div className="text-sm font-mono text-primary/80 break-all font-bold">
          /assets/projects/{folder}/{name}.png
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
    </div>
  )
}
