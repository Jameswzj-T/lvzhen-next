"use client";
import type { MouseEvent } from "react";
import { modelSettingsHref } from "@/learning/navigation";

export function ModelSettingsLink() {
  function carrySource(event: MouseEvent<HTMLAnchorElement>) {
    const { pathname, search, hash } = window.location;
    event.currentTarget.href = modelSettingsHref(`${pathname}${search}${hash}`);
  }
  return (
    <a href="/settings/model" onClick={carrySource} onAuxClick={carrySource}>
      模型设置
    </a>
  );
}
