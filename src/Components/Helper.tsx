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
  { name: "Florianópolis", property: "florianopolis" },
  { name: "Palhoça", property: "palhoca" },
  { name: "Sao José", property: "sao jose" },
  { name: "Tubarão", property: "tubarao" },
  { name: "Criciúma", property: "criciuma" },
  { name: "Araranguá", property: "ararangua" },
  { name: "Biguaçu", property: "biguacu" },
  { name: "Itajaí", property: "itajai" },
  { name: "Balneário Camboriú", property: "balneario camboriu" },
  { name: "Joinville", property: "joinville" },
  { name: "Jaraguá do Sul", property: "jaragua do sul" },
  { name: "Blumenau", property: "blumenau" },
  { name: "Brusque", property: "brusque" },
  { name: "Mafra", property: "mafra" },
  { name: "Rio do Sul", property: "rio do sul" },
  { name: "Lages", property: "lages" },
  { name: "Curitibanos", property: "curitibanos" },
  { name: "Caçador", property: "cacador" },
  { name: "Campos Novos", property: "campos novos" },
  { name: "Joaçaba", property: "joacaba" },
  { name: "Concordia", property: "concordia" },
  { name: "Xanxerê", property: "xanxere" },
  { name: "São Lourenço do Oeste", property: "sao lourenco do oeste" },
  { name: "Chapecó", property: "chapeco" },
  { name: "Maravilha", property: "maravilha" },
  { name: "São Miguel do Oeste", property: "sao miguel do oeste" },
];

export const seniorities = ["Dont know the correct name", "of it", "OMG"];
