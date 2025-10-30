import { useCallback, useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import SwipeDeck from './components/SwipeDeck'
import SubscriptionPanel from './components/SubscriptionPanel'
import EarningsPanel from './components/EarningsPanel'

const SAMPLE_PROFILES = [
  { id: 1, name: 'Aarav', age: 24, city: 'Mumbai', bio: 'Coffee lover • Musician • Beach walks', lat: 19.076, lng: 72.8777, photo: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?q=80&w=1600&auto=format&fit=crop' },
  { id: 2, name: 'Kiara', age: 23, city: 'Pune', bio: 'Binge-watcher • Plant mom • Chai > Coffee', lat: 18.5204, lng: 73.8567, photo: 'https://images.unsplash.com/photo-1558222217-52b1926dfb76?q=80&w=1600&auto=format&fit=crop' },
  { id: 3, name: 'Ishaan', age: 27, city: 'Delhi', bio: 'Food explorer • Night rider • Startups', lat: 28.6139, lng: 77.209, photo: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=1600&auto=format&fit=crop' },
  { id: 4, name: 'Ananya', age: 25, city: 'Bengaluru', bio: 'Techie • Dogs • Weekend treks', lat: 12.9716, lng: 77.5946, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop' },
]

export default function App() {
  const [userGender, setUserGender] = useState('female')
  const [userLocation, setUserLocation] = useState(null)
  const [matches, setMatches] = useState([])
  const [subscribedMatches, setSubscribedMatches] = useState(0)
  const [deckKey, setDeckKey] = useState(0)

  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
      },
      () => {
        // Permission denied or unavailable
        setUserLocation(null)
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }, [])

  useEffect(() => {
    // Try to get location once on mount (non-blocking)
    if ('geolocation' in navigator) {
      navigator.permissions?.query?.({ name: 'geolocation' }).then(() => {})
    }
  }, [])

  const handleMatch = useCallback((profile, { super: isSuper } = {}) => {
    setMatches((prev) => {
      const next = [...prev, { profile, isSuper }]
      // Simulate: a proportion of matches from boys will subscribe. We count only if user is girl.
      if (userGender === 'female') {
        // 40% of matched boys subscribe; identify boys by name heuristic (for demo only)
        const isBoy = ['Aarav', 'Ishaan'].includes(profile.name)
        if (isBoy && Math.random() < 0.4) {
          setSubscribedMatches((c) => c + 1)
        }
      }
      return next
    })
  }, [userGender])

  const resetDeck = () => {
    setMatches([])
    setSubscribedMatches(0)
    setDeckKey((k) => k + 1)
  }

  const filteredProfiles = useMemo(() => {
    // If the user is female, surface more boys first and vice versa (demo behavior)
    const boys = SAMPLE_PROFILES.filter((p) => ['Aarav', 'Ishaan'].includes(p.name))
    const girls = SAMPLE_PROFILES.filter((p) => ['Kiara', 'Ananya'].includes(p.name))
    return userGender === 'female' ? boys.concat(girls) : girls.concat(boys)
  }, [userGender])

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-indigo-50">
      <Header
        userGender={userGender}
        locationEnabled={!!userLocation}
        onToggleGender={() => setUserGender((g) => (g === 'female' ? 'male' : 'female'))}
        onRequestLocation={requestLocation}
      />

      <main className="mx-auto max-w-6xl px-4 pt-8 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <section className="lg:col-span-2 flex flex-col items-center">
          <SwipeDeck
            key={deckKey}
            userLocation={userLocation}
            profiles={filteredProfiles}
            onMatch={handleMatch}
            onExhausted={() => {}}
          />

          <div className="mt-12 text-center text-sm text-gray-500">
            Swiped {matches.length} {matches.length === 1 ? 'match' : 'matches'} so far
            <button onClick={resetDeck} className="ml-3 inline-flex text-indigo-600 hover:text-indigo-700 underline">Reset</button>
          </div>
        </section>

        <aside className="space-y-6">
          <SubscriptionPanel userGender={userGender} />
          <EarningsPanel userGender={userGender} matchCount={matches.length} subscribedMatches={subscribedMatches} />

          <div className="rounded-2xl border bg-white p-4">
            <div className="text-sm font-semibold text-gray-800 mb-2">Sponsored</div>
            <div className="grid gap-3">
              <a href="#" className="block rounded-xl bg-gradient-to-br from-amber-100 to-orange-50 p-4 border border-amber-200">
                Upgrade your vibe — get featured for 5x more matches!
              </a>
              <a href="#" className="block rounded-xl bg-gradient-to-br from-cyan-100 to-sky-50 p-4 border border-cyan-200">
                New in town? Boost to the top of nearby people.
              </a>
            </div>
          </div>
        </aside>
      </main>

      <footer className="border-t bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-gray-500 flex flex-wrap items-center justify-between gap-3">
          <div>Premium: Girls Free • Boys ₹49/month</div>
          <div>Girls earn 10% from each subscribed match</div>
          <div>Location helps surface nearby profiles</div>
        </div>
      </footer>
    </div>
  )
}
