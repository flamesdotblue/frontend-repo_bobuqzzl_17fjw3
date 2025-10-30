import { Coins } from 'lucide-react'

export default function EarningsPanel({ userGender, matchCount, subscribedMatches }) {
  const isGirl = userGender === 'female'
  const subCount = subscribedMatches
  const perSubCommission = 0.1 * 49 // 10% of ₹49
  const totalEarnings = subCount * perSubCommission

  return (
    <div className="w-full rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-white shadow"><Coins /></div>
        <div className="flex-1">
          <div className="text-lg font-semibold text-emerald-900">Earnings</div>
          <div className="text-sm text-emerald-700/80">10% from each subscribed match</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-emerald-700/80">Potential</div>
          <div className="text-xl font-bold text-emerald-900">₹{totalEarnings.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg border bg-white p-3">
          <div className="text-xs text-gray-500">Matches</div>
          <div className="text-lg font-semibold">{matchCount}</div>
        </div>
        <div className="rounded-lg border bg-white p-3">
          <div className="text-xs text-gray-500">Subscribed</div>
          <div className="text-lg font-semibold">{subCount}</div>
        </div>
        <div className="rounded-lg border bg-white p-3">
          <div className="text-xs text-gray-500">Commission</div>
          <div className="text-lg font-semibold">₹{perSubCommission.toFixed(2)}</div>
        </div>
      </div>

      {!isGirl && (
        <div className="mt-3 text-xs text-emerald-700/80">Earnings are available for girls accounts only.</div>
      )}
    </div>
  )
}
