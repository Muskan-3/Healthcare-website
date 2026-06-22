import { ChevronDown } from 'lucide-react';
import { KeyboardEvent, useEffect, useId, useMemo, useRef, useState } from 'react';

type Option = {
  label: string;
  value: string;
};

type FormSelectFieldProps = {
  id: string;
  label: string;
  value: string;
  options: Option[];
  placeholder: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  name?: string;
};

export const FormSelectField = ({
  id,
  label,
  value,
  options,
  placeholder,
  onChange,
  disabled = false,
  required = false,
  name,
}: FormSelectFieldProps) => {
  const reactId = useId();
  const buttonId = id ?? reactId;
  const listboxId = `${buttonId}-listbox`;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = useMemo(() => options.find((option) => option.value === value)?.label ?? '', [options, value]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const chooseOption = (nextValue: string) => {
    onChange(nextValue);
    setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setOpen(true);
      return;
    }
  };

  return (
    <div ref={containerRef} className="space-y-2">
      <label htmlFor={buttonId} className="block text-sm font-medium text-white/80">
        {label}
      </label>

      <div className="relative">
        <button
          id={buttonId}
          type="button"
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-expanded={open ? 'true' : 'false'}
          disabled={disabled}
          onClick={() => setOpen((current) => !current)}
          onKeyDown={onKeyDown}
          className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-left text-white outline-none transition focus:border-gold/50 focus:bg-black/30 disabled:cursor-not-allowed disabled:opacity-55"
        >
          <span className={value ? 'text-white' : 'text-white/45'}>{selectedLabel || placeholder}</span>
          <ChevronDown aria-hidden="true" className="ml-4 h-4 w-4 shrink-0 text-white/45" />
        </button>

        {open ? (
          <div
            id={listboxId}
            role="listbox"
            aria-label={label}
            className="absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-2xl border border-white/10 bg-[#160925] p-2 shadow-2xl shadow-black/60"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => chooseOption(option.value)}
                  className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm transition ${
                    isSelected ? 'bg-gold/15 text-white' : 'text-white/80 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : null}

        {required ? <input type="text" value={value} readOnly required tabIndex={-1} aria-hidden="true" className="sr-only" /> : null}
      </div>
    </div>
  );
};