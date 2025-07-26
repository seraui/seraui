"use client";
import React from "react";
import Button from "../retro";

export default function SecondaryButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Button variant="secondary" size="lg">
        Large Secondary
      </Button>
      <Button variant="secondary" size="md">
        Medium Secondary
      </Button>
      <Button variant="secondary" size="sm">
        Small Secondary
      </Button>
      <Button variant="secondary" size="md" disabled>
        Disabled
      </Button>
    </div>
  );
}
