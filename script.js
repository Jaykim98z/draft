let currentManager = null;
const selectedPlayers = new Set();  // 이미 선택된 선수를 추적하는 Set

// 포지션 순서를 유지하기 위한 배열
const positionOrder = ['ST', 'WF', 'CM', 'CDM', 'WB', 'FB', 'CB', 'GK'];

const streamerImages = {
    '천양': 'image/천양.jpg',
    '두칠': 'image/두칠.jpg',
    '진호': 'image/진호.jpg',
    '뢴트': 'image/뢴트게늄.jpg',
    '뢴트게늄': 'image/뢴트게늄.jpg',
    '곽춘식': 'image/곽춘식.jpg',
    '춘식': 'image/곽춘식.jpg',
    '주닝요': 'image/주닝요.jpg',
    '닝햄': 'image/주닝요.jpg',
    '피카온': 'image/피카온.jpg',
    '설리반' : 'image/설리반.jpg',
    '우왁굳' : 'image/우왁굳.jpg',
    '문모모' : 'image/문모모.jpg',
    '나나문' : 'image/나나문.jpg',
    '보아탱' : 'image/보아탱.jpg',
    '디스코' : 'image/디스코.jpg',
    '한결' : 'image/한결.jpg',
    '채은채' : 'image/채은채.jpg'
};

