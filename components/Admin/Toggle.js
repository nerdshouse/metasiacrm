import { Switch } from "@headlessui/react";

const Toggle = ({ checked, onChange, label }) => {
  return (
    <Switch.Group>
      <Switch.Label>{label}</Switch.Label>
      <Switch
        checked={checked}
        onChange={onChange}
        className={`${
          checked ? "bg-primary-500" : "bg-gray-200"
        } relative inline-flex items-center h-6 rounded-full w-11 transition-all duration-300 ease-in-out`}
      >
        <span
          className={`${
            checked ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-all duration-300 ease-in-out`}
        />
      </Switch>
    </Switch.Group>
  );
};
export default Toggle;
