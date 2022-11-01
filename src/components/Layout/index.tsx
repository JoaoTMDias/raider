interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props): JSX.Element {
  return <div className="raider">{children}</div>;
}

export default Layout;
