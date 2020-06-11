import {get} from "@/http";

let GET = get(`${window.location.origin}/api`)

export function getUserTz(userId: string,ps: number = 5) {
    return GET(`/ta/UserPostList?p=1&ps=${ps}&uid=${userId}`).then((res: userTzResp) => res)
}