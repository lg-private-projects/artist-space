import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Heart } from 'lucide-react'
import { formatRelativeTime } from '@/lib/utils'

interface StatusCardProps {
  id: string
  artistId: string
  artistName: string
  artistPhoto: string | null
  content: string
  imageUrl: string | null
  likesCount: number
  createdAt: string
}

export function StatusCard({
  id,
  artistId,
  artistName,
  artistPhoto,
  content,
  imageUrl,
  likesCount,
  createdAt
}: StatusCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <Link href={`/artists/${artistId}`}>
          <Avatar className="w-10 h-10">
            <AvatarImage src={artistPhoto || ''} alt={artistName} />
            <AvatarFallback>
              {artistName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Link>
        
        <div className="flex-1 min-w-0">
          <Link href={`/artists/${artistId}`} className="font-semibold hover:underline">
            {artistName}
          </Link>
          <p className="text-xs text-gray-500">
            {formatRelativeTime(createdAt)}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm mb-3 whitespace-pre-line">{content}</p>

      {/* Image */}
      {imageUrl && (
        <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-gray-100">
          <Image
            src={imageUrl}
            alt="Status image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
          />
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-1 text-gray-600">
        <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
          <Heart className="w-4 h-4" />
          <span className="text-sm">{likesCount}</span>
        </button>
      </div>
    </Card>
  )
}