import React from "react"
import { forwardRef, useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
 
 
const Dropdown = forwardRef(
  ({ label, options, className = "", error, onChange, defaultValue, ...rest }, ref) => {
 
 
    useEffect(() => {
      const defaultOpt = options.find((opt) => opt.value === defaultValue);
      if (defaultOpt) setSelected(defaultOpt);
    }, [defaultValue, options]);
 
 
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(options[0]);
 
    const containerRef = useRef(null);
 
    // Update selected option when defaultValue changes
    useEffect(() => {
      if (defaultValue) {
        const option = options.find((opt) => opt.value === defaultValue);
        if (option) {
          setSelected(option);
        }
      }
    }, [defaultValue, options]);
 
    const toggleDropdown = () => setIsOpen((prev) => !prev);
 
    const handleOptionSelect = (
      e,
      opt
    ) => {
      e.stopPropagation();
      setSelected(opt);
      setIsOpen(false);
 
      if (onChange) {
        onChange({
          target: {
            name: rest.name,
            value: opt.value,
          },
        } );
      }
    };
 
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target )
        ) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);
 
    return (
      <div>
        <div
          ref={(el) => {
            containerRef.current = el;
            if (typeof ref === "function") ref(el);
            else if (ref) ref.current = el;
          }}
          className={`border border-neutral-400 rounded-lg px-3 pt-2 pb-2 w-full relative ${className} ${error
              ? "ring-1 ring-semantic-red border-semantic-red"
              : "focus-within:ring-1 focus-within:ring-black"
            }`}
          tabIndex={0}
          onClick={toggleDropdown}
        >
          <label className="absolute top-[-10px] left-3 bg-primary-white px-1 text-xs text-gray-600">
            {label}
          </label>
          <div className="flex items-center p-1 justify-between text-gray-900 bg-transparent w-full">
            <span>{selected.label}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </div>
          {isOpen && (
            <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow z-10 max-h-60 overflow-y-auto">
              {options.map((opt) => (
                <li
                  key={opt.value}
                  className="px-3 py-2 hover:bg-green-100 cursor-pointer text-gray-900"
                  onClick={(e) => handleOptionSelect(e, opt)}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>
        <input type="hidden" name={rest.name} value={selected.value} />
        {error && (
          <p className="error-text mt-0.5 text-sm text-semantic-red">{error}</p>
        )}
      </div>
    );
  }
);
 
export default Dropdown;