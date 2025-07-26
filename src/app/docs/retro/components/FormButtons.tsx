"use client";
import React from "react";
import Button from "../retro";

export default function FormButtons() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      <Button variant="default" size="md" type="submit">
        Submit Form
      </Button>
      <Button variant="secondary" size="md" type="button">
        Cancel
      </Button>
      <Button variant="outline" size="md" type="reset">
        Reset Form
      </Button>
    </div>
  );
}
