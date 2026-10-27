export interface NoteProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const Note: React.FC<NoteProps> = ({ title, description, icon: Icon }) => {
  return (
    <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3">
      {Icon && <Icon className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />}
      <div className="space-y-1">
        <span className="block font-mono-code text-[10px] font-semibold uppercase tracking-wider text-amber-500">
          {title}
        </span>
        <p className="font-mono-code text-xs leading-relaxed text-[var(--color-secondary)]">
          {description}
        </p>
      </div>
    </div>
  );
};