import { SingleValue } from "chakra-react-select";
import { useCallback, useMemo } from "react";
import IOption from "types/interfaces/Option";

const useSelectState = <T extends IOption>(
  dataCollection: T[],
  stateValue: T["value"],
  handleChange: (fieldname: string, newOption: T["value"]) => void,
  fieldname: string
) => {
  const selectedValue = useMemo(() => {
    return dataCollection.find((dataItem) => dataItem.value === stateValue);
  }, [dataCollection, stateValue]);

  const onChange = useCallback(
    (newValue: SingleValue<T>) => {
      handleChange(fieldname, newValue.value);
    },
    [handleChange, fieldname]
  );

  return [selectedValue, onChange] as const;
};

export default useSelectState;
