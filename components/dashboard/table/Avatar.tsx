"use client";

import { useState } from "react";
import Image from "next/image";

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

export default function Avatar({ name, photo, size = 36 }: { name: string; photo?: string; size?: number }) {
  const [error, setError] = useState(false);
  const showPhoto = photo && !error;

  return (
    <div
      className="relative shrink-0 overflow-hidden rounded-full bg-primary"
      style={{ width: size, height: size }}
    >
      {showPhoto ? (
        <Image src={photo} alt={name} fill className="object-cover" onError={() => setError(true)} />
      ) : (
        <span
          className="flex h-full w-full items-center justify-center font-semibold text-white"
          style={{ fontSize: size * 0.36 }}
        >
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}