import React from "react";

type Props = {
  checked: boolean;
  onChange: (e: any) => void;
  label: string;
};

export const CheckBox = (props: Props) => {
  const { checked, onChange, label } = props;

  return (
    <div className="checkBox">
      <label htmlFor={label}>{label}</label>
      <input
        type="checkbox"
        name={label}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};
