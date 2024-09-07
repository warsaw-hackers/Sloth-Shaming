export const truncateAddress = (address: string) => {
  if (address && address.length <= 6) return address; // No need to truncate if the address is too short

  const prefix = address.slice(0, 4); // Typically "0x"
  const suffix = address.slice(-4); // The last 4 characters

  return `${prefix}...${suffix}`;
};

export function removeSpaces(str: string): string {
  console.log("animal name", str);

  return str.replace(/\s+/g, "");
}
