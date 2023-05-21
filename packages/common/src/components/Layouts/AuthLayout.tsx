import React from "react";
import { LogoIcon } from "../../icons";
import { Card } from "../../ui/Card";

interface AuthLayoutProps extends React.PropsWithChildren {
  heading: string;
  subheading?: string;
  showDisclaimer?: boolean;
  logoLinkToMarketingSite?: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  heading,
  subheading,
  children,
}) => {
  return (
    <main className="bg-gray-200 c h-full relative">
      <LogoIcon
        size={28}
        className="absolute top-10 md:left-10 text-indigo-600"
      />
      <Card className="p-6 md:!p-8">
        <h2>{heading}</h2>
        <p className="mb-4">{subheading}</p>
        {children}
      </Card>
    </main>
  );
};
