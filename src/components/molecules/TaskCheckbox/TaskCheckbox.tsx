import { Checkbox } from '@mantine/core';
import { Task } from '../../../types/Task';

type Props = Task;

export const TaskCheckbox = (props: Props) => {
  const { label: title, done: isCompleted } = props;
  return (
    <div className="TaskCheckbox">
      <Checkbox label={title} checked={isCompleted} />
    </div>
  );
};
