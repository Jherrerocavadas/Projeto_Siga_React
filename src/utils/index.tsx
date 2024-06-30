export function complementTextColor(bgColor, lightColor, darkColor) {
    var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
      darkColor : lightColor;
  }

//Verifica se um campo de um objeto dentro de um array é igual a algum valor
export function verifyArrObj(arr, key, value, mode = "normal") {
  // verifyArrObj(disciplinasMatriculadas, "horasAula", value.horasAula, "eachValue")
  // console.log("arr: ", arr)
  // console.log("key: ", key)
  // console.log("value: ",value)

  if (arr.length > 0) {
    var comparations = [];
    arr.forEach((obj, index) => {
      // console.log("OBJ: "+ obj[key] + "; value: " + value + "; comp: " + (obj.numeroAula == value))
      // console.log("index:", index)
      if (mode === "eachValue") {
        obj[key].forEach((objValue) => {
          value.forEach((objValue2) => {
            comparations.push(
              JSON.stringify(objValue) === JSON.stringify(objValue2)
            );
          });
        });
      } else {
        // console.log("obj[key]: ",obj[key])
        comparations.push(obj[key] === value);
      }
    });
    // console.log("comparations: ", comparations)
    // console.log(comparations.includes(true))
    return comparations.includes(true);
  }
  return false;
}

//Verifica um objeto dentro de um array é igual a outro objeto

// FIX: Terminar lógica da função
export function verifyArrMultipleKeys(objList1, objList2, keysList) {
  objList1.forEach((obj1) => {
    console.log(obj1[keysList[1]]);
    var horasAulaComparation = [];
    var diasAulaComparation = [];

    keysList.forEach((key) => {
      objList1[key.chave].forEach((obj1Key) => {
        //para cada horaAula em cada disciplinaCurso
        objList2[key].forEach((obj2Key) => {
          if (obj1Key[key.valor] === obj2Key[key.valor]) {
            horasAulaComparation.push({
              tipo: key.chave,
              resultadoComparacao: true,
            });
          } else {
            horasAulaComparation.push({
              tipo: key.chave,
              resultadoComparacao: false,
            });
          }
        });

        objList1[key.chave].forEach((obj1Key1) => {
          //para cada horaAula em cada disciplinaCurso
          objList2[key].forEach((obj2Key1) => {
            if (obj1Key1[key] === obj2Key1[key]) {
              diasAulaComparation.push({
                tipo: key.chave,
                resultadoComparacao: true,
              });
            } else {
              diasAulaComparation.push({
                tipo: key.chave,
                resultadoComparacao: false,
              });
            }
          });
        });
      });

      console.log("horasCompara", horasAulaComparation);
      console.log("diasCompara", diasAulaComparation);
      //capturar a posição da matéria que deu os checks

      return (
        verifyArrObj(horasAulaComparation, "resultadoComparacao", true) &&
        verifyArrObj(diasAulaComparation, "resultadoComparacao", true)
      );
    });
  });

  // if (objList1?.length > 0 && objList2?.length > 0) {
  //   var comparations = [];
  //   objList1.forEach((obj) => {

  //     // console.log("OBJ: "+ obj[key] + "; value: " + value + "; comp: " + (obj.numeroAula == value))
  //     // console.log("obj[key]: ", obj[key])
  //     objList2.forEach((object) => {
  //       comparations.push(JSON.stringify(obj) == JSON.stringify(object));
  //     })
  //   });
  //   // console.log("comparations: ", comparations)
  //   // console.log(comparations.includes(true))
  //   return comparations.includes(true);
  // }
  // return false;
}

export function getPositionOfMateriaConflitante(
  listaMateriasMatriculadas,
  novaMateria
) {
  var posMatric;
  //para cada disciplinaCurso na matricula
  listaMateriasMatriculadas.forEach((materiaMatriculada, posMatricula) => {
    console.log(materiaMatriculada.disciplina.codDisciplina);
    var horasAulaComparation = [];
    var diasAulaComparation = [];
    //para cada horasAula em cada disciplinaCurso
    materiaMatriculada.horasAula.forEach((horaAula) => {
      //para cada horaAula em cada disciplinaCurso
      novaMateria.horasAula.forEach((horaAulaMateriaNova) => {
        if (horaAula.numeroAula === horaAulaMateriaNova.numeroAula) {
          horasAulaComparation.push({
            posMatricula: posMatricula,
            resultadoComparacao: true,
          });
        } else {
          horasAulaComparation.push({
            posMatricula: posMatricula,
            resultadoComparacao: false,
          });
        }
      });
    });

    materiaMatriculada.diasDeAula.forEach((diaAula) => {
      //para cada horaAula em cada disciplinaCurso
      novaMateria.diasDeAula.forEach((diaAulaMateriaNova) => {
        if (diaAula === diaAulaMateriaNova) {
          diasAulaComparation.push({
            posMatricula: posMatricula,
            resultadoComparacao: true,
          });
        }
      });
    });

    console.log("horasCompara", horasAulaComparation);
    console.log("diasCompara", diasAulaComparation);
    //capturar a posição da matéria que deu os checks

    if (
      verifyArrObj(horasAulaComparation, "resultadoComparacao", true) &&
      verifyArrObj(diasAulaComparation, "resultadoComparacao", true)
    ) {
      console.log("posicaoMatricula", horasAulaComparation[0].posMatricula);
      posMatric = horasAulaComparation[0].posMatricula;
      return posMatric;
    } else {
      console.log("Não TEM POS MATROC");
    }
  });

  return posMatric;
}