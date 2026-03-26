export default function SectionDivider() {
  return (
    <div className="w-full flex items-center justify-center py-20 opacity-80">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[var(--gold)]/40" />
      <div className="mx-8 text-[var(--gold)] flex items-center justify-center w-12 h-12">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="miter"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </div>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[var(--gold)]/40" />
    </div>
  );
}
