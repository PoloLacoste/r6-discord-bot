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

export function formatMessage(messages: Array<string>): string {
  let str = '';
  let maxDash = 1;

  messages.forEach((s) => {
    if(s.length > maxDash) {
      maxDash = s.length;
    }
  });

  let dash = Array(maxDash).join('-');
  
  for(let i = 0; i < messages.length; i++) {
    let msg = messages[i];
    if(i + 1 == messages.length) {
      str += `${msg}`;
    }
    else {
      str += `${msg}\n${dash}\n`;
    }
  }

  return str;
}