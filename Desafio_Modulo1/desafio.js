const json = require("./accounts.json");

function somaTodasContas() {
  return json.reduce((a, b) => a + (b["balance"] || 0), 0);
}

function contasComMaisDeCem() {
  var arr = json.filter((conta) => conta.balance > 100);
  return arr.length;
}

function contasComMaisDeCem_Ag33() {
  var arr = json.filter((conta) => conta.balance > 100 && conta.agencia == 33);
  return arr.length;
}

function agenciaComMaiorSaldo() {
  var result = [];
  json.reduce(function (res, value) {
    if (!res[value.agencia]) {
      res[value.agencia] = { agencia: value.agencia, balance: 0 };
      result.push(res[value.agencia]);
    }
    res[value.agencia].balance += value.balance;
    return res;
  }, {});
  return result.sort((a, b) => a > b);
}

function getMaiorClientePorAgencia() {
  var resultMaior = [];
  json.reduce(function (res, value) {
    if (!res[value.agencia]) {
      res[value.agencia] = { agencia: value.agencia, name: "", balance: 0 };
      resultMaior.push(res[value.agencia]);
    }
    if (value.balance > res[value.agencia].balance) {
      res[value.agencia].balance = value.balance;
      res[value.agencia].name = value.name;
    }

    return res;
  }, {});
  return resultMaior;
}

function getMenorClientePorAgencia() {
  var result = [];
  json.reduce(function (res, value) {
    if (!res[value.agencia]) {
      res[value.agencia] = {
        agencia: value.agencia,
        name: "",
        balance: 999999999,
      };
      result.push(res[value.agencia]);
    }
    if (value.balance < res[value.agencia].balance) {
      res[value.agencia].balance = value.balance;
      res[value.agencia].name = value.name;
    }

    return res;
  }, {});
  return result;
}

function somaMaiorCliente() {
  var arr = getMaiorClientePorAgencia();
  return arr.reduce((a, b) => a + (b["balance"] || 0), 0);
}

function nomeMaiorCliente_Agencia10() {
  var arr = getMaiorClientePorAgencia();
  return arr.filter((ag) => ag.agencia == 10);
}

function nomeMenorCliente_Agencia47() {
  var arr = getMenorClientePorAgencia();
  return arr.filter((ag) => ag.agencia == 47);
}

function listaTresMenoresAgencia47() {
  var arr2 = json.filter((cli) => cli.agencia === 47);
  var arr3 = arr2.sort((a, b) =>
    a.balance > b.balance ? 1 : b.balance > a.balance ? -1 : 0
  );
  return arr3.slice(0, 3).map((a) => a.name);
}

function qtdeClienteAgencia47() {
  return json.filter((cli) => cli.agencia == 47).length;
}

function qtdeClienteMariaAgencia47() {
  return json.filter((cli) => cli.agencia == 47 && cli.name.includes("Maria"))
    .length;
}

function nextIdAvailable() {
  var arr4 = json.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0));
  return arr4.pop().id + 1;
}

console.log(`A soma do saldo de todas as contas é: ${somaTodasContas()}`);
console.log(`O número de contas com mais de 100 é: ${contasComMaisDeCem()}`);
console.log(
  `O número de contas com mais de 100 na Agencia 33 é: ${contasComMaisDeCem_Ag33()}`
);
console.log(
  `A agência com maior saldo é a:${agenciaComMaiorSaldo()[0].agencia}`
);
console.log(
  `A agência com menor saldo é a:${agenciaComMaiorSaldo()[2].agencia}`
);
console.log(`A soma das contas de maior número é: ${somaMaiorCliente()}`);
console.log(
  `O cliente com maior saldo na Agencia 10 é `,
  nomeMaiorCliente_Agencia10()
);
console.log(
  `O cliente com menor saldo na Agencia 47 é `,
  nomeMenorCliente_Agencia47()
);
console.log(
  "Lista de clientes com menor saldo na agencia 47: " +
    listaTresMenoresAgencia47()
);
console.log("Quantidade de clientes na agencia 47: " + qtdeClienteAgencia47());
console.log(
  "Quantidade de clientes com nome Maria na agencia 47: " +
    qtdeClienteMariaAgencia47()
);
console.log("O proximo Id é: " + nextIdAvailable());
