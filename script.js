let currentManager = null;
const selectedPlayers = new Set();  // 이미 선택된 선수를 추적하는 Set

// 선수 생성 버튼 클릭 이벤트
document.getElementById('generateBtn').addEventListener('click', function() {
    const playerList = document.getElementById('playerList').value.split('\n');
    const selectedPosition = document.getElementById('positionSelect').value;
    const positionDiv = document.getElementById(selectedPosition);

    // 홀수 번째 선수만 처리하고 기존 선수는 유지
    for (let i = 0; i < playerList.length; i++) {
        if (i % 2 === 0) {  // 0부터 시작하므로 홀수 번째 선수는 짝수 인덱스
            const playerName = playerList[i].trim();
            if (playerName && !isPlayerAlreadyAdded(playerName, positionDiv)) {
                const button = document.createElement('button');
                button.textContent = playerName;
                button.classList.add('playerBtn');
                button.addEventListener('click', function() {
                    if (selectedPlayers.has(playerName)) {
                        alert(`${playerName} 선수는 이미 선택되었습니다.`);
                    } else if (currentManager) {
                        addPlayerToManager(playerName);
                        markPlayerAsSelected(this);  // 선택된 선수로 표시
                    } else {
                        alert('먼저 감독을 선택하세요.');
                    }
                });
                positionDiv.appendChild(button);
            }
        }
    }
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

function addPlayerToManager(playerName) {
    const playerList = document.getElementById(`${currentManager}List`);
    const listItem = document.createElement('li');
    listItem.textContent = playerName;
    playerList.appendChild(listItem);
    selectedPlayers.add(playerName);  // 선택된 선수로 추가
}

function markPlayerAsSelected(playerButton) {
    playerButton.style.backgroundColor = '#d9534f';  // 빨간색으로 표시
    playerButton.style.color = 'white';
    playerButton.disabled = true;  // 더 이상 선택할 수 없게 비활성화
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
        button.disabled = false;  // 다시 선택할 수 있게 활성화
    });
});

// 선수 목록 리셋
document.getElementById('resetPlayersBtn').addEventListener('click', function() {
    const positions = ['ST', 'WF', 'CM', 'CDM', 'WB', 'CB', 'GK'];
    positions.forEach(position => {
        document.getElementById(position).innerHTML = '';  // 각 포지션별 선수 목록 초기화
    });
    selectedPlayers.clear();  // 선택된 선수 목록도 초기화
});
