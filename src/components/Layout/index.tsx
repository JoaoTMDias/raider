import { OnlineStatusProvider } from "@/hooks/useOnlineStatus";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props): JSX.Element {
  return (
    <OnlineStatusProvider>
      <div className="raider">{children}</div>
    </OnlineStatusProvider>
  );
}

export default Layout;
