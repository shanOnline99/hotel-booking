import React from 'react';
import { Check } from 'lucide-react';

interface BookingStepperProps {
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export const BookingStepper: React.FC<BookingStepperProps> = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, title: 'select rate & dates' },
    { number: 2, title: 'guest details' },
    { number: 3, title: 'review reservation' },
    { number: 4, title: 'confirmation' },
  ];

  return (
    <div className="w-full bg-white rounded-xl border border-[#e8e4de] p-4 sm:p-6 mb-8">
      <div className="flex items-center justify-between relative">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 left-6 right-6 -translate-y-1/2 h-0.5 bg-[#e8e4de] -z-0 hidden sm:block" />

        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isClickable = step.number < currentStep;

          return (
            <div
              key={step.number}
              onClick={() => isClickable && onStepClick && onStepClick(step.number)}
              className={`relative z-10 flex flex-col items-center gap-2 group ${
                isClickable ? 'cursor-pointer' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#1f2d27] text-white shadow-xs'
                    : isCurrent
                    ? 'bg-[#b87352] text-white ring-4 ring-[#b87352]/20 shadow-xs'
                    : 'bg-[#faf8f5] text-[#64748b] border border-[#e8e4de]'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
              </div>
              <span
                className={`text-xs text-center max-w-[90px] sm:max-w-none font-medium transition-colors ${
                  isCurrent
                    ? 'text-[#b87352] font-semibold'
                    : isCompleted
                    ? 'text-[#1f2d27]'
                    : 'text-[#64748b]'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
