"use client";

import React, { useState, useEffect } from "react";
import Progress from "./progress";
import Button from "../button/button";

export default function ProgressView() {
    const [value, setValue] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setValue((v) => (v >= 100 ? 0 : v + 10));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col gap-8 w-full max-w-md mx-auto p-8">
            <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Default</p>
                <Progress value={value} />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Gradient</p>
                <Progress value={value} variant="gradient" size="lg" showValue />
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Sizes</p>
                <div className="space-y-4">
                    <Progress value={60} size="sm" />
                    <Progress value={60} size="md" />
                    <Progress value={60} size="lg" />
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Variants</p>
                <div className="space-y-4">
                    <Progress value={45} variant="success" />
                    <Progress value={75} variant="warning" />
                    <Progress value={90} variant="error" />
                </div>
            </div>

            <div className="flex gap-4 items-center justify-center pt-4">
                <Button size="sm" onClick={() => setValue(Math.max(0, value - 10))}>
                    Decrease
                </Button>
                <Button size="sm" onClick={() => setValue(Math.min(100, value + 10))}>
                    Increase
                </Button>
            </div>
        </div>
    );
}
