const headers = [
    { headerId: 1, text: "", options: [""] },
    { headerId: 2, text: "", options: [""] },
    { headerId: 3, text: "", options: [""] },
];

const contents=[];
const hLen = headers.length;
for (let i = 1; i <= hLen; i += 1) {
    contents.push({ refId: i, textAnswer: "" });
}

console.log(contents); // tslint:disable-line
