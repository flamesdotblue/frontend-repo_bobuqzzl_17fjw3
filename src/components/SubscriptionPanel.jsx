import { Crown, Check, Coins } from 'lucide-react'

export default function SubscriptionPanel({ userGender }) {
  const isGirl = userGender === 'female'

  return (
    <div className="w-full rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-fuchsia-50 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white shadow"><Crown /></div>
          <div>
            <div className="text-lg font-semibold text-purple-800">Premium</div>
            <div className="text-sm text-purple-700/80">Unlimited likes, super likes, boost & more</div>
          </div>
        </div>
        <div className="text-right">
          {isGirl ? (
            <>
              <div className="text-2xl font-bold text-fuchsia-700">Free</div>
              <div className="text-xs text-fuchsia-600">For girls, always</div>
            </>
          ) : (
            <>
              <div className="text-2xl font-bold text-purple-800">₹49</div>
              <div className="text-xs text-purple-700/80">Per month</div>
            </>
          )}
        </div>
      </div>

      <ul className="mt-4 grid gap-2 text-sm text-purple-900/90">
        {['Unlimited likes', '2x daily Super Likes', 'Profile Boost weekly', 'Ad-light experience'].map((t) => (
          <li key={t} className="flex items-center gap-2"><Check size={16} className="text-purple-600" />{t}</li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <button
          className={`rounded-lg px-4 py-2 text-sm font-semibold shadow-sm border transition ${
            isGirl
              ? 'bg-white text-fuchsia-700 border-fuchsia-200 hover:bg-fuchsia-50'
              : 'bg-purple-600 text-white border-purple-700 hover:bg-purple-700'
          }`}
        >
          {isGirl ? 'Included for Girls' : 'Get Premium for ₹49'}
        </button>
        {isGirl && (
          <div className="flex items-center gap-2 text-xs text-fuchsia-700">
            <Coins size={16} /> Earn 10% from each subscribed match
          </div>
        )}
      </div>
    </div>
  )
}
