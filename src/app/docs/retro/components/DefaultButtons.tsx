"use client";
import React from "react";
import Button from "../retro";

export default function DefaultButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Button variant="default" size="lg">
        Large Button
      </Button>
      <Button variant="default" size="md">
        Medium Button
      </Button>
      <Button variant="default" size="sm">
        Small Button
      </Button>
      <Button variant="default" size="md" disabled>
        Disabled
      </Button>
    </div>
  );
}
