export function checkArgs(args, required): boolean {
  for (let el of required) {
    if (el in args) {
      if(args[el] == null) {
        return false;
      }
    }
    else {
      return false;
    }
  }

  return true;
}