import { useId } from 'react';

type Props = {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  error?: string | null;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  // allow string like 'any' which is valid for the native input step attribute
  step?: number | string;
  id?: string;
};

export default function NumberInput({
  label,
  value,
  onChange,
  error,
  prefix,
  suffix,
  min,
  max,
  step = 'any',
  id,
}: Props) {
  const uid = useId();
  const inputId = id || `${uid}-num`;

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {prefix && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            {prefix}
          </div>
        )}
        <input
          id={inputId}
          name={inputId}
          type="number"
          inputMode="decimal"
          value={value as any}
          onChange={(e) => onChange(e.target.value)}
          min={min}
          max={max}
          step={step as any}
          className={
            "block w-full pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-900 placeholder-gray-400 " +
            (prefix ? 'pl-10' : '') +
            (suffix ? ' pr-10' : '')
          }
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
            {suffix}
          </div>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
