import { useEffect, useMemo, useRef, useState } from 'react'
import { Heart, X, Star } from 'lucide-react'

function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // km
  const toRad = (deg) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function ProfileCard({ profile, onLike, onPass, onSuperLike, distanceKm }) {
  return (
    <div className="relative h-[520px] w-full max-w-md select-none">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100 overflow-hidden">
        <img
          src={profile.photo}
          alt={profile.name}
          className="h-2/3 w-full object-cover"
          draggable={false}
        />
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-semibold text-gray-900">{profile.name}, {profile.age}</div>
              <div className="text-sm text-gray-500">{profile.bio}</div>
              {typeof distanceKm === 'number' && (
                <div className="mt-1 text-xs text-gray-400">{distanceKm.toFixed(1)} km away</div>
              )}
            </div>
            <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border">{profile.city}</div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <button onClick={onPass} aria-label="Pass" className="h-14 w-14 rounded-full bg-white text-gray-700 grid place-items-center shadow-lg border hover:bg-gray-50">
          <X />
        </button>
        <button onClick={onSuperLike} aria-label="Super Like" className="h-16 w-16 rounded-full bg-blue-50 text-blue-600 grid place-items-center shadow-lg border border-blue-200 hover:bg-blue-100">
          <Star />
        </button>
        <button onClick={onLike} aria-label="Like" className="h-14 w-14 rounded-full bg-emerald-50 text-emerald-600 grid place-items-center shadow-lg border border-emerald-200 hover:bg-emerald-100">
          <Heart />
        </button>
      </div>
    </div>
  )
}

export default function SwipeDeck({ userLocation, profiles, onMatch, onExhausted }) {
  const [index, setIndex] = useState(0)
  const likeCountRef = useRef(0)

  const current = profiles[index]

  const distance = useMemo(() => {
    if (!current || !userLocation) return undefined
    return haversineDistance(userLocation.lat, userLocation.lng, current.lat, current.lng)
  }, [current, userLocation])

  useEffect(() => {
    if (index >= profiles.length && onExhausted) onExhausted()
  }, [index, profiles.length, onExhausted])

  if (!current) {
    return (
      <div className="w-full max-w-md p-10 text-center text-gray-500">No more profiles nearby. Check back later!</div>
    )
  }

  const next = () => setIndex((i) => i + 1)

  const handleLike = () => {
    likeCountRef.current += 1
    // Simulate mutual like probability
    const mutual = Math.random() < 0.6
    if (mutual) onMatch(current)
    next()
  }

  const handlePass = () => {
    next()
  }

  const handleSuper = () => {
    // Super like increases mutual chance
    const mutual = Math.random() < 0.85
    if (mutual) onMatch(current, { super: true })
    next()
  }

  return (
    <div className="flex w-full flex-col items-center">
      <ProfileCard
        profile={current}
        onLike={handleLike}
        onPass={handlePass}
        onSuperLike={handleSuper}
        distanceKm={distance}
      />
    </div>
  )
}
