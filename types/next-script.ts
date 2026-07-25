import "next/script";

declare module "next/script" {
  interface ScriptProps {
    path?: string;
    divid?: string;
    courses?: string;
    styles?: string;
    logo?: string;
    contact?: string;
  }
}

