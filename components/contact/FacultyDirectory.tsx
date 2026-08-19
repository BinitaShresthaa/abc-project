"use client";

import { useState } from "react";
import type { FacultyMember } from "@/lib/types";
import FacultyCard from "./FacultyCard";
import FacultyModal from "./FacultyModal";
import Reveal from "@/components/ui/Reveal";

function sortByFaculty(members: FacultyMember[]) {
  return [...members].sort((a, b) =>
    a.department.localeCompare(b.department, undefined, { sensitivity: "base" })
  );
}

export default function FacultyDirectory({
  bachelorFaculty,
  masterFaculty,
}: {
  bachelorFaculty: FacultyMember[];
  masterFaculty: FacultyMember[];
}) {
  const [selected, setSelected] = useState<FacultyMember | null>(null);

  const sortedBachelor = sortByFaculty(bachelorFaculty);
  const sortedMaster = sortByFaculty(masterFaculty);

  return (
    <>
      <Reveal className="mb-4 flex flex-wrap items-baseline justify-between gap-3" y={12}>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            BACHELOR&rsquo;S LEVEL
          </span>
          <h3 className="text-lg font-bold text-primary sm:text-xl">Undergraduate Faculty</h3>
        </div>
        <span className="text-sm text-slate-500">{sortedBachelor.length} departments</span>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedBachelor.map((member, i) => (
          <Reveal key={member.id} delay={(i % 3) * 90} y={20}>
            <FacultyCard member={member} onClick={setSelected} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mb-4 mt-14 flex flex-wrap items-baseline justify-between gap-3" y={12}>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
            MASTER&rsquo;S LEVEL
          </span>
          <h3 className="text-lg font-bold text-primary sm:text-xl">Graduate Faculty</h3>
        </div>
        <span className="text-sm text-slate-500">{sortedMaster.length} departments</span>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedMaster.map((member, i) => (
          <Reveal key={member.id} delay={(i % 3) * 90} y={20}>
            <FacultyCard member={member} onClick={setSelected} />
          </Reveal>
        ))}
      </div>

      <FacultyModal member={selected} onClose={() => setSelected(null)} />
    </>
  );
}