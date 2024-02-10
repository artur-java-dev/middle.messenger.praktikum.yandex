export function getFilenameAndExtension(path: string): [string, string] {

  const fname = path.replace(/^.*[\\\/]/, "");
  const dotIdx = fname.lastIndexOf(".");
  const filename = fname.substring(0, dotIdx);
  const ext = fname.substring(dotIdx + 1);
  // const ext = fname.split(".").pop()!;

  return [filename, ext];
}
