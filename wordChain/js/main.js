const participantWrapper = document.querySelector('.participants');
const enterButton = document.querySelectorAll('.btn');
const startButton = document.querySelector('.btn-start');
const restartButton = document.querySelector('.btn-restart');
const currentWord = document.querySelector('.current-word');

let titleWord = '';
let enteringWord = '';

const startGame = () => {
  const participant = parseInt(prompt('몇 명이 참가하나요?'), 6);

  if (participant > 5) {
    alert('참가자는 5명까지 가능합니다.');
    startButton.classList.toggle('on');
    return;
  }

  for (let i = participant; i > 0; i--) {
    const newParticipant = `<div class="participant" data-id=${i}>
        <label for="prtc${i}">참가자${i}</label>
        <div class="form-wrapper">
          <input class="form-control" id="prtc${i}" type="text" placeholder="단어 입력" aria-label="참가자${i} 단어 입력" />
          <button type="button" class="btn btn-primary">입력</button>
        </div>
      </div>`;

    participantWrapper.insertAdjacentHTML('afterbegin', newParticipant);
  }
};

participantWrapper.addEventListener('keyup', (e) => {
  const input = e.target.closest('input');

  if (e.target !== input) {
    return;
  }

  const value = input.value.trim();
  enteringWord = value;
});

participantWrapper.addEventListener('click', (e) => {
  const target = e.target.closest('.participant');
  const btn = e.target.closest('button');

  if (e.target !== btn) return;

  const input = btn.previousElementSibling;

  try {
    if (target.dataset.id !== '1' && !checkUpperPrtcIsDone(e)) {
      input.value = '';
      throw new Error('상위 참가자가 먼저 입력해야 해요!');
    }

    if (!isValidWord(e)) return;

    if (input.hasAttribute('disabled')) throw new Error('이미 작성한 것은 수정 불가능해요!');

    if (!isCorrect(e)) return;
  } catch (error) {
    alert(error);
  }
});

startButton.addEventListener('click', () => {
  startGame();
  startButton.classList.toggle('on');
});

restartButton.addEventListener('click', () => {
  location.reload();
});

const setCurrentWord = (word) => {
  titleWord = word;
  currentWord.innerText = word;
};

const isKorean = (word) => {
  const regex = /^[ㄱ-ㅎ|ㄱ가-힣]+$/;
  return regex.test(word);
};

const isValidWord = (e) => {
  const btn = e.target.closest('button');
  const input = btn.previousElementSibling;

  if (enteringWord.length < 1) {
    alert('두 글자 이상 입력해주세요!');
    input.focus();
    return false;
  }

  if (!isKorean(enteringWord)) {
    alert('한글로만 입력해주세요!');
    input.value = '';
    input.focus();
    return false;
  }

  return true;
};

const checkWord = (prevWord, currWord) => {
  const prevChar = prevWord.substr(prevWord.length - 1, 1);
  const currChar = currWord.substr(0, 1);

  return prevChar === currChar;
};

const isCorrect = (e) => {
  const participant = e.target.closest('.participant');
  const btn = e.target.closest('button');
  const input = btn.previousElementSibling;

  let isCorrect = false;

  if (titleWord !== '') {
    isCorrect = checkWord(titleWord, enteringWord);
  } else {
    isCorrect = true;
  }

  if (isCorrect) {
    setCurrentWord(enteringWord);
    input.setAttribute('disabled', '');
    input.setAttribute('readonly', '');
    participant.dataset.isDone = 'done';
  } else {
    alert('끝말을 이어주세요!');
    input.value = '';
    input.focus();
  }
};

const checkUpperPrtcIsDone = (e) => {
  const target = e.target.closest('.participant');
  const participants = document.querySelectorAll('.participant');
  const targetId = parseInt(target.dataset.id);

  for (let i = 0; i <= targetId; i++) {
    if (!participants[i].dataset.dataIsDone) {
      return false;
    }
  }

  return false;
};

startGame();