const playerDatabase = [
    { name: "망야", position: "ST" },
    { name: "나나문", position: "ST / CM" },
    { name: "찌미", position: "ST" },
    { name: "영감", position: "ST / CM" },
    { name: "밀크라지", position: "ST / CM" },
    { name: "호발", position: "ST / CAM" },
    { name: "루센", position: "ST" },
    { name: "셀키", position: "ST / WF" },
    { name: "설레랑", position: "ST / CB" },
    { name: "봄세이", position: "ST / CB" },
    { name: "백시호", position: "ST" },
    { name: "솜먕", position: "ST / CDM" },
    { name: "흰동", position: "ST" },
    { name: "루디딕", position: "ST / CM" },
    { name: "물초코", position: "ST / CB" },
    { name: "아눙", position: "ST / WF" },
    { name: "티야", position: "ST" },
    { name: "배민정", position: "ST" },
    { name: "아야네세나", position: "ST / GK" },
    { name: "녹초", position: "WF / ST" },
    { name: "강단헤", position: "WF" },
    { name: "깡담비", position: "WF" },
    { name: "여르미", position: "WF" },
    { name: "천사탕", position: "WF" },
    { name: "딸기슈몽이", position: "WF / CAM" },
    { name: "우엉", position: "WF" },
    { name: "치유", position: "WF" },
    { name: "쥬멩미", position: "WF / CM" },
    { name: "나비", position: "WF" },
    { name: "유쁠리", position: "WF" },
    { name: "예다", position: "WF / CM" },
    { name: "달타", position: "WF / ST" },
    { name: "유이담", position: "WF" },
    { name: "재수피기", position: "WF / GK" },
    { name: "한오월", position: "WF / CM" },
    { name: "윤복슬", position: "WF" },
    { name: "로파니", position: "WF" },
    { name: "박디라", position: "WF" },
    { name: "쵸로키", position: "WF" },
    { name: "빈스", position: "WF / CM" },
    { name: "몽나", position: "WF" },
    { name: "나나링", position: "WF" },
    { name: "임재천", position: "WF / CM" },
    { name: "델피", position: "WF" },
    { name: "해리", position: "WF / ST" },
    { name: "다나뉴엔", position: "WF" },
    { name: "이비", position: "WF / CAM" },
    { name: "온리유", position: "WF" },
    { name: "찰리씨", position: "WF / CB" },
    { name: "고티", position: "WF" },
    { name: "유하띠", position: "WF" },
    { name: "누눙지", position: "CM / WF" },
    { name: "문모모", position: "ALL" },
    { name: "뽀린걸", position: "CM / CAM" },
    { name: "한결", position: "CAM / CM" },
    { name: "카라멜", position: "CAM / CM" },
    { name: "낮가림", position: "CAM / CM" },
    { name: "이미찌", position: "CM" },
    { name: "아초라", position: "CM / WF" },
    { name: "단수아", position: "CAM / CM" },
    { name: "나솜", position: "CAM / CM" },
    { name: "배비꼬", position: "CM" },
    { name: "사샤", position: "CM" },
    { name: "카나시", position: "CM / WF" },
    { name: "로에", position: "CAM / WF" },
    { name: "미르", position: "CAM / CM" },
    { name: "하투리", position: "CM / ST" },
    { name: "해수수", position: "CAM / WF" },
    { name: "호미밍", position: "CM" },
    { name: "때찌", position: "CAM / CM" },
    { name: "아르르", position: "CAM / WF" },
    { name: "왜나니", position: "CM / CDM" },
    { name: "류버들", position: "CM / CDM" },
    { name: "김쿼카", position: "CAM / WF" },
    { name: "꿀빵지", position: "CAM / CM" },
    { name: "플리", position: "CM" },
    { name: "여일", position: "CAM / CAM" },
    { name: "니프", position: "CAM / CDM" },
    { name: "에넨", position: "CM / CDM" },
    { name: "쿠로샤", position: "CM / CDM" },
    { name: "루멘시", position: "CM / CDM" },
    { name: "리브레", position: "CM" },
    { name: "섄디한", position: "CAM" },
    { name: "희희덕", position: "CAM" },
    { name: "서피카", position: "CM" },
    { name: "숙봉이", position: "CDM / CM" },
    { name: "땡글땡글포포", position: "CDM" },
    { name: "타루", position: "CDM / WF" },
    { name: "하쁘", position: "CDM" },
    { name: "채은채", position: "CDM / FB" },
    { name: "송밤", position: "CDM / CM" },
    { name: "김병살", position: "CDM" },
    { name: "윤이제", position: "CDM / CM" },
    { name: "로또비", position: "CDM / GK" },
    { name: "핑구", position: "CDM" },
    { name: "오뎅윤", position: "CDM" },
    { name: "토꽁", position: "CDM / FB" },
    { name: "라벤", position: "CDM" },
    { name: "츄이로", position: "CDM" },
    { name: "돗비", position: "CDM" },
    { name: "해사", position: "CDM / CM" },
    { name: "멍보리", position: "CDM / CM" },
    { name: "김마렌", position: "CB" },
    { name: "양도끼", position: "CB" },
    { name: "온우쥬", position: "CB" },
    { name: "쪼꼬밍", position: "CB" },
    { name: "르니", position: "CB / FB" },
    { name: "뮤즈", position: "CB" },
    { name: "큐나", position: "CB" },
    { name: "마이곰이", position: "CB" },
    { name: "왕꿈틀이", position: "CB" },
    { name: "세이나", position: "CB / FB" },
    { name: "김미키", position: "CB" },
    { name: "요님", position: "CB" },
    { name: "캬앙", position: "CB" },
    { name: "묭", position: "CB / FB" },
    { name: "시리안", position: "CB" },
    { name: "새마요", position: "CB" },
    { name: "코코야", position: "CB / FB" },
    { name: "기찬하", position: "CB / CDM" },
    { name: "얼그레", position: "CB" },
    { name: "유키츄", position: "CB" },
    { name: "진청옥", position: "CB / CDM" },
    { name: "서테린", position: "CB" },
    { name: "유샥크", position: "CB" },
    { name: "기먕", position: "CB" },
    { name: "투미츠", position: "CB" },
    { name: "두부랑", position: "CB" },
    { name: "단츄", position: "FB" },
    { name: "개냥이", position: "FB / CB" },
    { name: "비밀소녀", position: "FB / CB" },
    { name: "김챠멜", position: "FB / CM" },
    { name: "이투", position: "FB" },
    { name: "이라", position: "FB" },
    { name: "빅토리", position: "FB" },
    { name: "해우리", position: "FB" },
    { name: "카푸", position: "FB" },
    { name: "댕강", position: "FB" },
    { name: "햇비", position: "FB" },
    { name: "박하", position: "FB" },
    { name: "베지", position: "FB" },
    { name: "유키라", position: "FB" },
    { name: "닌닌", position: "FB" },
    { name: "야무지", position: "FB / WF" },
    { name: "이메이", position: "FB" },
    { name: "지연올", position: "FB / CB" },
    { name: "유시노리나", position: "FB / CB" },
    { name: "푸마고치", position: "FB" },
    { name: "마냥", position: "FB / ST" },
    { name: "이릴", position: "FB" },
    { name: "슈힌", position: "FB" },
    { name: "세용", position: "FB" },
    { name: "로니세라", position: "FB" },
    { name: "강주이", position: "FB" },
    { name: "몽땅", position: "FB / WF" },
    { name: "비슝", position: "FB" },
    { name: "리세하", position: "FB" },
    { name: "언사히", position: "GK" },
    { name: "감자가비", position: "GK" },
    { name: "싱유", position: "GK" },
    { name: "재닌", position: "GK" },
    { name: "챈나", position: "GK" },
    { name: "혜달012", position: "GK" },
    { name: "샬롯", position: "GK" }
];

