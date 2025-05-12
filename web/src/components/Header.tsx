
import { Phone } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4 md:p-6 border-b bg-background shadow-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Phone className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">{t("common.title")}</h1>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
