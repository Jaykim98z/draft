let currentManager = null;
const selectedPlayers = new Set();  // 이미 선택된 선수를 추적하는 Set

// 포지션 순서를 유지하기 위한 배열
const positionOrder = ['ST', 'WF', 'CM', 'CDM', 'WB', 'CB', 'GK'];

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
    const managerId = managerName;

    // 감독 버튼 생성
    const managerButton = document.createElement('button');
    managerButton.textContent = managerId;
    managerButton.classList.add('managerBtn');
    managerButton.addEventListener('click', function() {
        selectManager(managerButton);
    });

    // 감독의 선수 목록 생성
    const playerList = document.createElement('ul');
    playerList.id = `${managerId}List`;
    playerList.classList.add('managerList');

    managersContainer.appendChild(managerButton);
    managersContainer.appendChild(playerList);

    document.getElementById('managerNameInput').value = '';  // 입력란 초기화
});

function selectManager(managerButton) {
    const managerButtons = document.querySelectorAll('.managerBtn');
    managerButtons.forEach(button => button.classList.remove('manager-selected'));
    managerButton.classList.add('manager-selected');
    currentManager = managerButton.textContent;
}

function addPlayerToManager(playerName, position) {
    const playerList = document.getElementById(`${currentManager}List`);

    // 선수 항목을 생성하고 포지션에 따른 색상을 지정
    let positionColor = getPositionColor(position);
    const listItem = document.createElement('li');
    listItem.innerHTML = `${playerName} <span style="color:${positionColor};">${position.toUpperCase()}</span>`;
    listItem.classList.add('playerInTeam');

    // 적절한 위치에 선수 추가
    let inserted = false;
    const items = playerList.getElementsByTagName('li');
    for (let i = 0; i < items.length; i++) {
        const currentPos = items[i].innerHTML.match(/<span style="color:.*?;">(.*?)<\/span>/)[1];
        if (positionOrder.indexOf(position) < positionOrder.indexOf(currentPos)) {
            playerList.insertBefore(listItem, items[i]);
            inserted = true;
            break;
        }
    }
    if (!inserted) {
        playerList.appendChild(listItem);
    }

    selectedPlayers.add(playerName);  // 선택된 선수로 추가
}

// 포지션에 따른 색상 결정 함수
function getPositionColor(position) {
    switch (position) {
        case 'ST':
        case 'WF':
            return 'red';    // ST, WF는 빨강
        case 'CM':
        case 'CDM':
            return 'green';  // CM, CDM은 초록
        case 'WB':
        case 'CB':
            return 'blue';   // WB, CB는 파랑
        case 'GK':
            return 'gray'; // GK는 회색
        default:
            return 'black';  // 기본 값
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
    playerButton.style.backgroundColor = '#d9534f';  // 빨간색으로 표시
    playerButton.style.color = 'white';
}

function unmarkPlayer(playerButton) {
    playerButton.style.backgroundColor = '';  // 원래 색상으로 복원
    playerButton.style.color = '';
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
