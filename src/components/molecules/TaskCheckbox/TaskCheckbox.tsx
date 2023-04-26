import { Checkbox } from '@mantine/core';
import { Task } from '../../../types/Task';

type Props = Task;

export const TaskCheckbox = (props: Props) => {
  const { title, isCompleted } = props;
  return (
    <div className="TaskCheckbox">
      <Checkbox label={title} checked={isCompleted} />
    </div>
  );
};
