"use strict";

// hold places of pieces
const places = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
    9: "",
    10: "",
    11: "",
    12: "",
    13: "",
    14: "",
    15: "",
    16: "",
    17: "",
    18: "",
    19: "",
    20: "",
    21: "",
    22: "",
    23: "",
    24: "",
    25: "",
    26: "",
    27: "",
    28: "",
    29: "",
    30: "",
    31: "",
    32: "",
    33: "",
    34: "",
    35: "",
    36: "",
    37: "",
    38: "",
    39: "",
    40: "",
    41: "",
    42: "",
    43: "",
    44: "",
    45: "",
    46: "",
    47: "",
    48: ""
};
const coordinates = [
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
];
const piece_names = [
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
    "btam"
];
const choice = document.getElementById("choice");

// return false when the choice is empty
function is_chosen() { return choice.innerHTML !== ""; }

// move the chosen piece to td
function move(td) {
    const piece = document.getElementById(choice.innerHTML);
    piece.parentNode.removeChild(piece);
    td.appendChild(piece);
    places[piece.id] = td.id;
    choice.innerHTML = "";
    console.log("move");
}

function gain(target_id) { // target is also piece
    const piece = document.getElementById(choice.innerHTML);
    const target = document.getElementById(target_id);
    if (piece === target) return;

    piece.parentNode.removeChild(piece);
    target.parentNode.appendChild(piece);
    if (piece.classList.contains("reverse")) send_to_red(target.id);
    else send_to_black(target.id);

    choice.innerHTML = "";
    console.log("gain");
}

function spawn(td) {
    const piece = document.getElementById(choice.innerHTML).firstChild;
    if (null == piece) { console.log("NPE"); return; }

    piece.parentNode.removeChild(piece);
    td.appendChild(piece);
    document.getElementById(`${choice.innerHTML}_num`).innerHTML -= 1;
    choice.innerHTML = "";
    console.log("spawn");
}

// functions on the button
function rotate() {
    if (is_chosen()) document.getElementById(choice.innerHTML).classList.toggle("reverse");
    choice.innerHTML = "";
    console.log("rotate");
}

function send_to_red(piece_id) {
    const red = document.getElementById("red");
    const piece = piece_names.includes(piece_id) ? (
        function () {
            document.getElementById(`${piece_id}_num`).innerHTML -= 1;
            return document.getElementById(piece_id).firstChild
        }
    )() : document.getElementById(piece_id);
    if (null == piece) { console.log("NPE"); return; }

    piece.parentNode.removeChild(piece);
    piece.classList.add("reverse");
    red.appendChild(piece);
    places[piece_id] = "red";
    choice.innerHTML = "";
    console.log("red");
}

function send_to_black(piece_id) {
    const black = document.getElementById("black");
    const piece = piece_names.includes(piece_id) ? (
        function () {
            document.getElementById(`${piece_id}_num`).innerHTML -= 1;
            return document.getElementById(piece_id).firstChild
        }
    )() : document.getElementById(piece_id);
    if (null == piece) { console.log("NPE"); return; }

    piece.parentNode.removeChild(piece);
    piece.classList.remove("reverse");
    black.appendChild(piece);
    places[piece_id] = "black";
    choice.innerHTML = "";
    console.log("black");
}

function send_to_rest(piece_id) {
    const rest = document.getElementById(pieces[piece_id]);
    const piece = document.getElementById(piece_id);
    const piece_num = document.getElementById(`${pieces[piece_id]}_num`);
    if (piece_names.includes(piece_id)) { console.log("called in vain"); return; }

    piece.parentNode.removeChild(piece);
    piece.classList.remove("reverse");
    rest.appendChild(piece);
    places[piece_id] = "rest";
    choice.innerHTML = "";
    piece_num.innerHTML = Number(piece_num.innerHTML) + 1;
    console.log("rest");
}

function ciurl() {
    let rand = 0;
    for (let i = 0; i < 5; i++) { rand += Math.round(Math.random()); }
    alert(rand);
}

function init() {
    for (let i = 0; i < pieces.length; i++) {
        const piece = document.getElementById(i);
        piece.parentNode.removeChild(piece);
        document.getElementById(coordinates[i]).appendChild(piece);
        if (i < 24) piece.classList.add("reverse");
        else piece.classList.remove("reverse");
        places[i] = coordinates[i];
    }
    for (let i = 0; i < pieces.length; i++) {
        document.getElementById(`${pieces[i]}_num`).innerHTML = 0;
    }
    console.log("init");
}

// load board
const column = ["K", "L", "N", "T", "Z", "X", "C", "M", "P"];
const row = ["A", "E", "I", "U", "O", "Y", "AI", "AU", "IA"];
const tanna = ["ZI", "ZU", "NO", "TO", "XO", "CO", "ZY", "ZAI"];
const tarfe = ["NI", "CI", "TU", "XU", "TY", "XY", "NAI", "CAI"];

for (let i = 0; i < row.length; i++) {
    const table = document.getElementById("board");
    const newtr = table.insertRow(-1);
    for (let j = 0; j < column.length; j++) {
        const newtd = newtr.insertCell(-1);
        const newid = `${column[j]}${row[i]}`;

        newtd.id = newid;
        newtd.className = `cell
            ${tarfe.includes(newid) ? " tarfe" : "" // add tarfe class
            }${tanna.includes(newid) ? " tanna" : "" // add tanna class
            }${newid === "ZO" ? " tanzo" : "" // add tanzo class
            }`;
        newtd.addEventListener("click", (event) => {
            if (event.target.tagName !== "IMG" && is_chosen()) {
                if (piece_names.includes(choice.innerHTML)) spawn(newtd);
                else move(newtd);
            }
        });
    }
}

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
    newimg.id = i;
    newimg.src = `./pieces/${pieces[i]}.png`;
    newimg.addEventListener("click", () => {
        if (is_chosen()) gain(i);
        else choice.innerHTML = i;
    });
    places[i] = "rest";
}

// load piece list
const piece_list = document.getElementById("piece_list");
for (let i = 0; i < 4; i++) {
    const tr_img = document.getElementById(`pl${i}`);
    const tr_num = document.getElementById(`pl${i + 4}`);
    for (let j = 0; j < 6; j++) {
        const num = i * 6 + j;
        // fill blank cells
        if (undefined == piece_names[num]) {
            const newtd_img = document.createElement("td");
            tr_img.appendChild(newtd_img);
            newtd_img.className = "piece_img";
            const newtd_num = document.createElement("td");
            tr_num.appendChild(newtd_num);
            newtd_num.className = "piece_num";
            continue;
        }
        // load img cells
        const newtd_img = document.createElement("td");
        tr_img.appendChild(newtd_img);
        newtd_img.className = "piece_img";
        newtd_img.id = `${piece_names[num]}_img`;
        newtd_img.innerHTML = `<img src="./pieces/${piece_names[num]}.png" height="50" width="50" onclick="choice.innerHTML='${piece_names[num]}'"/>`;
        // load num cells
        const newtd_num = document.createElement("td");
        tr_num.appendChild(newtd_num);
        newtd_num.className = "piece_num";
        newtd_num.id = `${piece_names[num]}_num`;
        newtd_num.innerHTML = document.getElementById(piece_names[num]).children.length;
    }
}