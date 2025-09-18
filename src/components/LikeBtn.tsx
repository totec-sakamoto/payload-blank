import { useLikedProductsStore } from '@/stores/likedProductsContext'
import { Clsss } from '@/components/utilities/misc'
import { useEffect, useState, useCallback, ButtonHTMLAttributes } from 'react'

type LikeBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  productId: string
}

/**
 * Like button component.
 * Allows users to like/unlike a product and animates the heart icon.
 * @param {LikeBtnProps} props - Component props
 */

export default function LikeBtn({ productId, ...props }: LikeBtnProps) {
  // Get liked products state and toggle function from store
  const { likedProducts, toggleLike } = useLikedProductsStore()
  // Local state for like status
  const [isLiked, setIsLiked] = useState(() =>
    likedProducts.includes(productId),
  )
  // Handle like button click
  const handleClick = useCallback(() => {
    toggleLike(productId)
  }, [toggleLike, productId])

  // Sync local like state with global store
  useEffect(() => {
    setIsLiked(likedProducts.includes(productId))
  }, [likedProducts, productId])

  return (
    <>
      <button
        type='button'
        data-liked={isLiked}
        aria-pressed={isLiked}
        onClick={handleClick}
        {...props}>
        <i
          className={Clsss(
            'bi-heart-fill',
            isLiked ? 'text-rose-600' : 'text-stone-300',
          )}
          aria-hidden='true'
        />
      </button>
      <style jsx>{`
        [data-liked='true'] {
          animation: heartBeat 0.3s ease-in-out forwards;
        }

        @keyframes heartBeat {
          0% {
            transform: scale(0.75);
          }

          50% {
            transform: scale(1.5);
          }

          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  )
}
