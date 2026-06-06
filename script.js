
const chatBox = document.getElementById("chatBox");

function quickAsk(text){
    document.getElementById("userInput").value = text;
    sendMessage();
}

async function sendMessage(){

    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if(!message) return;

    chatBox.innerHTML += `
        <div class="user-message">${message}</div>
    `;

    input.value = "";

    chatBox.innerHTML += `
        <div class="bot-message" id="typing">
            <div class="typing">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    chatBox.scrollTop = chatBox.scrollHeight;
    const lowerMsg = message.toLowerCase();

if(
    lowerMsg.includes("course") ||
    lowerMsg.includes("courses") ||
    lowerMsg.includes("enna course") ||
    lowerMsg.includes("enna courses") ||
    lowerMsg.includes("course iruku") ||
    lowerMsg.includes("courses iruku") ||
    lowerMsg.includes("course lam") ||
    lowerMsg.includes("courses lam") ||
    lowerMsg.includes("ug") ||
    lowerMsg.includes("pg")
){

    const typing =
    document.getElementById("typing");

    if(typing){
        typing.remove();
    }

    showCourseMenu();

    return;
}

    try{

        const response = await fetch(
            "http://localhost:3000/chat",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    message:message
                })
            }
        );

        const data = await response.json();

        const typing =
        document.getElementById("typing");

        if(typing){
            typing.remove();
        }

        chatBox.innerHTML += `
            <div class="bot-message">
                ${data.reply}
            </div>
        `;

        chatBox.scrollTop =
        chatBox.scrollHeight;

    }
    catch(error){

        console.error(error);

        const typing =
        document.getElementById("typing");

        if(typing){
            typing.remove();
        }

        chatBox.innerHTML += `
            <div class="bot-message">
                ❌ AI Server Connection Error
            </div>
        `;
    }
}

/* ENTER = SEND */

document.getElementById("userInput")
.addEventListener("keypress", function(e){

    if(e.key === "Enter"){
        sendMessage();
    }

});

/* VOICE INPUT */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

    const recognition =
    new SpeechRecognition();

    recognition.lang = "ta-IN";

    const micBtn =
    document.getElementById("micBtn");

    micBtn.addEventListener(
        "click",
        function(){

            micBtn.classList.add(
                "listening"
            );

            recognition.start();

        }
    );

    recognition.onresult =
    function(event){

        document.getElementById(
            "userInput"
        ).value =
        event.results[0][0]
        .transcript;

        micBtn.classList.remove(
            "listening"
        );

        sendMessage();

    };

    recognition.onerror =
    function(){

        micBtn.classList.remove(
            "listening"
        );

    };

}

/* FLOATING CHAT */

const chatWidget =
document.getElementById(
"chatWidget"
);

const chatToggle =
document.getElementById(
"chatToggle"
);

if(chatWidget && chatToggle){

    const minBtn =
    document.getElementById(
    "minBtn"
    );

    const closeBtn =
    document.getElementById(
    "closeBtn"
    );

    if(minBtn){

        minBtn.addEventListener(
            "click",
            function(){

                chatWidget.classList.toggle(
                    "minimized"
                );

            }
        );

    }

    if(closeBtn){

        closeBtn.addEventListener(
            "click",
            function(){

                chatWidget.style.display =
                "none";

                chatToggle.style.display =
                "block";

            }
        );

    }

    chatToggle.addEventListener(
        "click",
        function(){

            chatWidget.style.display =
            "flex";

            chatToggle.style.display =
            "none";

        }
    );

    chatToggle.style.display =
    "none";
}

/* COURSE MENU */

function showUG(){

chatBox.innerHTML += `
<div class="bot-message">

🎓 <b>UG Courses</b><br><br>

<button class="option-btn" onclick="showBA()">B.A</button>

<button class="option-btn" onclick="showBCOM()">B.Com / BBA</button>

<button class="option-btn" onclick="showBSC()">B.Sc</button>

</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;

}

function showPG(){

chatBox.innerHTML += `
<div class="bot-message">

🎓 <b>PG Courses</b><br><br>

<button class="option-btn" onclick="showMA()">M.A</button>

<button class="option-btn" onclick="showMSC()">M.Sc</button>

<button class="option-btn" onclick="showMBA()">MBA / M.Com</button>

</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;

}

function showBA(){

chatBox.innerHTML += `
<div class="bot-message">

📚 <b>B.A</b><br><br>

• Tamil<br>
• English<br>
• Economics<br>
• History

</div>
`;

}

function showBCOM(){

chatBox.innerHTML += `
<div class="bot-message">

📚 <b>B.Com / BBA</b><br><br>

• Commerce<br>
• Commerce CA<br>
• Commerce IT<br>
• Commerce PA<br>
• Business Administration

</div>
`;

}

function showBSC(){

chatBox.innerHTML += `
<div class="bot-message">

📚 <b>B.Sc</b><br><br>

• Physics<br>
• Chemistry<br>
• Zoology<br>
• Computer Science<br>
• Mathematics<br>
• Microbiology<br>
• Biotechnology<br>
• Information Technology<br>
• Computer Applications<br>
• Data Science<br>
• Artificial Intelligence<br>
• Cyber Security & Cloud Computing

</div>
`;

}

function showMA(){

chatBox.innerHTML += `
<div class="bot-message">

📚 <b>M.A</b><br><br>

• History<br>
• English

</div>
`;

}

function showMSC(){

chatBox.innerHTML += `
<div class="bot-message">

📚 <b>M.Sc</b><br><br>

• Physics<br>
• Chemistry<br>
• Computer Science<br>
• Information Technology<br>
• Zoology<br>
• Data Science<br>
• Biochemistry

</div>
`;

}

function showMBA(){

chatBox.innerHTML += `
<div class="bot-message">

📚 <b>MBA / M.Com</b><br><br>

• MBA<br>
• M.Com

</div>
`;
}

function showCourseMenu(){

chatBox.innerHTML += `
<div class="bot-message">

📚 <b>Select Course Category</b><br><br>

<button class="option-btn" onclick="showUG()">
UG Courses
</button>

<button class="option-btn" onclick="showPG()">
PG Courses
</button>

</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;

}

