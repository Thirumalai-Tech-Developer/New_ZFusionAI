import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "wouter";

export type LogoFieldType = "neutral" | "fullstack" | "whatsapp" | "agentic";

interface ThemeFieldContextValue {
  field: LogoFieldType;
  setField: (field: LogoFieldType) => void;
  accentColor: string;
  fieldTitle: string;
}

const ThemeFieldContext = createContext<ThemeFieldContextValue>({
  field: "neutral",
  setField: () => {},
  accentColor: "#25D366",
  fieldTitle: "Enterprise Engineering",
});

export const ThemeFieldProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location] = useLocation();
  const [field, setField] = useState<LogoFieldType>("neutral");

  useEffect(() => {
    if (
      location.includes("whatsapp") ||
      location.includes("chat") ||
      location.includes("api") && !location.includes("agent")
    ) {
      setField("whatsapp");
    } else if (
      location.includes("agent") ||
      location.includes("ai") ||
      location.includes("neural")
    ) {
      setField("agentic");
    } else if (
      location.includes("full-stack") ||
      location.includes("web-development") ||
      location.includes("terminal") ||
      location.includes("website")
    ) {
      setField("fullstack");
    } else {
      setField("neutral");
    }
  }, [location]);

  // Set data attribute on document body/root for CSS scoping
  useEffect(() => {
    document.documentElement.setAttribute("data-field", field);
  }, [field]);

  const getAccentColor = (): string => {
    switch (field) {
      case "whatsapp":
        return "#25D366";
      case "agentic":
        return "#00F2FE";
      case "fullstack":
        return "#3B82F6";
      default:
        return "#25D366";
    }
  };

  const getFieldTitle = (): string => {
    switch (field) {
      case "whatsapp":
        return "WhatsApp Web API Architecture";
      case "agentic":
        return "Autonomous AI Agent Swarms";
      case "fullstack":
        return "Full Stack High-Frequency Web";
      default:
        return "ZFusionAI Digital Engine";
    }
  };

  return (
    <ThemeFieldContext.Provider
      value={{
        field,
        setField,
        accentColor: getAccentColor(),
        fieldTitle: getFieldTitle(),
      }}
    >
      {children}
    </ThemeFieldContext.Provider>
  );
};

export const useThemeField = () => useContext(ThemeFieldContext);
