"use client";

import { organizationPageNav } from "@/constant/organization";
import { usePathname, useRouter } from "next/navigation";

function OrganizationLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <section>
      <div className="flex items-center justify-start gap-10 px-4 py-3 text-dovegray font-normal bg-white rounded-[10px] w-full">
        {organizationPageNav.map((nav, i) => (
          <button
            key={i}
            className={`text-sm capitalize ${
              pathname === nav.link && "text-primary font-medium"
            }`}
            onClick={() => router.push(`${nav.link}`)}
          >
            {nav.name}
          </button>
        ))}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default OrganizationLayout;
