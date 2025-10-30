import { MapPin, Crown } from 'lucide-react'

function AdStrip() {
  const ads = [
    { id: 1, text: 'Boost your profile — get 3x more views!', color: 'from-pink-500 to-rose-500' },
    { id: 2, text: 'Invite friends. Earn rewards every match.', color: 'from-indigo-500 to-blue-500' },
    { id: 3, text: 'Weekend Super Like sale is live now!', color: 'from-amber-500 to-orange-500' },
  ]
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/20">
      <div className="flex animate-[scroll_24s_linear_infinite] gap-3 whitespace-nowrap">
        {ads.concat(ads).map((ad, idx) => (
          <span
            key={`${ad.id}-${idx}`}
            className={`mx-2 my-1 inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${ad.color} px-3 py-1 text-xs font-medium text-white shadow`}
          >
            <Crown size={14} />
            {ad.text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  )
}

export default function Header({ userGender, locationEnabled, onToggleGender, onRequestLocation }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white grid place-items-center font-black">F</div>
          <div>
            <div className="text-sm text-gray-500">Flames Match</div>
            <div className="text-xs text-gray-400">Tinder-style nearby matching</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleGender}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition shadow-sm ${
              userGender === 'female'
                ? 'bg-pink-50 text-pink-600 border-pink-200'
                : 'bg-blue-50 text-blue-600 border-blue-200'
            }`}
            aria-label="Toggle gender"
          >
            {userGender === 'female' ? 'Using as: Girl (Premium Free)' : 'Using as: Boy (₹49)'}
          </button>

          <button
            onClick={onRequestLocation}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition ${
              locationEnabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            <MapPin size={16} />
            {locationEnabled ? 'Location On' : 'Use Nearby' }
          </button>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-3">
        <AdStrip />
      </div>
    </header>
  )
}
