"use client";

import { ChevronDown } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import type { PropsWithChildren, ReactNode } from "react";

type DisclosureProps = PropsWithChildren<{
  title: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}>;

export function Disclosure({ title, defaultOpen, className, children }: DisclosureProps) {
  return (
    <details open={defaultOpen} className={cx("group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800", className)}>
      <summary className="list-none cursor-pointer select-none px-4 py-3 flex items-center justify-between text-sm font-medium text-gray-900 dark:text-white">
        <span>{title}</span>
        <ChevronDown className="size-4 text-gray-500 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-4 pb-4 pt-2 text-gray-600 dark:text-gray-300">{children}</div>
    </details>
  );
}
