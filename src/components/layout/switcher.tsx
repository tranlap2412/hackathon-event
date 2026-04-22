"use client";

import {
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { msg } from "@lingui/core/macro";
import { useLingui } from "@lingui/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type LOCALES = "en" | "vi";

const languages = {
  en: msg`English`,
  vi: msg`Vietnamese`,
} as const;

export function Switcher() {
  const router = useRouter();
  const { i18n } = useLingui();
  const pathname = usePathname();

  const [locale, setLocale] = useState<LOCALES>(
    pathname?.split("/")[1] as LOCALES
  );

  function handleSelect(newLocale: LOCALES) {
    const pathNameWithoutLocale = pathname?.split("/")?.slice(2) ?? [];
    const newPath = `/${newLocale}/${pathNameWithoutLocale.join("/")}`;

    setLocale(newLocale);
    router.push(newPath);
  }

  return (
    <MenuRoot>
      <MenuTrigger className="!text-xs sm:px-6 2xl:px-8">
        <div className="flex items-center gap-1 !text-nowrap">
          {i18n._(languages[locale])}
        </div>
      </MenuTrigger>

      <MenuPositioner>
        <MenuContent className=" z-[1000]">
          {(Object.keys(languages) as LOCALES[]).map((lng) => (
            <MenuItem
              key={lng}
              value={lng} // ✅ bắt buộc
              onClick={() => handleSelect(lng)}
              className={`flex items-center gap-2  ${
                locale === lng ? "text-primary font-semibold" : ""
              }`}
            >
              {i18n._(languages[lng])}
            </MenuItem>
          ))}
        </MenuContent>
      </MenuPositioner>
    </MenuRoot>
  );
}
