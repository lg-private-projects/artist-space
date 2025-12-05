import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { MapPin, Heart, Eye } from 'lucide-react'

interface ArtistCardProps {
  id: string
  displayName: string
  profilePhoto: string | null
  location: {
    city: string
    country: string
  }
  totalFollowers: number
  totalLikes: number
  totalArtworks: number
  plan: 'silver' | 'gold' | 'premium'
  bio?: string
}

export function ArtistCard({
  id,
  displayName,
  profilePhoto,
  location,
  totalFollowers,
  totalLikes,
  totalArtworks,
  plan,
  bio
}: ArtistCardProps) {
  const planColors = {
    silver: 'bg-gray-100 text-gray-700',
    gold: 'bg-yellow-100 text-yellow-700',
    premium: 'bg-purple-100 text-purple-700'
  }

  return (
    <Link href={`/artists/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        {/* Header con Avatar */}
        <div className="relative h-32 bg-gradient-to-br from-blue-500 to-purple-600">
          <div className="absolute -bottom-12 left-4">
            <Avatar className="w-24 h-24 border-4 border-white">
              <AvatarImage src={profilePhoto || ''} alt={displayName} />
              <AvatarFallback className="text-2xl">
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-lg">{displayName}</h3>
              <div className="flex items-center text-sm text-gray-600 gap-1">
                <MapPin className="w-3 h-3" />
                <span>{location.city}, {location.country}</span>
              </div>
            </div>
            <Badge className={planColors[plan]} variant="secondary">
              {plan}
            </Badge>
          </div>

          {bio && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {bio}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-600 border-t pt-3">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{totalArtworks} obras</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{totalFollowers} seguidores</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}