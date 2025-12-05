import Link from 'next/link'
import Image from 'next/image'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Eye } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface ArtworkCardProps {
  id: string
  artistId: string
  artistName: string
  title: string
  thumbnailUrl: string
  price: number | null
  isOnSale: boolean
  salePrice: number | null
  likesCount: number
  viewsCount: number
}

export function ArtworkCard({
  id,
  artistId,
  artistName,
  title,
  thumbnailUrl,
  price,
  isOnSale,
  salePrice,
  likesCount,
  viewsCount
}: ArtworkCardProps) {
  return (
    <Link href={`/artists/${artistId}/artwork/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Badge de oferta */}
          {isOnSale && salePrice && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive">
                Oferta
              </Badge>
            </div>
          )}

          {/* Overlay con stats */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white">
            <div className="flex items-center gap-1">
              <Heart className="w-5 h-5" />
              <span>{likesCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-5 h-5" />
              <span>{viewsCount}</span>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold line-clamp-1 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">por {artistName}</p>
          
          {price !== null && (
            <div className="flex items-center gap-2">
              {isOnSale && salePrice ? (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(price, 'CLP')}
                  </span>
                  <span className="font-bold text-red-600">
                    {formatCurrency(salePrice, 'CLP')}
                  </span>
                </>
              ) : (
                <span className="font-bold">
                  {formatCurrency(price, 'CLP')}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}