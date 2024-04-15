export function handleKeyPress(
  event: any,
  handleSubmit: any,
  key: string,
  different?: string | string[]
) {
  const differentArray = Array.isArray(different) ? different : [different];

  if (event.key === key && !differentArray.includes(event.target.name)) {
    handleSubmit();
  }
}

export function neverNull(value: string) {
  return value ? value : "-";
}

export const publicDefenses = [
  "Florianópolis",
  "Lages",
  "Palhoça",
  "Biguaçu",
  "Balneário Camboriu",
];

export const seniorities = ["Dont know the correct name", "of it", "OMG"];
