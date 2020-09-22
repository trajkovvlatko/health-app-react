import React, {useCallback, useEffect, useRef} from 'react';

interface IProps {
  onChange: (rows: string[]) => void;
}

function Selector(props: IProps) {
  const refMeals = useRef<HTMLInputElement>(null);
  const refExersises = useRef<HTMLInputElement>(null);
  const refGlucoseLevels = useRef<HTMLInputElement>(null);
  const refWeights = useRef<HTMLInputElement>(null);

  const onChange = () => {
    const rows = [];
    if (refMeals.current?.checked) rows.push('meals');
    if (refExersises.current?.checked) rows.push('exercises');
    if (refGlucoseLevels.current?.checked) rows.push('glucoseLevels');
    if (refWeights.current?.checked) rows.push('weights');
    props.onChange(rows);
  };

  const onChangeMemo = useCallback(onChange, []);

  useEffect(() => {
    onChangeMemo();
  }, [onChangeMemo]);

  return (
    <div>
      <h3>Selector</h3>
      <div>
        <input
          type='checkbox'
          ref={refMeals}
          onChange={onChange}
          defaultChecked={true}
        />
        Meals
      </div>

      <div>
        <input
          type='checkbox'
          ref={refExersises}
          onChange={onChange}
          defaultChecked={true}
        />
        Exercises
      </div>

      <div>
        <input
          type='checkbox'
          ref={refGlucoseLevels}
          onChange={onChange}
          defaultChecked={true}
        />
        Glucose levels
      </div>

      <div>
        <input
          type='checkbox'
          ref={refWeights}
          onChange={onChange}
          defaultChecked={true}
        />
        Weights
      </div>
    </div>
  );
}

export default Selector;
