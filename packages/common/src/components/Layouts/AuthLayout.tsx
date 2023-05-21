import React from "react";
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
    <main className="bg-gray-50 c h-full">
      <Card className="max-w-md ">
        <h2>{heading}</h2>
        <p>{subheading}</p>
        {children}
      </Card>
    </main>
  );
};
