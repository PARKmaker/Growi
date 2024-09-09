import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
};
export default function Container({ children }: ContainerProps) {
  return <div className="relative my-4 px-4 md:container md:my-8">{children}</div>;
}