// 선수 생성 버튼 클릭 이벤트
document.getElementById('generateBtn').addEventListener('click', function() {
    const playerList = document.getElementById('playerList').value.split('\n');
    const selectedPosition = document.getElementById('positionSelect').value;
    const positionDiv = document.getElementById(selectedPosition);
    const positionTitle = document.querySelector(`h3[data-position="${selectedPosition}"]`);
    let playerCount = 0;

    // 홀수 번째 선수만 처리하고 기존 선수는 유지
    for (let i = 0; i < playerList.length; i++) {
        if (i % 2 === 0) {  // 0부터 시작하므로 홀수 번째 선수는 짝수 인덱스
            let playerName = playerList[i].trim();

            // 한글과 공백만 남기고 나머지 문자 제거
            playerName = playerName.replace(/[^가-힣\s]/g, '');

            if (playerName && !isPlayerAlreadyAdded(playerName, positionDiv)) {
                const button = document.createElement('button');
                button.textContent = playerName;
                button.classList.add('playerBtn');
                button.addEventListener('click', function() {
                    if (selectedPlayers.has(playerName)) {
                        deselectPlayer(playerName, this);  // 선택 취소
                    } else if (currentManager) {
                        addPlayerToManager(playerName, selectedPosition);  // 포지션 포함해서 추가
                        markPlayerAsSelected(this);  // 선택된 선수로 표시
                    } else {
                        alert('먼저 감독을 선택하세요.');
                    }
                });
                positionDiv.appendChild(button);
                playerCount++;
            }
        }
    }

    // 포지션 옆에 선수 인원수 표시
    positionTitle.textContent = `${selectedPosition.toUpperCase()} (${positionDiv.children.length})`;

    // 선수 생성 후 텍스트박스를 비우기
    document.getElementById('playerList').value = '';
});

function isPlayerAlreadyAdded(playerName, positionDiv) {
    const existingPlayers = [...positionDiv.getElementsByTagName('button')];
    return existingPlayers.some(button => button.textContent === playerName);
}

// 감독 추가 버튼 클릭 이벤트
document.getElementById('addManagerBtn').addEventListener('click', function() {
    const managerName = document.getElementById('managerNameInput').value.trim();
    if (managerName === '') {
        alert('감독 이름을 입력하세요');
        return;
    }

    const managersContainer = document.getElementById('managersContainer');
    
    // 감독과 선수 명단을 담을 컨테이너 생성
    const managerUnit = document.createElement('div');
    managerUnit.classList.add('managerUnit');

    // 감독 이미지 또는 버튼 생성
    const managerButton = document.createElement('div');
    managerButton.setAttribute('data-manager', managerName); // 감독 ID 설정

    if (streamerImages[managerName]) {
        const img = document.createElement('img');
        img.src = streamerImages[managerName];
        img.alt = managerName;
        img.classList.add('manager-image');
        managerButton.appendChild(img);
    } else {
        managerButton.textContent = managerName;
        managerButton.classList.add('managerBtn');
    }

    managerButton.classList.add('managerItem');
    managerButton.addEventListener('click', function() {
        selectManager(managerButton);
    });

    // 감독의 선수 목록 생성
    const playerList = document.createElement('ul');
    playerList.id = `${managerName}List`;
    playerList.classList.add('managerList');

    // 감독과 선수 명단을 managerUnit에 추가
    managerUnit.appendChild(managerButton);
    managerUnit.appendChild(playerList);

    // 최종적으로 managerUnit을 managersContainer에 추가
    managersContainer.appendChild(managerUnit);

    document.getElementById('managerNameInput').value = '';  // 입력란 초기화
});

