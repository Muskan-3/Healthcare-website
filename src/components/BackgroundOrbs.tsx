// BackgroundOrbs — static gradients only, no infinite animations.
// Animations removed to prevent GPU drain on continuous repaints.
export const BackgroundOrbs = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Static blur orbs — no animation */}
      <span className="absolute left-[-7rem] top-8 h-96 w-96 rounded-full bg-[rgba(139,61,255,0.14)] blur-[140px]" />
      <span className="absolute right-[-6rem] top-12 h-80 w-80 rounded-full bg-[rgba(168,85,247,0.12)] blur-[132px]" />
      <span className="absolute left-[12%] top-[62%] h-72 w-72 rounded-full bg-[rgba(192,132,252,0.10)] blur-[120px]" />
      <span className="absolute right-[18%] top-[68%] h-48 w-48 rounded-full bg-[rgba(245,197,66,0.08)] blur-[86px]" />

      {/* Static accent dots */}
      <span className="absolute left-1/4 top-[18%] h-2 w-2 rounded-full bg-[#FFD86B] opacity-80 shadow-[0_0_10px_rgba(255,216,107,0.7)]" />
      <span className="absolute left-[62%] top-[24%] h-1.5 w-1.5 rounded-full bg-[#FFFFFF] opacity-70 shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
      <span className="absolute left-[12%] top-[42%] h-2 w-2 rounded-full bg-[#C084FC] opacity-65 shadow-[0_0_10px_rgba(192,132,252,0.7)]" />
      <span className="absolute right-[16%] top-[54%] h-1.5 w-1.5 rounded-full bg-[#FFD86B] opacity-75 shadow-[0_0_10px_rgba(255,216,107,0.68)]" />
      <span className="absolute right-[28%] top-[34%] h-1 w-1 rounded-full bg-[#FFFFFF] opacity-65 shadow-[0_0_8px_rgba(255,255,255,0.72)]" />

      {/* Static subtle light streaks */}
      <span className="absolute left-[10%] top-[10%] h-0.5 w-[40%] bg-gradient-to-r from-transparent via-[#8B3DFF]/30 to-transparent blur-sm rotate-[12deg]" />
      <span className="absolute right-[6%] top-[22%] h-0.5 w-[36%] bg-gradient-to-r from-transparent via-[#C084FC]/26 to-transparent blur-sm rotate-[-8deg]" />
    </div>
  );
};