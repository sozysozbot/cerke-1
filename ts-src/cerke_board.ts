"use strict";

type PieceImgName = "bkua" | "bmaun" | "bkaun" | "buai" | "rio" | "ruai" | "rkaun" | "rmaun" | "rkua" |
    "rtuk" | "rgua" | "rdau" | "bdau" | "bgua" | "btuk" |
    "bkauk" | "rkauk" | "bkauk" | "rkauk" | "rnuak" | "rkauk" | "bkauk" | "rkauk" | "bkauk" |
    "btam" |
    "bkauk" | "rkauk" | "bkauk" | "rkauk" | "bnuak" | "rkauk" | "bkauk" | "rkauk" | "bkauk" |
    "btuk" | "bgua" | "bdau" | "rdau" | "rgua" | "rtuk" |
    "rkua" | "rmaun" | "rkaun" | "ruai" | "bio" | "buai" | "bkaun" | "bmaun" | "bkua" |
    "rtam" | "bmun" | "bmun" | "bmun" | "rmun" | "rmun" | "rmun" |
    "bsaup" | "bsaup" | "rsaup" | "rsaup";

const initial_coord_yhuap = [
    "KA", "LA", "NA", "TA", "ZA", "XA", "CA", "MA", "PA",
    "KE", "LE", "TE", "XE", "ME", "PE",
    "KI", "LI", "NI", "TI", "ZI", "XI", "CI", "MI", "PI",
    "ZO",
    "KAI", "LAI", "NAI", "TAI", "ZAI", "XAI", "CAI", "MAI", "PAI",
    "KAU", "LAU", "TAU", "XAU", "MAU", "PAU",
    "KIA", "LIA", "NIA", "TIA", "ZIA", "XIA", "CIA", "MIA", "PIA",
];
const pieces = [
    "bkua", "bmaun", "bkaun", "buai", "rio", "ruai", "rkaun", "rmaun", "rkua",
    "rtuk", "rgua", "rdau", "bdau", "bgua", "btuk",
    "bkauk", "rkauk", "bkauk", "rkauk", "rnuak", "rkauk", "bkauk", "rkauk", "bkauk",
    "btam",
    "bkauk", "rkauk", "bkauk", "rkauk", "bnuak", "rkauk", "bkauk", "rkauk", "bkauk",
    "btuk", "bgua", "bdau", "rdau", "rgua", "rtuk",
    "rkua", "rmaun", "rkaun", "ruai", "bio", "buai", "bkaun", "bmaun", "bkua",
    "rtam", "bmun", "bmun", "bmun", "rmun", "rmun", "rmun",
    "bsaup", "bsaup", "rsaup", "rsaup"
];

// hold places of pieces
const places: string[] = pieces.map(() => "");

const piece_names: ReadonlyArray<PieceImgName> = [
    "bnuak", "rnuak",
    "bkauk", "rkauk",
    "bgua", "rgua",
    "bkaun", "rkaun",
    "bdau", "rdau",
    "bmaun", "rmaun",
    "bkua", "rkua",
    "btuk", "rtuk",
    "buai", "ruai",
    "bio", "rio",
    "btam", "rtam",
    "bmun", "rmun",
    "bsaup", "rsaup"
];

class Choice {
    private _innerHTML: string = "";
    private _value: null | PieceImgName | number = null;

    get innerHTML(): ChoiceInnerHTMLType {
        return this._innerHTML;
    }

    set value(value: null | PieceImgName | number) {
        if (value === null) {
            document.getElementById("choice").innerHTML = this._innerHTML = "";
        } else if (typeof value === "number") {
            document.getElementById("choice").innerHTML = this._innerHTML = `${value}`;
        } else {
            document.getElementById("choice").innerHTML = this._innerHTML = value;
        }
    }

    is_piece_name(): boolean {
        return typeof this._value === "string"
    }
}

const choice = new Choice();

type ChoiceInnerHTMLType = string;

// return false when the choice is empty
function isChosen() { return choice.innerHTML !== ""; }

// move the choice(=piece) to td(=grid)
function move(td: HTMLTableDataCellElement) {
    const piece = document.getElementById(choice.innerHTML);
    piece.parentNode.removeChild(piece);
    td.appendChild(piece);
    places[piece.id] = td.id;
    choice.value = null;
    console.log("move");
}

function gain(target_id: number) { // target is also piece
    const piece = document.getElementById(choice.innerHTML);
    const target = document.getElementById(target_id);
    if (piece === target || piece_names.includes(choice.innerHTML)) return;

    piece.parentNode.removeChild(piece);
    target.parentNode.appendChild(piece);
    if (piece.classList.contains("reverse")) sendToRed(target.id);
    else sendToBlack(target.id);

    choice.value = null;
    console.log("gain");
}

