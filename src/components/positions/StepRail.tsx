import { Check } from "lucide-react";

export type Step = {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
};

const StepRail = ({
  steps,
  activeIndex,
  onStepClick,
  furthestVisited,
}: {
  steps: Step[];
  activeIndex: number;
  onStepClick: (index: number) => void;
  furthestVisited: number;
}) => (
  <>
    {/* Mobile: compact horizontal progress */}
    <div className="lg:hidden mb-5">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-semibold text-gray-900">
          {steps[activeIndex].title}
        </p>
        <p className="text-xs text-gray-500">
          Step {activeIndex + 1} of {steps.length}
        </p>
      </div>
      <div className="flex gap-1.5">
        {steps.map((step, index) => (
          <span
            key={step.id}
            className={`h-1.5 flex-1 rounded-full ${
              index <= activeIndex ? "bg-emerald-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>

    {/* Desktop: vertical rail */}
    <nav className="hidden lg:block w-64 shrink-0">
      <div className="bg-white rounded-xl border border-gray-100 p-2 sticky top-0">
        {steps.map((step, index) => {
          const active = index === activeIndex;
          const done = index < furthestVisited;
          const reachable = index <= furthestVisited;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative">
              {index < steps.length - 1 && (
                <span
                  className={`absolute left-[26px] top-[42px] bottom-1 w-px ${
                    done ? "bg-emerald-200" : "bg-gray-200"
                  }`}
                />
              )}
              <button
                type="button"
                disabled={!reachable}
                onClick={() => reachable && onStepClick(index)}
                className={`relative w-full text-left flex gap-3 p-3 rounded-lg transition ${
                  active
                    ? "bg-gradient-to-r from-emerald-50 to-emerald-50/20"
                    : reachable
                    ? "hover:bg-gray-50"
                    : "opacity-50 cursor-not-allowed"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full grid place-items-center shrink-0 border ${
                    active
                      ? "bg-emerald-600 border-emerald-600 text-white"
                      : done
                      ? "bg-emerald-50 border-emerald-200 text-emerald-600"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  {done && !active ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-medium uppercase tracking-wide text-gray-400">
                    Step {index + 1}
                  </span>
                  <span
                    className={`block text-sm font-semibold ${
                      active ? "text-gray-900" : "text-gray-600"
                    }`}
                  >
                    {step.title}
                  </span>
                  {active && (
                    <span className="block mt-1 text-xs leading-relaxed text-gray-500">
                      {step.description}
                    </span>
                  )}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  </>
);

export default StepRail;