export default function Hash(password, salt) {
    var hashedPassword = password + salt;
    var res = 7;
    for (let i = 0; i < 101; i++) {
        for (let j = 0; j < hashedPassword.length; j++) {
            let charCode = hashedPassword.charCodeAt(j);
            res = (res * 131) ^ (charCode + j);
            res %= 998244353;

        }
        hashedPassword = Math.abs(res).toString();
    }
    return hashedPassword;
}

export function genSalt(){
    return Math.random().toString(36).substring(2);
}