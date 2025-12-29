'use client';

import { useState, PropsWithChildren, CSSProperties } from 'react';
import { Button } from '@/components/base/buttons/button';

type ExpandableListProps = PropsWithChildren<{
  maxItems?: number;
  items: React.ReactNode[];
  className?: string;
  initiallyExpanded?: boolean;
  moreLabel?: string;
  lessLabel?: string;
}>;

export function ExpandableList({
  items,
  maxItems = 3,
  className,
  initiallyExpanded = false,
  moreLabel = 'Show more',
  lessLabel = 'Show less',
}: ExpandableListProps) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const visible = expanded ? items : items.slice(0, maxItems);
  const canToggle = items.length > maxItems;
  const maskedStyle: CSSProperties | undefined = !expanded
    ? {
        WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
      }
    : undefined;

  return (
    <div className={className}>
      <ul className="space-y-2" style={maskedStyle}>
        {visible.map((it, idx) => (
          <li key={idx}>{it}</li>
        ))}
      </ul>
      {canToggle && (
        <div className="mt-3">
          <Button size="sm" color="secondary" onClick={() => setExpanded((e) => !e)}>
            {expanded ? lessLabel : moreLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
