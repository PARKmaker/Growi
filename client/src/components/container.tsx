import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
};
export default function Container({ children }: ContainerProps) {
  return (
    <div className="container relative mx-auto my-4 min-w-[320px] px-4 md:my-8">{children}</div>
  );
}
