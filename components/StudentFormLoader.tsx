"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";

const STUDENT_FORM_SCRIPT_ID = "student-form-loader";
const STUDENT_FORM_SCRIPT_URL = "https://ntechzy.in/api/v1/student-form/form.js";
const DEFAULT_FORM_CONTAINER_ID = "formsID7375";
const DEFAULT_PATHS = ["/", "/dynamicForm/index.html", "/apply-now", "/e-books/form", "/contact"];
const DEFAULT_COURSES = ["Select Course", "BAMS", "BHMS", "BUMS", "MBBS", "BDS"];

type StudentFormLoaderProps = {
  formContainerId?: string;
  scriptUrl?: string;
  paths?: string[];
  courses?: string[];
  styles?: string;
  logo?: string;
  contact?: string;
  onLoad?: () => void;
  onError?: () => void;
};

export function StudentFormLoader({
  formContainerId = DEFAULT_FORM_CONTAINER_ID,
  scriptUrl = STUDENT_FORM_SCRIPT_URL,
  paths = DEFAULT_PATHS,
  courses = DEFAULT_COURSES,
  styles = "basic",
  logo = `${siteConfig.url}/logo.png`,
  contact = "+91-9198350985",
  onLoad,
  onError,
}: StudentFormLoaderProps) {
  const onLoadRef = useRef(onLoad);
  const onErrorRef = useRef(onError);

  useEffect(() => {
    onLoadRef.current = onLoad;
    onErrorRef.current = onError;
  }, [onError, onLoad]);

  useEffect(() => {
    const container = document.getElementById(formContainerId);
    const previousScript = document.getElementById(STUDENT_FORM_SCRIPT_ID);

    previousScript?.remove();

    if (!container) {
      onErrorRef.current?.();
      return;
    }

    container.replaceChildren();

    const script = document.createElement("script");
    script.id = STUDENT_FORM_SCRIPT_ID;
    script.type = "module";
    script.src = scriptUrl;
    script.dataset.path = JSON.stringify(paths);
    script.dataset.divid = formContainerId;
    script.dataset.courses = JSON.stringify(courses);
    script.dataset.styles = styles;
    script.dataset.logo = logo;
    script.dataset.contact = contact;
    script.addEventListener("load", () => onLoadRef.current?.());
    script.addEventListener("error", () => onErrorRef.current?.());

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [
    contact,
    courses,
    formContainerId,
    logo,
    paths,
    scriptUrl,
    styles,
  ]);

  return null;
}
