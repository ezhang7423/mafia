function throwError(message){
    throw new Error(message);
}

export function getVillagers(mafia, names) {
    mafia || throwError("mafia should not be empty")
    names || throwError("names should not be empty")
    typeof mafia === "object" || throwError("mafia should be an array")
    typeof names === "object" || throwError("names should be an array")



    let res = [];
    let ine = false;
    for (let i of names) {
      ine = false;
      for (let j of mafia) {
        if (i == j) {
          ine = true;
          break;
        }
      }
      if (!ine) {
        res.push(i);
      }
    }
    return res;
  }