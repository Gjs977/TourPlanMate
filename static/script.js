const section1_btn_1 = document.querySelector(".section1_btn_1"); //시작하기 버튼
const section1_btn_2 = document.querySelector(".section1_btn_2"); //더 알아보기 버튼
const header_text = document.querySelector(".header_text");

const test_box_input = document.querySelector("#test_box_input");
const test_box_textarea = document.querySelector("#test_box_textarea");
const test_box_duration = document.querySelector("#test_box_duration");
const test_box_date = document.querySelector("#test_box_date");
const test_box_range = document.querySelector("#test_box_range");
const test_box_count = document.querySelector("#test_box_count");
const test_box_btn = document.querySelector(".test_box_btn");

const modal = document.querySelector('.modal');
const modal_content = document.querySelector(".modal_content");
const resetBtn = document.querySelector(".resetBtn");
const saveBtn = document.querySelector(".saveBtn");

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'F12') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
    }
});
window.addEventListener('wheel', (e) => {
    if (e.ctrlKey) {
        e.preventDefault();
    }
}, { passive: false });
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey) {
        const blockedKeys = ['+', '-', '=', '_'];
        if (blockedKeys.includes(e.key)) {
            e.preventDefault();
        }
    }
});


header_text.addEventListener('click', () => {
    document.querySelector('.section_1').scrollIntoView({ behavior: 'smooth' });
});

section1_btn_1.addEventListener('click', () => {
    document.querySelector('.section_2').scrollIntoView({ behavior: 'smooth' });
});

section1_btn_2.addEventListener('click', () => {
    alert("업데이트 예정")
});

test_box_btn.addEventListener('click', async () => {
    let a = test_box_input.value;
    let b = test_box_textarea.value;
    let c = test_box_duration.value;
    let d = test_box_date.value;
    let e = test_box_range.value;
    let f = test_box_count.value;

    modal.style.display = "flex";
    modal_content.innerText = "계획을 생성하는 중입니다. 조금만 기다려 주세요...";

    resetBtn.disabled = true;
    saveBtn.disabled = true;
    resetBtn.classList.add('disabled');
    saveBtn.classList.add('disabled');

    const prompt = `
입력값 정리:
- 여행가고 싶은 곳: ${a}
- 어떤 활동을 하고 싶은가: ${b}
- 여행 기간: ${c}
- 출발 날짜: ${d}
- 예산 범위: ${e}
- 여행자 수: ${f}

위 조건에 맞춰서 아래 항목들을 포함한 상세한 여행 계획을 단계별로 만들어줘:
1. 여행 일정 요약
2. 주요 방문지와 추천 활동
3. 예상 비용과 예산 분배
4. 준비물 체크리스트
5. 여행 중 주의사항

너는 여행 계획을 세워주는 인공지능이야.
참고로 저기서 예산범위가 0에 가까울수록 저비용이고 100에 가까울수록 고비용이야.
친절하고 구체적으로 최적의 계획을 작성해줘. 답변은 계획만 말해줘
만약 너가 조금이라도 이해하기 힘든 질문이 들어오면, 만약 입력값이 현실에 없으면, 어떤 활동을 하고 싶은가 가 어떠한 활동이 아니면 그냥 "죄송합니다. 이해하지 못했습니다. 다시한번 계획을 생성해 주세요" 라는 문자만 출력해줘
`;

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: prompt })
        });

        const data = await response.json();
        modal_content.innerText = data.answer;

        resetBtn.disabled = false;
        saveBtn.disabled = false;
        resetBtn.classList.remove('disabled');
        saveBtn.classList.remove('disabled');
    } catch (error) {
        modal_content.innerText = "오류가 발생했습니다. 다시 시도해 주세요.";
        console.error(error);

        resetBtn.disabled = false;
        saveBtn.disabled = false;
        resetBtn.classList.remove('disabled');
        saveBtn.classList.remove('disabled');
    }
});

resetBtn.addEventListener('click', () => {
    location.reload(true);
});

saveBtn.addEventListener('click', () => {
    const content = document.querySelector('.modal_content').innerText;
    
    if(confirm("저장하시겠습니까?")){
		if(content == "죄송합니다. 이해하지 못했습니다. 다시한번 계획을 생성해 주세요."){
            alert("죄송합니다. 계획이 정상적으로 생성되지 않았습니다. 다시 생성해 주세요.")
        }else{
            
 const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'plan.txt'; 
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        }
	}else{
		alert("저장하지 않았습니다.");
	}
    
});
