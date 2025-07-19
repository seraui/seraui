"use client"
import React, { useState } from "react";
import NumberTicker from "./ticker"

export default function Tickerview() {
    return (
        <NumberTicker
            value={100}
            duration={2500}
            className="text-9xl font-bold text-white transition-all"
            prefix="$"
            decimalPlaces={2}
        />
    )
}
