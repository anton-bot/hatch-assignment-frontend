import './TaskListHeader.scss';
import { Text } from '@mantine/core';

type Props = {
  children: React.ReactNode;
};

export const TaskListHeader = (props: Props) => {
  const { children } = props;
  return (
    <div className="TaskListHeader">
      <Text size="lg" weight={600}>
        {children}
      </Text>
    </div>
  );
};