function selectManager(managerButton) {
    const managerButtons = document.querySelectorAll('.managerItem');
    managerButtons.forEach(button => button.classList.remove('manager-selected'));
    managerButton.classList.add('manager-selected');
    currentManager = managerButton.getAttribute('data-manager'); // 감독 ID를 currentManager에 저장
}

// 감독의 선수 목록에 선수를 추가하는 함수 (포지션 순서대로 정렬)
function addPlayerToManager(playerName, position) {
    if (!currentManager) {
        alert('먼저 감독을 선택하세요.');
        return;
    }

    const playerList = document.getElementById(`${currentManager}List`);

    // 선수 항목을 생성하고 포지션이 여러 개일 경우 각각의 포지션에 따른 색상 지정
    const positions = position.split(" / "); // 포지션을 슬래시(/)로 분할
    let playerText = playerName + " "; // 선수 이름

    // 각 포지션에 따라 색상 부여
    positions.forEach((pos, index) => {
        const color = getPositionColor(pos); // 포지션에 맞는 색상 가져오기
        playerText += `<span style="color:${color}">${pos.toUpperCase()}</span>`;
        if (index < positions.length - 1) {
            playerText += " / "; // 포지션 구분자
        }
    });

    const listItem = document.createElement('li');
    listItem.innerHTML = playerText;
    listItem.classList.add('playerInTeam');

    // 선택한 선수가 이미 감독의 명단에 있는지 확인 (중복 방지)
    const existingPlayers = [...playerList.getElementsByTagName('li')];
    if (existingPlayers.some(player => player.innerHTML.includes(playerName))) {
        alert('이미 추가된 선수입니다.');
        return; // 이미 추가된 선수라면 함수 종료
    }

    // 선수 추가 전에 포지션 순서에 따라 적절한 위치에 추가
    let inserted = false;
    for (let i = 0; i < playerList.children.length; i++) {
        const currentItem = playerList.children[i];
        const currentPosition = currentItem.innerHTML.match(/([A-Z]{2,3})/g); // 현재 항목의 포지션 추출
        const currentPosIndex = positionOrder.indexOf(currentPosition[0]); // 현재 항목 포지션의 인덱스
        const newPosIndex = positionOrder.indexOf(positions[0]); // 새로 추가될 항목의 첫 번째 포지션 인덱스

        // 새 포지션이 현재 항목 포지션보다 앞에 위치할 경우 해당 위치에 삽입
        if (newPosIndex < currentPosIndex) {
            playerList.insertBefore(listItem, currentItem);
            inserted = true;
            break;
        }
    }

    // 삽입되지 않았을 경우 목록 끝에 추가
    if (!inserted) {
        playerList.appendChild(listItem);
    }

    selectedPlayers.add(playerName);  // 선택된 선수로 추가
}
// 포지션에 따른 색상 결정 함수 (기존)
function getPositionColor(position) {
    switch (position.toUpperCase()) {
        case 'ST':
        case 'WF':
            return 'red';    // ST, WF는 빨강
        case 'CM':
        case 'CDM':
            return 'green';  // CM, CDM은 초록
        case 'FB':           // FB와 함께 WB도 파란색으로 설정
        case 'CB':
        case 'WB':
            return 'blue';   // WB, FB, CB는 파랑
        case 'GK':
            return 'gray';   // GK는 회색
        default:
            return 'black';  // 기본 값 (기타 포지션)
    }
}

function deselectPlayer(playerName, playerButton) {
    const playerList = document.getElementById(`${currentManager}List`);
    const playerItems = [...playerList.children];

    // 팀 명단에서 해당 선수를 제거
    const playerToRemove = playerItems.find(item => item.textContent.startsWith(playerName));
    if (playerToRemove) {
        playerList.removeChild(playerToRemove);
        selectedPlayers.delete(playerName);  // 선택 목록에서 제거
        unmarkPlayer(playerButton);  // 선택 취소 표시
    }
}

function markPlayerAsSelected(playerButton) {
    const playerName = playerButton.textContent;
    
    // 현재 포지션에서 선택된 선수 표시
    playerButton.style.backgroundColor = '#d9534f';  // 빨간색으로 표시
    playerButton.style.color = 'white';

    // 다른 포지션에서도 동일한 선수 버튼 찾기
    document.querySelectorAll('.playerBtn').forEach(button => {
        if (button.textContent === playerName) {
            button.style.backgroundColor = '#d9534f';  // 다른 포지션에서도 빨간색으로 표시
            button.style.color = 'white';
        }
    });
}

