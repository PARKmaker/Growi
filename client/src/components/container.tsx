import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
};
export default function Container({ children }: ContainerProps) {
  return (
    <div className="container relative">
      <div className={'my-8'}>{children}</div>
    </div>
  );
}
