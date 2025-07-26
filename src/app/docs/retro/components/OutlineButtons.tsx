"use client";
import React from "react";
import Button from "../retro";

export default function OutlineButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Button variant="outline" size="lg">
        Large Outline
      </Button>
      <Button variant="outline" size="md">
        Medium Outline
      </Button>
      <Button variant="outline" size="sm">
        Small Outline
      </Button>
      <Button variant="outline" size="md" disabled>
        Disabled
      </Button>
    </div>
  );
}
