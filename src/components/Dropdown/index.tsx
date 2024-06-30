import "./DropdownStyle.css";

export interface DropdownParameters {
  label: string;
  value: number;
  callbackText: string;
  object: any;
}

export interface DropdownParametersList extends Array<DropdownParameters> {}

export default function Dropdown({
  dpbKey,
  dropboxOptions,
  placeholder = "placeholder",
  placeholderValue,
  setter,
  disabled,
}) {
  var dropboxOptionElements = [];
  dropboxOptions.forEach((dropboxOption, index) => {
    dropboxOptionElements.push(
      <option value={dropboxOption.value} key={dpbKey + "_option" + index}>
        {dropboxOption.label}
      </option>
    );
  });

  return (
    <select
      className="dropbox"
      key={dpbKey}
      onChange={(e) => {
        setter(
          dropboxOptions[0].object
            ? dropboxOptions[e.target.value].object
            : e.target.value
        );
      }}
      disabled={disabled}
    >
      {/* OPTION de PLACEHOLDER */}
      <option
        value={placeholderValue ? placeholderValue : 0}
        key={dpbKey + "_option_placeholder"}
      >
        {placeholder}
      </option>
      {dropboxOptionElements}
    </select>
  );
}
