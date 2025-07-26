"use client";
import React from "react";
import Button from "../retro";

export default function LinkButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      <Button variant="link">Primary Link</Button>
      <Button variant="link" disabled>
        Disabled Link
      </Button>
    </div>
  );
}