function unmarkPlayer(playerButton) {
    const playerName = playerButton.textContent;

    // 현재 포지션에서 선택 취소
    playerButton.style.backgroundColor = '';  // 원래 색상으로 복원
    playerButton.style.color = '';

    // 다른 포지션에서도 동일한 선수 버튼의 선택 취소
    document.querySelectorAll('.playerBtn').forEach(button => {
        if (button.textContent === playerName) {
            button.style.backgroundColor = '';  // 원래 색상으로 복원
            button.style.color = '';
        }
    });
}

// 감독 및 팀 리셋
document.getElementById('resetManagersBtn').addEventListener('click', function() {
    document.getElementById('managersContainer').innerHTML = '';  // 감독과 팀 목록 초기화
    currentManager = null;
    selectedPlayers.clear();  // 선택된 선수 목록도 초기화
    const playerButtons = document.querySelectorAll('.playerBtn');
    playerButtons.forEach(button => {
        button.style.backgroundColor = '';  // 버튼 색상 초기화
        button.style.color = '';
    });
});

// 선수 목록 리셋
document.getElementById('resetPlayersBtn').addEventListener('click', function() {
    const positions = ['ST', 'WF', 'CM', 'CDM', 'WB', 'CB', 'GK'];
    positions.forEach(position => {
        document.getElementById(position).innerHTML = '';  // 각 포지션별 선수 목록 초기화
        document.querySelector(`h3[data-position="${position}"]`).textContent = `${position.toUpperCase()} (0)`; // 인원수 초기화
    });
    selectedPlayers.clear();  // 선택된 선수 목록도 초기화
});

// 포지션별 초기화 버튼 클릭 이벤트 처리
document.querySelectorAll('.resetPositionBtn').forEach(button => {
    button.addEventListener('click', function() {
        const position = button.getAttribute('data-position');
        const positionDiv = document.getElementById(position);
        positionDiv.innerHTML = ''; // 해당 포지션 선수 목록 초기화
        document.querySelector(`h3[data-position="${position}"]`).textContent = `${position.toUpperCase()} (0)`; // 선수 인원수 업데이트
    });
});

// 감독 랜덤 선택 버튼 클릭 이벤트
document.getElementById('randomManagerBtn').addEventListener('click', function() {
    const managerButtons = document.querySelectorAll('.managerItem');
    if (managerButtons.length === 0) {
        alert('감독이 추가되지 않았습니다.');
        return;
    }
    
    // 랜덤으로 감독 선택
    const randomIndex = Math.floor(Math.random() * managerButtons.length);
    const randomManager = managerButtons[randomIndex];

    // 기존 선택된 감독 초기화
    managerButtons.forEach(button => button.classList.remove('manager-selected'));
    
    // 랜덤으로 선택된 감독을 선택 표시
    randomManager.classList.add('manager-selected');
    currentManager = randomManager.getAttribute('data-manager'); // 선택된 감독 설정
});

