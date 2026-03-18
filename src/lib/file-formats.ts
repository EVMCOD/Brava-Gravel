export type SupportedRouteFormat = "gpx" | "tcx" | "fit";

export const supportedImportFormats: SupportedRouteFormat[] = ["gpx", "tcx", "fit"];
export const supportedExportFormats: SupportedRouteFormat[] = ["gpx", "tcx"];

export function detectRouteFormat(fileName: string): SupportedRouteFormat | null {
  const lower = fileName.toLowerCase();

  if (lower.endsWith(".gpx")) {
    return "gpx";
  }

  if (lower.endsWith(".tcx")) {
    return "tcx";
  }

  if (lower.endsWith(".fit")) {
    return "fit";
  }

  return null;
}
