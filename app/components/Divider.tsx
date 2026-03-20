export default function Divider() {
  return (
    <div className="flex items-center gap-5 px-8 md:px-[60px] my-20">
      <div className="flex-1 h-px bg-[#C4A882]" style={{ opacity: 0.3 }} />
      <span
        className="font-[family-name:var(--font-cormorant)] text-[18px] text-[#C4A882]"
        style={{ opacity: 0.7 }}
      >
        ✦
      </span>
      <div className="flex-1 h-px bg-[#C4A882]" style={{ opacity: 0.3 }} />
    </div>
  );
}