document.getElementById('showAllPlayersBtn').addEventListener('click', function() {
    const allPlayersContainer = document.getElementById('allPlayersContainer');
    const positionsContainer = document.getElementById('positionsContainer');
    const searchContainer = document.getElementById('searchContainer'); // 검색 컨테이너
    const showAllPlayersBtn = document.getElementById('showAllPlayersBtn');

    // 모든 선수들 보기 버튼을 클릭하면 기존 생성된 목록 숨기고 새로운 목록 표시
    if (allPlayersContainer.style.display === "none" || allPlayersContainer.style.display === "") {
        positionsContainer.style.display = "none"; // 기존 포지션별 목록 숨기기
        allPlayersContainer.style.display = "flex"; // 모든 선수들 표시
        searchContainer.style.display = "block"; // 검색창과 포지션 필터 버튼 보이기
        showAllPlayersBtn.style.backgroundColor = "#c9302c"; // 버튼 색깔을 빨간색으로 변경

        allPlayersContainer.innerHTML = ''; // 기존 목록 초기화

        // 선수 데이터베이스에 있는 선수들을 [이름 포지션] 형식으로 표시
        playerDatabase.forEach(player => createPlayerButton(player, allPlayersContainer));
    } else {
        // 다시 누르면 기존 화면 복원
        positionsContainer.style.display = "grid"; // 기존 3분할 그리드 레이아웃으로 복원
        allPlayersContainer.style.display = "none"; // 모든 선수들 목록 숨기기
        searchContainer.style.display = "none"; // 검색창과 포지션 필터 버튼 숨기기
        showAllPlayersBtn.style.backgroundColor = ""; // 버튼 색깔을 원래대로 (초기화)
    }
});
// 선수 버튼 생성 함수
function createPlayerButton(player, container) {
    const playerButton = document.createElement('button');
    const positions = player.position.split(" / "); // 포지션을 구분하여 처리
    let playerText = player.name + " "; // 선수 이름

    // 각 포지션에 따라 색상 부여
    positions.forEach((position, index) => {
        const color = getPositionColor(position);
        playerText += `<span style="color:${color}">${position}</span>`;
        if (index < positions.length - 1) {
            playerText += " / "; // 포지션 사이에 슬래시 추가
        }
    });

    playerButton.innerHTML = playerText; // 선수 이름과 포지션을 버튼에 추가
    playerButton.classList.add('playerBtn');

    // 이미 선택된 선수인 경우 색상 표시
    if (selectedPlayers.has(player.name)) {
        markPlayerAsSelected(playerButton);
    }

    // 클릭 이벤트 추가: 선수 선택/해제 가능
    playerButton.addEventListener('click', function() {
        if (selectedPlayers.has(player.name)) {
            deselectPlayer(player.name, playerButton);
        } else {
            addPlayerToManager(player.name, player.position);
            markPlayerAsSelected(playerButton);
        }
    });

    container.appendChild(playerButton);
}

// 검색창에서 입력할 때마다 필터링하는 기능 (기존)
document.getElementById('searchInput').addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    const allPlayersContainer = document.getElementById('allPlayersContainer');
    
    // 전체 컨테이너 비우기
    allPlayersContainer.innerHTML = '';

    // 선수 데이터베이스에서 검색어에 해당하는 선수들만 표시
    playerDatabase.filter(player => player.name.toLowerCase().includes(searchTerm))
        .forEach(player => createPlayerButton(player, allPlayersContainer));
});

// 포지션에 따른 색상 결정 함수
function getPositionColor(position) {
    switch (position.toUpperCase()) {
        case 'ST':
        case 'WF':
        case 'LF':
        case 'RW':
        case 'LW':
            return 'red';    // ST, WF, LF, RW, LW는 빨강
        case 'CM':
        case 'CAM':
        case 'CDM':
            return 'green';  // CM, CAM, CDM은 초록
        case 'FB':
        case 'CB':
        case 'LB':
        case 'RB':
        case 'WB':
            return 'blue';   // FB, CB, LB, RB는 파랑
        case 'GK':
            return 'gray';   // GK는 회색
        default:
            return 'black';  // 기본 값
    }
}

// 포지션 필터 버튼 클릭 이벤트 처리
document.querySelectorAll('.positionFilterBtn').forEach(button => {
    button.addEventListener('click', function() {
        const position = button.getAttribute('data-position');
        
        // 모든 포지션 버튼의 활성화 상태를 해제
        document.querySelectorAll('.positionFilterBtn').forEach(btn => {
            btn.classList.remove('active');
        });

        // 클릭된 버튼 활성화
        button.classList.add('active');

        if (position === 'ALL') {
            // 전체 선수 보기
            showAllPlayers();
        } else {
            // 특정 포지션 선수만 필터링
            filterPlayersByPosition(position);
        }
    });
});

// 포지션별로 선수 필터링 함수
function filterPlayersByPosition(position) {
    const allPlayersContainer = document.getElementById('allPlayersContainer');
    allPlayersContainer.innerHTML = ''; // 기존 목록 초기화

    // 해당 포지션에 맞는 선수들만 필터링하여 표시
    playerDatabase.filter(player => player.position.includes(position))
        .forEach(player => createPlayerButton(player, allPlayersContainer));
}


// 모든 선수 보기 함수
function showAllPlayers() {
    const allPlayersContainer = document.getElementById('allPlayersContainer');
    allPlayersContainer.innerHTML = ''; // 기존 목록 초기화

    // 전체 선수 목록 표시
    playerDatabase.forEach(player => createPlayerButton(player, allPlayersContainer));
}