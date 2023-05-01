import { Checkbox } from '@mantine/core';
import { Task } from '../../../types/Task';
import { markCompletedAsync } from '../../../app/state/taskSlice';
import { useAppDispatch } from '../../../app/hooks';

type Props = Task;

export const TaskCheckbox = (props: Props) => {
  const { id, label, done } = props;
  const dispatch = useAppDispatch();
  return (
    <div className="TaskCheckbox">
      <Checkbox
        label={label}
        checked={done}
        onClick={() => dispatch(markCompletedAsync({ id, done: !done }))}
        styles={{ label: { cursor: 'pointer' }, input: { cursor: 'pointer' } }}
      />
    </div>
  );
};
