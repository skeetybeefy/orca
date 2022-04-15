import { MultiValue } from "chakra-react-select";
import { useCallback, useMemo } from "react";
import IOption from "types/interfaces/Option";

const useMultiselectState = <T extends IOption>(
  dataCollection: T[],
  stateValues: T["value"][],
  handleChange: (fieldname: string, newOptions: T["value"][]) => void,
  fieldname: string
) => {
  const selectedValues = useMemo(() => {
    return stateValues.map((stateValue) => {
      return dataCollection.find((dataItem) => dataItem.value === stateValue);
    });
  }, [dataCollection, stateValues]);

  const onChange = useCallback(
    (newValues: MultiValue<T>) => {
      const mappedNewValues = newValues.map(({ value }) => value);
      handleChange(fieldname, mappedNewValues);
    },
    [handleChange, fieldname]
  );

  return [selectedValues, onChange] as const;
};

export default useMultiselectState;
