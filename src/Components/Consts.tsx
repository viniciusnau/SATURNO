export const modalText = {
  sendVote: {
    title: "Voto prestes a ser registrado!",
    description: "Você tem certeza que deseja finalizar a votação?",
    button: "Sim",
  },
};

export const roles = {
  admin: "administrative",
  electoralCommision: "electoral commission",
  publicDefender: "public defender",
};

export const deadline = {
  initial: new Date("2024-05-14T08:00:00"),
  final: new Date("2024-05-14T17:00:59"),
  finalLogin: new Date("2024-05-14T03:50:00"),
};

export const snackbarConsts = {
  success: {
    title: "Requisição feita com sucesso!",
    description: "Requisição feita com sucesso!",
    color: "#9fc54d",
  },

  error: {
    title: "Erro ao efetuar a requisição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  countmaxError: {
    title: "Seleção de voto fora das diretrizes.",
    description:
      "Número de candidatos selecionados ultrapassa o limite permitido.",
    color: "#ff6464",
  },

  candidateDuplicateError: {
    title: "Seleção de voto fora das diretrizes.",
    description: "Candidato(a) já selecionado!",
    color: "#ff6464",
  },

  voteSuccess: {
    title: "Voto enviado com sucesso!",
    description: "",
    color: "#9fc54d",
  },

  voteCountError: {
    title: "Verifique a quantidade de candidatos para votos dessa posição",
    description: "Selecione os candidatos para enviar o voto.",
    color: "#ff6464",
  },

  voteError: {
    title: "Erro ao efetuar a requisição!",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  errorUpdate: {
    title: "Erro ao atualizar Informações",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  errorLogin: {
    title: "Erro ao verificar as credenciais!",
    description: "Certifique se os campos estão corretos.",
    color: "#ff6464",
  },

  unauthorizedLogin: {
    title: "Conta em análise!",
    description: "Por favor aguarde aprovação.",
    color: "#ff6464",
  },

  errorLoginExpired: {
    title: "Erro ao logar no sistema!",
    description: "Não é mais permitido ingresso no saturno.",
    color: "#ff6464",
  },

  resetError: {
    title: "Erro ao redefinir senha!",
    description: "Confira se o email está correto e tente novamente.",
    color: "#ff6464",
  },

  resetSuccess: {
    title: "Requisição feita com sucesso!",
    description: "Acesse o email para finalizar a troca de senha.",
    color: "#9fc54d",
  },

  validationSuccess: {
    title: "Comprovante de validação",
    description: "A hash fornecida é válida e corresponde a votos registrados.",
    color: "#9fc54d",
  },

  registerSuccess: {
    title: "Registro de eleitor",
    description: "Solicitação enviada com sucesso, favor aguardar aprovação!.",
    color: "#9fc54d",
  },

  registerError: {
    title: "Erro ao registrar eleitor",
    description: "Tente novamente mais tarde.",
    color: "#ff6464",
  },

  fileContentError: {
    title: "Erro na Validação da Hash",
    description: "Erro ao carregar comprovante, tente novamente mais tarde.",
    color: "#ff6464",
  },
  validationError: {
    title: "Erro no Comprovante de validação",
    description:
      "A hash fornecida não é válida ou não corresponde a nenhum voto registrado.",
    color: "#ff6464",
  },
};
