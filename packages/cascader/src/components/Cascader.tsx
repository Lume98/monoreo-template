import React, { useState } from "react";

export interface CascaderOption {
  label: string;
  value: string | number;
  children?: CascaderOption[];
}

export interface CascaderProps {
  options: CascaderOption[];
  value?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Cascader: React.FC<CascaderProps> = ({
  options,
  value = [],
  onChange,
  placeholder = "请选择",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: CascaderOption, level: number) => {
    if (disabled) return;

    const newValue = [...value.slice(0, level), option.value];
    onChange?.(newValue);

    if (!option.children || option.children.length === 0) {
      setIsOpen(false);
    }
  };

  const getDisplayText = () => {
    if (value.length === 0) return placeholder;

    let currentOptions = options;
    const labels: string[] = [];

    for (const val of value) {
      const option = currentOptions.find((opt) => opt.value === val);
      if (!option) break;
      labels.push(option.label);
      currentOptions = option.children || [];
    }

    return labels.join(" / ");
  };

  const getCurrentOptions = (level: number): CascaderOption[] => {
    let currentOptions = options;
    for (let i = 0; i < level; i++) {
      const selectedOption = currentOptions.find(
        (opt) => opt.value === value[i]
      );
      if (selectedOption?.children) {
        currentOptions = selectedOption.children;
      } else {
        return [];
      }
    }
    return currentOptions;
  };

  const renderMenu = (level: number = 0) => {
    const currentOptions = getCurrentOptions(level);
    if (currentOptions.length === 0) return null;

    const currentValue = value[level];
    const selectedOption = currentOptions.find(
      (opt) => opt.value === currentValue
    );

    return (
      <div
        key={level}
        style={{
          minWidth: "150px",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          backgroundColor: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          marginLeft: level > 0 ? "4px" : "0",
        }}
      >
        {currentOptions.map((option) => (
          <div
            key={option.value}
            onClick={() => handleSelect(option, level)}
            style={{
              padding: "8px 12px",
              cursor: disabled ? "not-allowed" : "pointer",
              backgroundColor:
                currentValue === option.value ? "#e6f7ff" : "transparent",
              color: disabled ? "#bfbfbf" : "#000",
            }}
            onMouseEnter={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor = "#f5f5f5";
              }
            }}
            onMouseLeave={(e) => {
              if (!disabled) {
                e.currentTarget.style.backgroundColor =
                  currentValue === option.value ? "#e6f7ff" : "transparent";
              }
            }}
          >
            {option.label}
            {option.children && option.children.length > 0 && (
              <span style={{ float: "right", color: "#999" }}>›</span>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderMenus = () => {
    const menus = [];
    for (let level = 0; level <= value.length; level++) {
      const menu = renderMenu(level);
      if (menu) {
        menus.push(menu);
      } else {
        break;
      }
    }
    return menus;
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{
          padding: "4px 11px",
          border: "1px solid #d9d9d9",
          borderRadius: "4px",
          cursor: disabled ? "not-allowed" : "pointer",
          backgroundColor: disabled ? "#f5f5f5" : "#fff",
          color: disabled ? "#bfbfbf" : "#000",
          minWidth: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{getDisplayText()}</span>
        <span style={{ color: "#999" }}>▼</span>
      </div>
      {isOpen && !disabled && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: "4px",
            display: "flex",
            zIndex: 1000,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {renderMenus()}
        </div>
      )}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

