"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  Button,
} from "./drawer";

type DrawerSide = "top" | "bottom" | "left" | "right";

export default function DrawerView() {
  const [isOpen, setIsOpen] = useState(false);
  const [side, setSide] = useState<DrawerSide>("right");

  const handleOpen = (selectedSide: DrawerSide) => {
    setSide(selectedSide);
    setIsOpen(true);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-4 font-sans">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50">
          Minimal Drawer
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          A minimal, reusable drawer component.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button onClick={() => handleOpen("top")}>Top</Button>
        <Button onClick={() => handleOpen("right")}>Right</Button>
        <Button onClick={() => handleOpen("bottom")}>Bottom</Button>
        <Button onClick={() => handleOpen("left")}>Left</Button>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen} side={side}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-6">
            <form className="grid gap-4">
              <div className="grid gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  defaultValue="John Doe"
                  className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-colors"
                />
              </div>
              <div className="grid gap-2">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <input
                  id="username"
                  defaultValue="@johndoe"
                  className="flex h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-colors"
                />
              </div>
            </form>
          </div>
          <DrawerFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Save changes</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