function spawn(td: HTMLTableDataCellElement) {
    const piece = document.getElementById(choice.innerHTML).firstChild;
    if (null == piece) { console.log("NPE"); return; }

    piece.parentNode.removeChild(piece);
    td.appendChild(piece);
    document.getElementById(`${choice.innerHTML}_num`).innerHTML = `${Number(document.getElementById(`${choice.innerHTML}_num`).innerHTML) - 1}`;
    choice.value = null;
    console.log("spawn");
}

// functions on the button
function rotate() {
    if (isChosen()) document.getElementById(choice.innerHTML).classList.toggle("reverse");
    choice.value = null;
    console.log("rotate");
}

function sendTo(dest, piece_id) {
    const destination = document.getElementById(dest);
    const piece = document.getElementById(piece_id);
    if (null == piece) { console.log("NPE"); return; }

    piece.parentNode.removeChild(piece);
    destination.appendChild(piece);
    places[piece_id] = dest;
    choice.value = null;
}

function sendToRed(piece_id: number | ChoiceInnerHTMLType) {
    const piece = document.getElementById(piece_id);
    piece.classList.add("reverse");
    sendTo("red", piece_id);
    console.log("red");
}

function sendToBlack(piece_id: number | ChoiceInnerHTMLType) {
    const piece = document.getElementById(piece_id);
    piece.classList.remove("reverse");
    sendTo("black", piece_id);
    console.log("black");
}

function sendToRest(piece_id: number | ChoiceInnerHTMLType) {
    const piece = document.getElementById(piece_id);
    const td_num = document.getElementById(`${pieces[piece_id]}_num`);
    piece.classList.remove("reverse");
    sendTo(pieces[piece_id], piece_id);
    td_num.innerHTML = `${Number(td_num.innerHTML) + 1}`;
    console.log("rest");
}

function spawnTo(dest: "black" | "red", piece_id: ChoiceInnerHTMLType) {
    const destination = document.getElementById(dest);
    const piece = document.getElementById(piece_id).firstChild;
    if (dest !== "black" && dest !== "red" && destination.children.length !== 0) { console.log("already occupied"); return; }
    piece.parentNode.removeChild(piece);
    destination.appendChild(piece);
    places[piece_id] = dest;
    choice.value = null;
}

function spawnToBlack(piece_id: ChoiceInnerHTMLType) {
    const piece = document.getElementById(piece_id).firstChild;
    if (null == piece) { console.log("NPE"); return; }
    else document.getElementById(`${piece_id}_num`).innerHTML = `${Number(document.getElementById(`${piece_id}_num`).innerHTML) - 1}`;
    spawnTo("black", piece_id);
}

function spawnToRed(piece_id: ChoiceInnerHTMLType) {
    const piece = document.getElementById(piece_id).firstChild;
    if (null == piece) { console.log("NPE"); return; }
    else document.getElementById(`${piece_id}_num`).innerHTML =  `${Number(document.getElementById(`${piece_id}_num`).innerHTML) - 1}`;
    (piece as HTMLImageElement).classList.add("reverse");
    spawnTo("red", piece_id);
}

function ciurl() {
    let rand = 0;
    for (let i = 0; i < 5; i++) { rand += Math.round(Math.random()); }
    alert(rand);
}

function init() {
    for (let i = 0; i < initial_coord_yhuap.length; i++) {
        const piece = document.getElementById(`${i}`);
        piece.parentNode.removeChild(piece);
        document.getElementById(initial_coord_yhuap[i]).appendChild(piece);
        if (i < 24) piece.classList.add("reverse");
        else piece.classList.remove("reverse");
        places[i] = initial_coord_yhuap[i];
    }
    for (let i = 0; i < initial_coord_yhuap.length; i++) {
        document.getElementById(`${pieces[i]}_num`).innerHTML = `${0}`;
    }
    console.log("init");
}

// load board
const column = ["K", "L", "N", "T", "Z", "X", "C", "M", "P"];
const row = ["A", "E", "I", "U", "O", "Y", "AI", "AU", "IA"];
const tanna = ["ZI", "ZU", "NO", "TO", "XO", "CO", "ZY", "ZAI"];
const tarfe = ["NI", "CI", "TU", "XU", "TY", "XY", "NAI", "CAI"];

for (let i = 0; i < row.length; i++) {
    const table = document.getElementById("board") as HTMLTableElement;
    const newtr = table.insertRow(-1);
    for (let j = 0; j < column.length; j++) {
        const newtd: HTMLTableDataCellElement = newtr.insertCell(-1);
        const newid = `${column[j]}${row[i]}`;

        newtd.id = newid;
        newtd.className = `cell
            ${tarfe.includes(newid) ? " tarfe" : "" // add tarfe class
            }${tanna.includes(newid) ? " tanna" : "" // add tanna class
            }${newid === "ZO" ? " tanzo" : "" // add tanzo class
            }`;
        newtd.addEventListener("click", (event) => {
            if ((event.target as HTMLElement).tagName !== "IMG" && isChosen()) {
                if (piece_names.includes(choice.innerHTML)) spawn(newtd);
                else move(newtd);
            }
        });
    }
}

