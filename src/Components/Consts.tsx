export const modalText = {
  sendVote: {
    title: "Voto prestes a ser enviado.",
    description: "Você tem certeza que deseja reaizar esse voto?",
    button: "Sim",
  },
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
    title: "Selecao de voto fora das diretrizes.",
    description: "Numero de candidatos selecionados ultrapassa o limite permitido.",
    color: "#9fc54d",
  },

  candidateDuplicateError: {
    title: "Selecao de voto fora das diretrizes.",
    description: "Voce so pode selecionar os candidatos validos uma unica vez.",
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
    title: "Hash Validada",
    description: "A hash fornecida é válida e corresponde a votos registrados.",
    color: "#9fc54d",
  },

  validationError: {
    title: "Erro na Validação da Hash",
    description:
      "A hash fornecida não é válida ou não corresponde a nenhum voto registrado.",
    color: "#ff6464",
  },
};
