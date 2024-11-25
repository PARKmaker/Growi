import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card.tsx';
import { FormLabel } from '@/components/ui/form.tsx';
import { Label } from '@/components/ui/label.tsx';

export type LabelContentProps = {
  children: string;
  hoverCardContent: string;
  hoverCardFooter?: string;
};

function LabelContent({ children, hoverCardContent, hoverCardFooter }: LabelContentProps) {
  return (
    <div className={'inline-flex items-center gap-1'}>
      <span>{children}</span>

      <HoverCard openDelay={50}>
        <HoverCardTrigger asChild tabIndex={-1}>
          <button type="button" className="inset-y-0 left-14 flex items-center pe-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={'hover:opacity-50'}
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex justify-between space-x-4">
            <div className="space-y-1">
              <p className="whitespace-pre-wrap text-sm">{hoverCardContent}</p>
              {hoverCardFooter && (
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">{hoverCardFooter}</span>
                </div>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}

type LabelWithInfoProps = LabelContentProps & {
  htmlFor: string;
};

export function LabelWithInfo({
  htmlFor,
  children,
  hoverCardContent,
  hoverCardFooter,
}: LabelWithInfoProps) {
  return (
    <Label htmlFor={htmlFor}>
      <LabelContent hoverCardContent={hoverCardContent} hoverCardFooter={hoverCardFooter}>
        {children}
      </LabelContent>
    </Label>
  );
}

type FormLabelWithInfoProps = LabelContentProps;

export function FormLabelWithInfo({
  children,
  hoverCardContent,
  hoverCardFooter,
}: FormLabelWithInfoProps) {
  return (
    <FormLabel>
      <LabelContent hoverCardContent={hoverCardContent} hoverCardFooter={hoverCardFooter}>
        {children}
      </LabelContent>
    </FormLabel>
  );
}