// set console function
// button
document.getElementById("send_to_red").addEventListener("click", (event) => {
    if (isChosen()) {
        if (piece_names.includes(choice.innerHTML)) spawnToRed(choice.innerHTML);
        else sendToRed(choice.innerHTML);
    }
});

document.getElementById("send_to_black").addEventListener("click", (event) => {
    if (isChosen()) {
        if (piece_names.includes(choice.innerHTML)) spawnToBlack(choice.innerHTML);
        else sendToBlack(choice.innerHTML);
    }
});

document.getElementById("send_to_rest").addEventListener("click", (event) => {
    if (isChosen()) {
        if (piece_names.includes(choice.innerHTML)) console.log("called in vain");
        else sendToRest(choice.innerHTML);
    }
});

// checkbox
document.getElementById("red_tam_checkbox").addEventListener("change", () => {
    if ((document.getElementById("red_tam_checkbox") as HTMLInputElement).checked) generateRedTam();
    else drainRedTam();
})

document.getElementById("mun_checkbox").addEventListener("change", () => {
    if ((document.getElementById("mun_checkbox") as HTMLInputElement).checked) { generateBlackMun(); generateRedMun(); }
    else { drainBlackMun(); drainRedMun(); }
})

document.getElementById("saup_checkbox").addEventListener("change", () => {
    if ((document.getElementById("saup_checkbox") as HTMLInputElement).checked) { generateBlackSaup(); generateRedSaup(); }
    else { drainBlackSaup(); drainRedSaup(); }
})


// load rest
for (let i = 0; i < piece_names.length; i++) {
    const rest = document.getElementById("rest");
    const newdiv = document.createElement("div");
    rest.appendChild(newdiv);
    newdiv.id = piece_names[i];
}

// load pieces
for (let i = 0; i < pieces.length; i++) {
    const newimg = document.createElement("img");
    document.getElementById(pieces[i]).appendChild(newimg);
    newimg.className = "piece";
    newimg.id = `${i}`;
    newimg.src = `./pieces/${pieces[i]}.png`;
    newimg.addEventListener("click", () => {
        if (isChosen()) gain(i);
        else choice.value = i;
    });
    places[i] = "rest";
}

// load piece list
const piece_list = document.getElementById("piece_list");
for (let i = 0; i < 4; i++) {
    const tr_img = document.getElementById(`pl${i}`);
    const tr_num = document.getElementById(`pl${i + 4}`);
    for (let j = 0; j < 7; j++) {
        const num = i * 7 + j;
        // fill blank cells
        const newtd_img = document.createElement("td");
        tr_img.appendChild(newtd_img);
        newtd_img.id = `${piece_names[num]}_img`;
        newtd_img.className = "piece_img";
        const newtd_num = document.createElement("td");
        tr_num.appendChild(newtd_num);
        newtd_num.id = `${piece_names[num]}_num`;
        newtd_num.className = "piece_num";//*/
        if (num < 21) fillPieceCell(num);
    }
}

function fillPieceCell(num: number) {
    // load img cells
    const td_img = document.getElementById(`${piece_names[num]}_img`);

    const inner_img = document.createElement("img");
    inner_img.src = `./pieces/${piece_names[num]}.png`;
    inner_img.height = 50;
    inner_img.width = 50;
    const new_val = piece_names[num];
    inner_img.addEventListener("click", () => {
        choice.value = new_val;
    });
    td_img.innerHTML = "";
    td_img.appendChild(inner_img);
    
    // load num cells
    const td_num = document.getElementById(`${piece_names[num]}_num`);
    td_num.innerHTML = `${document.getElementById(piece_names[num]).children.length}`;
}

function drainPieceCell(num: number) {
    // drain img cells
    const td_img = document.getElementById(`${piece_names[num]}_img`);
    td_img.innerHTML = "";
    // drain num cells
    const td_num = document.getElementById(`${piece_names[num]}_num`);
    td_num.innerHTML = "";
}

// red tam
function generateRedTam() { fillPieceCell(21); }
function drainRedTam() { sendToRest(49); drainPieceCell(21); }

// mun
function generateBlackMun() { fillPieceCell(22); }
function generateRedMun() { fillPieceCell(23); }

function drainBlackMun() {
    sendToRest(50); sendToRest(51); sendToRest(52);
    drainPieceCell(22);
}
function drainRedMun() {
    sendToRest(53); sendToRest(54); sendToRest(55);
    drainPieceCell(23);
}

// saup
function generateBlackSaup() { fillPieceCell(24); }
function generateRedSaup() { fillPieceCell(25); }

function drainBlackSaup() {
    sendToRest(56); sendToRest(57);
    drainPieceCell(24);
}
function drainRedSaup() {
    sendToRest(58); sendToRest(59);
    drainPieceCell(25);
}