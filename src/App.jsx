import React, { useState, useEffect } from 'react';
import { Book, Home, BarChart3, Trophy, Settings, Play, Plus, Trash2, Star, Heart, Target, Bell, User, Clock, CheckCircle, XCircle, Volume2 } from 'lucide-react';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [userStats, setUserStats] = useState({
    totalAnswers: 0,
    correctAnswers: 0,
    studyDays: 0
  });
  const [examHistory, setExamHistory] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [examTime, setExamTime] = useState(0);
  const [examResult, setExamResult] = useState(null);

  // 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const savedStats = localStorage.getItem('userStats');
    const savedHistory = localStorage.getItem('examHistory');
    
    if (savedStats) {
      setUserStats(JSON.parse(savedStats));
    }
    if (savedHistory) {
      setExamHistory(JSON.parse(savedHistory));
    }
  }, []);

  // 데이터를 로컬 스토리지에 저장
  const saveData = (newStats, newHistory) => {
    localStorage.setItem('userStats', JSON.stringify(newStats));
    localStorage.setItem('examHistory', JSON.stringify(newHistory));
  };

  useEffect(() => {
    saveData(userStats, examHistory);
  }, [userStats, examHistory]);

  // 한국사검정시험 고난도 문제 데이터
  const [examQuestions] = useState({
    '선사시대': [
      {
        id: 1,
        question: '다음은 구석기 시대의 생활 유적지에서 발견된 자료이다.\n\n"이 유적에서는 여러 개의 뗀석기 도구와 함께 사냥한 동물의 뼈, 그리고 불을 사용한 흔적이 발견되었다. 특히 사냥 도구의 형태가 다양하며, 집단적으로 생활했던 흔적도 보인다."\n\n이 자료를 통해 유추할 수 있는 구석기 시대의 사회적 특징으로 가장 적절한 것은?',
        options: [
          '정착 생활을 기반으로 한 농경 사회가 형성되었다',
          '계급 분화가 심화되어 지배층이 등장하기 시작하였다',
          '무리를 지어 이동하며 수렵 채집 경제를 영위하였다',
          '금속 도구의 사용으로 생산력이 크게 향상되었다'
        ],
        answer: '무리를 지어 이동하며 수렵 채집 경제를 영위하였다',
        explanation: '뗀석기 사용, 사냥한 동물의 뼈, 불 사용 흔적, 집단 생활 흔적은 구석기 시대의 이동식 수렵 채집 사회를 보여줍니다.'
      },
      {
        id: 2,
        question: '다음은 신석기 시대의 유물에 대한 설명이다.\n\n"빗살무늬 토기는 신석기 시대를 대표하는 유물로, 주로 음식물을 저장하거나 조리하는 데 사용되었다. 이 토기가 발견되는 유적지에서는 농경의 흔적과 함께 간석기도 출토된다."\n\n이 유물을 통해 알 수 있는 신석기 시대의 경제생활 변화로 가장 적절한 것은?',
        options: [
          '화폐를 사용하여 교역이 활발해졌다',
          '철제 농기구의 보급으로 생산량이 급증하였다',
          '농경과 목축의 시작으로 정착 생활이 이루어졌다',
          '어업 기술의 발달로 해상 무역이 주를 이루었다'
        ],
        answer: '농경과 목축의 시작으로 정착 생활이 이루어졌다',
        explanation: '빗살무늬 토기는 음식물 저장과 조리에 사용되었으며, 농경의 흔적과 함께 출토되는 것은 신석기 시대의 농경 시작과 정착 생활을 보여줍니다.'
      },
      {
        id: 3,
        question: '다음은 청동기 시대 유적지에서 발견된 \'반달 돌칼\'에 대한 자료이다.\n\n"반달 돌칼은 주로 벼 이삭을 자르거나 곡식을 수확하는 데 사용된 농기구이다. 이 도구가 발견되는 유적지에서는 대규모의 마을 유적과 함께 고인돌이 출토되는 경우가 많다."\n\n이 자료를 통해 추론할 수 있는 청동기 시대의 사회 변화로 옳은 것은?',
        options: [
          '평등한 사회가 해체되고 계급 사회가 발생하였다',
          '전문적인 직업 분화가 시작되어 상업이 발달하였다',
          '도구의 발달로 공동체적 생산과 분배가 이루어졌다',
          '정치적 지배자의 권위가 약화되고 개인의 자유가 확대되었다'
        ],
        answer: '평등한 사회가 해체되고 계급 사회가 발생하였다',
        explanation: '반달 돌칼은 벼농사를 통해 생산력이 증대되었음을 보여주며, 이는 사유 재산의 발생과 계급 분화, 즉 평등 사회의 해체로 이어졌습니다. 고인돌은 지배층의 등장을 나타냅니다.'
      },
      {
        id: 4,
        question: '구석기 시대와 신석기 시대의 가장 큰 차이점을 올바르게 설명한 것은?',
        options: [
          '구석기 시대는 철기, 신석기 시대는 청동기를 사용하였다',
          '구석기 시대는 농경을, 신석기 시대는 수렵 채집을 위주로 하였다',
          '구석기 시대는 이동 생활을, 신석기 시대는 정착 생활을 하였다',
          '구석기 시대는 부족 사회를, 신석기 시대는 국가를 형성하였다'
        ],
        answer: '구석기 시대는 이동 생활을, 신석기 시대는 정착 생활을 하였다',
        explanation: '구석기 시대는 뗀석기를 사용하며 이동 생활을 했고, 신석기 시대는 간석기와 토기를 사용하며 농경을 시작하여 정착 생활을 했습니다.'
      },
      {
        id: 5,
        question: '다음 설명에 해당하는 선사 시대 유물은?\n\n"주로 큰 돌을 이용하여 만든 거대한 무덤으로, 지배자의 권력과 경제력을 상징한다. 한반도 전역에 분포하며, 특히 북방식과 남방식으로 구분된다. 내부에서는 비파형 동검, 민무늬 토기 등 청동기 시대 유물이 함께 발견되기도 한다."',
        options: [
          '주먹도끼', '빗살무늬 토기', '고인돌', '돌널무덤'
        ],
        answer: '고인돌',
        explanation: '고인돌은 청동기 시대 지배층의 무덤으로, 크기와 형태에 따라 북방식과 남방식으로 나뉘며, 권력과 경제력을 상징합니다.'
      },
      {
        id: 6,
        question: '신석기 시대 사람들이 주로 어업을 통해 식량을 확보했음을 보여주는 유물은?',
        options: [
          '뼈바늘', '갈돌과 갈판', '그물추', '돌괭이'
        ],
        answer: '그물추',
        explanation: '그물추는 신석기 시대 어업 활동이 활발했음을 알려주는 대표적인 유물입니다.'
      },
      {
        id: 7,
        question: '다음 중 청동기 시대에 나타난 사회적 특징이 아닌 것은?',
        options: [
          '사유 재산 제도의 발생',
          '계급의 분화 심화',
          '정치적 지배자의 등장',
          '부족 간의 평등한 관계 유지'
        ],
        answer: '부족 간의 평등한 관계 유지',
        explanation: '청동기 시대는 생산력의 증가로 사유 재산과 계급이 발생하고, 지배층이 등장하면서 부족 간의 평등 관계가 해체되는 시기입니다.'
      },
      {
        id: 8,
        question: '구석기 시대의 예술 활동을 보여주는 대표적인 사례는?',
        options: [
          '바위그림', '동굴 벽화', '청동기 거푸집', '패총'
        ],
        answer: '동굴 벽화',
        explanation: '구석기 시대에는 프랑스의 라스코 동굴, 스페인의 알타미라 동굴 등에서 동물 그림 위주의 동굴 벽화가 많이 발견됩니다.'
      },
      {
        id: 9,
        question: '신석기 시대의 애니미즘 사상과 관련된 유물은?',
        options: [
          '치레걸이', '조개껍데기 가면', '농경 도구', '뼈도구'
        ],
        answer: '조개껍데기 가면',
        explanation: '조개껍데기 가면은 신석기 시대 사람들이 영혼이나 자연물에 영적 존재가 있다고 믿었던 애니미즘 사상을 보여주는 대표적인 유물입니다.'
      },
      {
        id: 10,
        question: '선사 시대의 도구 발달 순서로 옳은 것은?',
        options: [
          '간석기 → 뗀석기 → 철기 → 청동기',
          '뗀석기 → 간석기 → 청동기 → 철기',
          '청동기 → 철기 → 뗀석기 → 간석기',
          '철기 → 청동기 → 간석기 → 뗀석기'
        ],
        answer: '뗀석기 → 간석기 → 청동기 → 철기',
        explanation: '도구의 발달은 구석기 시대의 뗀석기, 신석기 시대의 간석기, 청동기 시대의 청동기, 철기 시대의 철기 순으로 진행되었습니다.'
      }
    ],
    '고조선': [
      {
        id: 11,
        question: '고조선의 8조법 중 가장 먼저 등장한 내용은?',
        options: [
          '도둑질하면 노비로 삼는다', '사람을 죽이면 사형에 처한다', '남의 곡식을 훔치면 12배로 갚는다', '거짓말을 하면 귀를 자른다'
        ],
        answer: '도둑질하면 노비로 삼는다',
        explanation: '고조선의 8조법 중 가장 먼저 등장한 것은 도둑질에 대한 엄격한 처벌입니다.'
      },
      {
        id: 12,
        question: '단군 신화에서 환웅이 내려온 곳은?',
        options: [
          '백두산', '태백산', '금강산', '지리산'
        ],
        answer: '태백산',
        explanation: '단군 신화에 따르면 환웅은 태백산(지금의 백두산)으로 내려왔다고 전해집니다.'
      },
      {
        id: 13,
        question: '다음은 위만 조선의 성립 과정에 대한 설명이다.\n\n"위만은 원래 중국에서 이주해 온 인물로, 고조선으로 망명하여 준왕에게 신임을 얻었다. 이후 세력을 확장하여 준왕을 몰아내고 왕위를 차지하였다. 위만 조선은 철기 문화를 적극적으로 수용하여 국가를 발전시켰다."\n\n이 자료를 통해 알 수 있는 위만 조선의 특징으로 가장 적절한 것은?',
        options: [
          '고조선의 전통적인 정치 체제를 계승하였다',
          '중국과의 교류를 완전히 차단하고 독자 노선을 추구하였다',
          '철기 문화를 본격적으로 수용하고 중계 무역을 통해 성장하였다',
          '내부적인 갈등 없이 평화적으로 국가를 운영하였다'
        ],
        answer: '철기 문화를 본격적으로 수용하고 중계 무역을 통해 성장하였다',
        explanation: '위만 조선은 철기 문화를 본격적으로 수용하며 군사력을 강화하고, 중국과 한반도 남부 사이의 중계 무역을 통해 경제적 이익을 얻으며 성장했습니다.'
      },
      {
        id: 14,
        question: '고조선 멸망에 결정적인 영향을 미친 국가는?',
        options: [
          '한나라', '진나라', '흉노', '동예'
        ],
        answer: '한나라',
        explanation: '고조선은 기원전 108년 한 무제의 침략으로 멸망하였습니다.'
      },
      {
        id: 15,
        question: '고조선의 사회 모습을 엿볼 수 있는 \'8조법\'의 내용으로 옳지 않은 것은?',
        options: [
          '사람을 죽인 자는 즉시 사형에 처한다.',
          '남의 물건을 훔친 자는 노비로 삼는다.',
          '남에게 상해를 입힌 자는 곡식으로 갚는다.',
          '남녀 간의 정절을 어긴 자는 사형에 처한다.'
        ],
        answer: '남녀 간의 정절을 어긴 자는 사형에 처한다.',
        explanation: '고조선의 8조법은 살인, 절도, 상해에 대한 내용만 전해지고 있으며, 남녀 간의 정절에 대한 조항은 기록되어 있지 않습니다.'
      },
      {
        id: 16,
        question: '고조선 시대에 사용된 대표적인 청동 유물로, 중국 동북 지방과 한반도 북부 지역에서 주로 출토되는 것은?',
        options: [
          '세형 동검', '비파형 동검', '잔무늬 거울', '거친무늬 거울'
        ],
        answer: '비파형 동검',
        explanation: '비파형 동검은 고조선 시대의 대표적인 청동 유물로, 요령 지방과 한반도 북부에서 주로 발견되어 고조선의 세력 범위를 짐작하게 합니다.'
      },
      {
        id: 17,
        question: '단군왕검이 고조선을 건국한 배경으로 가장 적절한 것은?',
        options: [
          '철기 문화의 보급과 함께 강력한 군사력을 기반으로 하였다',
          '농경 사회의 발달과 함께 부족 연맹을 통합하는 과정에서 건국되었다',
          '중국과의 무역을 통해 경제적 기반을 마련하고 국가를 형성하였다',
          '외세의 침략에 맞서기 위해 중앙 집권적 국가 체제를 구축하였다'
        ],
        answer: '농경 사회의 발달과 함께 부족 연맹을 통합하는 과정에서 건국되었다',
        explanation: '단군 신화는 농경 사회의 발달과 함께 여러 부족들을 통합하여 고조선을 건국하는 과정을 반영하고 있습니다.'
      },
      {
        id: 18,
        question: '고조선이 성장하면서 이웃 국가와 갈등을 겪은 대표적인 사례는?',
        options: [
          '고구려와의 대립', '백제와의 전쟁', '한나라와의 대립', '신라와의 마찰'
        ],
        answer: '한나라와의 대립',
        explanation: '고조선은 한나라와 중계 무역 문제로 갈등을 겪었으며, 결국 한나라의 침략으로 멸망하게 됩니다.'
      },
      {
        id: 19,
        question: '다음은 고조선 시대의 종교적 특징을 보여주는 내용이다.\n\n"단군 신화에는 하늘에서 내려온 환웅이 웅녀와 결혼하여 단군왕검을 낳았다는 이야기가 전해진다. 이는 당시 사람들이 하늘과 동물, 그리고 자연물에 대한 경외심을 가지고 있었음을 보여준다."\n\n이 자료를 통해 유추할 수 있는 고조선 사회의 사상적 특징은?',
        options: [
          '유교 사상이 지배적이었다',
          '불교가 널리 확산되었다',
          '선민사상과 토테미즘이 결합된 사상이었다',
          '도교 사상이 정치에 큰 영향을 미쳤다'
        ],
        answer: '선민사상과 토테미즘이 결합된 사상이었다',
        explanation: '단군 신화의 환웅(하늘 자손)은 선민사상을, 곰(웅녀)은 토테미즘을 나타내며, 이는 고조선 사회의 독특한 사상적 특징입니다.'
      },
      {
        id: 20,
        question: '고조선이 철기 문화를 수용하면서 나타난 변화로 옳지 않은 것은?',
        options: [
          '농업 생산력의 증대',
          '무기의 발달과 정복 활동의 활성화',
          '국가 체제의 강화',
          '평등 사회의 유지 및 발전'
        ],
        answer: '평등 사회의 유지 및 발전',
        explanation: '철기 문화의 보급은 생산력 증대와 함께 사유 재산 및 계급 분화를 촉진하여, 기존의 평등 사회가 해체되고 국가 체제가 강화되는 결과를 가져왔습니다.'
      }
    ],
    '삼국시대': [
      {
        id: 31,
        question: '고구려의 광개토대왕이 한 업적은?',
        options: [
          '신라를 통일하였다', '만주와 한반도 북부까지 영토를 확장하였다', '백제를 멸망시켰다', '불교를 공인하였다'
        ],
        answer: '만주와 한반도 북부까지 영토를 확장하였다',
        explanation: '광개토대왕은 고구려의 전성기를 이끌며 영토를 크게 확장하였습니다.'
      },
      {
        id: 32,
        question: '백제의 무령왕릉에서 발견된 것은?',
        options: [
          '금관', '칠지도', '벽화', '청동거울'
        ],
        answer: '칠지도',
        explanation: '무령왕릉에서는 칠지도가 출토되어 백제와 왜의 교류를 보여줍니다.'
      },
      {
        id: 33,
        question: '신라 진흥왕의 업적으로 옳은 것은?',
        options: [
          '율령 반포 및 불교 공인',
          '화랑도를 국가 조직으로 개편하고 영토 확장',
          '삼국통일의 기틀 마련',
          '주변국과 외교 관계 수립'
        ],
        answer: '화랑도를 국가 조직으로 개편하고 영토 확장',
        explanation: '진흥왕은 화랑도를 국가 조직으로 개편하고 한강 유역을 차지하는 등 신라의 영토 확장에 큰 기여를 했습니다.'
      },
      {
        id: 34,
        question: '삼국 시대 백제 문화의 특징으로 가장 적절한 것은?',
        options: [
          '화려하고 섬세하며, 일본 문화에 큰 영향을 주었다.',
          '고구려의 영향을 받아 강력하고 웅장한 특징을 보였다.',
          '수수한 듯 정교하고, 불교 미술이 발달하였다.',
          '민중의 생활과 밀접한 실용적인 예술이 발달하였다.'
        ],
        answer: '화려하고 섬세하며, 일본 문화에 큰 영향을 주었다.',
        explanation: '백제는 섬세하고 우아한 예술 양식으로 유명하며, 일본 아스카 문화의 형성에 지대한 영향을 미쳤습니다.'
      },
      {
        id: 35,
        question: '고구려의 대외 정책으로 가장 적절한 것은?',
        options: [
          '중국과 조공-책봉 관계 유지하며 교류 증대',
          '신라와 연합하여 백제를 공격',
          '만주와 한반도 북부 지역으로 활발한 정복 활동',
          '일본과 친선 관계를 유지하며 선진 문물 수용'
        ],
        answer: '만주와 한반도 북부 지역으로 활발한 정복 활동',
        explanation: '고구려는 건국 초기부터 주변 민족을 정복하고 광대한 영토를 확보하며 만주와 한반도 북부 지역을 중심으로 활발한 정복 활동을 전개했습니다.'
      },
      {
        id: 36,
        question: '백제 성왕의 업적으로 옳은 것은?',
        options: [
          '사비 천도 및 국호 남부여로 변경',
          '고구려 평양성 공격',
          '웅진 천도',
          '대야성 함락'
        ],
        answer: '사비 천도 및 국호 남부여로 변경',
        explanation: '성왕은 웅진에서 사비로 천도하고 국호를 남부여로 변경하여 백제의 중흥을 꾀했습니다.'
      },
      {
        id: 37,
        question: '신라의 삼국통일 과정에서 당나라와 나·당 연합을 결성하게 된 배경은?',
        options: [
          '고구려와 백제의 연합 세력 견제 및 고구려 정벌 필요성',
          '신라의 내부적인 정치적 불안정 극복',
          '당나라의 적극적인 지원 요청',
          '일본의 한반도 진출 저지'
        ],
        answer: '고구려와 백제의 연합 세력 견제 및 고구려 정벌 필요성',
        explanation: '신라는 백제와 고구려의 협공에 대처하고, 고구려를 견제하기 위해 당나라와 연합하여 나·당 연합을 결성했습니다.'
      },
      {
        id: 38,
        question: '고구려의 5부 체제에서 계루부와 관련이 깊은 것은?',
        options: [
          '왕실',
          '군사',
          '행정',
          '무역'
        ],
        answer: '왕실',
        explanation: '고구려는 5부(계루부, 절노부, 순노부, 관노부, 소노부)로 구성되었으며, 특히 계루부는 고구려의 왕실을 담당하는 핵심적인 부였습니다.'
      },
      {
        id: 39,
        question: '삼국 시대 각국의 불교 수용 특징으로 옳지 않은 것은?',
        options: [
          '고구려는 왕실 중심의 불교 수용으로 왕권 강화에 기여했다.',
          '백제는 해외 교류를 통해 불교를 수용하여 일본에 전파했다.',
          '신라는 불교를 수용하는 과정에서 귀족들의 반대가 심했다.',
          '삼국 모두 불교를 백성들의 일상생활 속에 깊이 뿌리내리게 했다.'
        ],
        answer: '삼국 모두 불교를 백성들의 일상생활 속에 깊이 뿌리내리게 했다.',
        explanation: '삼국 시대에는 주로 왕실과 귀족층을 중심으로 불교가 수용되어 왕권 강화와 국가 통합에 기여했습니다.'
      },
      {
        id: 40,
        question: '다음 사료가 설명하는 삼국 시대의 유물은?\n\n"이 비석은 신라의 전성기를 보여주는 대표적인 유물로, 한강 유역을 차지한 사실을 기념하고, 신라의 영토 확장과 통치 이념을 보여준다."',
        options: [
          '호우명 그릇',
          '광개토대왕릉비',
          '단양 적성비',
          '북한산 순수비'
        ],
        answer: '북한산 순수비',
        explanation: '북한산 순수비는 신라 진흥왕이 한강 유역을 차지한 후 세운 비석으로, 신라의 전성기와 영토 확장을 보여주는 중요한 유물입니다.'
      }
    ],
    '통일신라': [
      {
        id: 31,
        question: '통일신라의 정치 제도 중, 집사부의 기능으로 가장 적절한 것은?',
        options: [
          '군사 업무 담당',
          '행정 실무 총괄',
          '재정 관리',
          '교육 담당'
        ],
        answer: '행정 실무 총괄',
        explanation: '집사부는 통일신라의 중앙 정치 기구로, 행정 실무를 총괄하는 역할을 담당했습니다.'
      },
      {
        id: 32,
        question: '통일신라의 경제 정책 중, 녹읍제의 특징으로 가장 적절한 것은?',
        options: [
          '관료에게 토지를 지급하여 생계를 보장',
          '농민에게 토지를 분배',
          '상업 발달을 위한 정책',
          '화폐 경제 정착'
        ],
        answer: '관료에게 토지를 지급하여 생계를 보장',
        explanation: '녹읍제는 통일신라에서 관료에게 토지를 지급하여 생계를 보장하는 제도였습니다.'
      },
      {
        id: 33,
        question: '통일신라의 문화적 특징 중, 불교 문화의 발달을 보여주는 것은?',
        options: [
          '석굴암의 건립',
          '한글 창제',
          '성리학의 발달',
          '실학의 등장'
        ],
        answer: '석굴암의 건립',
        explanation: '석굴암은 통일신라 시대에 건립된 불교 문화의 대표적인 유산입니다.'
      },
      {
        id: 34,
        question: '통일신라의 대외 관계에서 당나라와의 관계로 가장 적절한 것은?',
        options: [
          '완전히 독립하였다',
          '사대 관계를 유지하였다',
          '적대 관계가 되었다',
          '동맹 관계를 맺었다'
        ],
        answer: '사대 관계를 유지하였다',
        explanation: '통일신라는 당나라와 사대 관계를 유지하면서도 독립성을 지켰습니다.'
      },
      {
        id: 35,
        question: '통일신라의 사회 제도 중, 골품제의 특징으로 가장 적절한 것은?',
        options: [
          '평등한 사회',
          '신분 제도의 엄격한 유지',
          '계급 해체',
          '민주주의 실현'
        ],
        answer: '신분 제도의 엄격한 유지',
        explanation: '골품제는 통일신라의 엄격한 신분 제도로, 출생에 따른 신분이 고정되었습니다.'
      },
      {
        id: 36,
        question: '통일신라의 교육 제도 중, 국학의 역할로 가장 적절한 것은?',
        options: [
          '불교 교육',
          '유교 교육',
          '무예 교육',
          '상업 교육'
        ],
        answer: '유교 교육',
        explanation: '국학은 통일신라에서 유교 교육을 담당하던 관립 교육 기관이었습니다.'
      },
      {
        id: 37,
        question: '통일신라의 경제 활동 중, 해상 무역의 중심지로 가장 적절한 것은?',
        options: [
          '개성',
          '경주',
          '청해진',
          '벽란도'
        ],
        answer: '청해진',
        explanation: '청해진은 통일신라 시대의 대표적인 해상 무역 중심지였습니다.'
      },
      {
        id: 38,
        question: '통일신라의 문화 유산 중, 건축물로 가장 적절한 것은?',
        options: [
          '불국사',
          '석굴암',
          '첨성대',
          '모두 해당'
        ],
        answer: '모두 해당',
        explanation: '불국사, 석굴암, 첨성대는 모두 통일신라 시대의 대표적인 건축물입니다.'
      },
      {
        id: 39,
        question: '통일신라의 정치적 특징 중, 중앙 집권 체제의 강화를 보여주는 것은?',
        options: [
          '지방 세력의 독립',
          '왕권의 강화',
          '귀족 세력의 확대',
          '지방 분권'
        ],
        answer: '왕권의 강화',
        explanation: '통일신라는 중앙 집권 체제를 강화하여 왕권을 강화했습니다.'
      },
      {
        id: 40,
        question: '통일신라의 멸망 원인 중, 내부적 요인으로 가장 적절한 것은?',
        options: [
          '외적의 침입',
          '지방 세력의 성장',
          '자연 재해',
          '경제 위기'
        ],
        answer: '지방 세력의 성장',
        explanation: '통일신라 말기에는 지방 세력이 성장하여 중앙 정부의 통제력이 약화되었습니다.'
      }
    ],
    '고려': [
      {
        id: 41,
        question: '다음은 고려의 정치 제도에 대한 설명이다.\n\n"고려에서는 문벌 귀족이 정치를 주도하였다. 이들은 가문의 세력을 바탕으로 관직을 독점하고, 왕실과 혼인 관계를 통해 권력을 유지하였다."\n\n이 자료를 통해 알 수 있는 고려의 정치적 특징으로 가장 적절한 것은?',
        options: [
          '무인 정치가 주도하였다',
          '문벌 귀족이 정치를 주도하였다',
          '평민이 정치에 참여하였다',
          '왕권이 절대적이었다'
        ],
        answer: '문벌 귀족이 정치를 주도하였다',
        explanation: '고려에서는 문벌 귀족이 가문의 세력을 바탕으로 정치를 주도했습니다.'
      },
      {
        id: 42,
        question: '다음은 고려의 경제 제도에 대한 설명이다.\n\n"고려에서는 전시과를 실시하여 관료에게 토지를 지급하였다. 이 제도는 관료의 생계를 보장하고 국가의 재정을 확보하는 목적이었다."\n\n이 자료를 통해 알 수 있는 고려의 경제적 특징으로 가장 적절한 것은?',
        options: [
          '사유 재산제가 완전히 확립되었다',
          '국가가 토지를 관리하였다',
          '상업이 크게 발달하였다',
          '농업이 쇠퇴하였다'
        ],
        answer: '국가가 토지를 관리하였다',
        explanation: '전시과 제도는 고려의 국가 토지 관리 체제를 보여줍니다.'
      },
      {
        id: 43,
        question: '다음은 고려의 문화에 대한 설명이다.\n\n"고려는 불교 문화가 크게 발달하였다. 특히 고려 대장경은 세계 문화유산으로 지정되어 있으며, 불교 예술품들이 많이 제작되었다."\n\n이 자료를 통해 알 수 있는 고려의 문화적 특징으로 가장 적절한 것은?',
        options: [
          '유교 문화가 주도하였다',
          '불교 문화가 크게 발달하였다',
          '도교 문화가 주도하였다',
          '문화가 쇠퇴하였다'
        ],
        answer: '불교 문화가 크게 발달하였다',
        explanation: '고려 대장경과 불교 예술품은 고려의 불교 문화 발달을 보여줍니다.'
      },
      {
        id: 44,
        question: '다음은 고려의 대외 관계에 대한 설명이다.\n\n"고려는 송나라와 활발한 교류를 하였으며, 특히 해상 무역을 통해 경제적 이익을 얻었다. 또한 거란과 여진의 침입을 여러 차례 격퇴하였다."\n\n이 자료를 통해 알 수 있는 고려의 대외적 특징으로 가장 적절한 것은?',
        options: [
          '외국과의 교류를 완전히 차단하였다',
          '대외 교류를 통해 발전하였다',
          '군사력이 약화되었다',
          '경제가 쇠퇴하였다'
        ],
        answer: '대외 교류를 통해 발전하였다',
        explanation: '송나라와의 교류와 해상 무역은 고려의 대외 교류를 통한 발전을 보여줍니다.'
      },
      {
        id: 45,
        question: '다음은 고려의 사회 제도에 대한 설명이다.\n\n"고려에서는 신분 제도가 엄격하게 유지되었다. 양인과 천인으로 구분되어 있었으며, 천인은 정치 참여가 제한되었다."\n\n이 자료를 통해 알 수 있는 고려의 사회적 특징으로 가장 적절한 것은?',
        options: [
          '평등한 사회가 실현되었다',
          '신분 제도가 엄격하게 유지되었다',
          '계급 사회가 해체되었다',
          '평민의 권리가 확대되었다'
        ],
        answer: '신분 제도가 엄격하게 유지되었다',
        explanation: '양인과 천인의 구분과 천인의 정치 참여 제한은 고려의 신분 제도를 보여줍니다.'
      },
      {
        id: 46,
        question: '고려의 과거제는 어떤 제도인가?',
        options: [
          '토지 분배 제도', '관리를 선발하는 시험 제도', '군사 조직 제도', '세금 징수 제도'
        ],
        answer: '관리를 선발하는 시험 제도',
        explanation: '과거제는 고려에서 관리를 선발하기 위해 실시한 시험 제도입니다.'
      },
      {
        id: 47,
        question: '고려시대 거란의 2차 침입을 막아낸 인물은?',
        options: [
          '강감찬', '이순신', '최무선', '김유신'
        ],
        answer: '강감찬',
        explanation: '강감찬은 귀주대첩에서 거란의 2차 침입을 막아낸 명장입니다.'
      },
      {
        id: 48,
        question: '고려 시대에 의천이 주장한 불교 통합 사상은?',
        options: [
          '교관겸수', '돈오점수', '정혜쌍수', '해동 천태종'
        ],
        answer: '교관겸수',
        explanation: '의천은 교종과 선종의 이론적 통합을 주장하며 교관겸수를 내세웠고, 해동 천태종을 개창하여 불교 통합에 노력했습니다.'
      },
      {
        id: 49,
        question: '고려 시대의 토지 제도로 가장 적절한 것은?',
        options: [
          '녹읍', '과전법', '직전법', '전시과'
        ],
        answer: '전시과',
        explanation: '전시과는 고려 시대에 관리들에게 직역에 대한 대가로 토지의 수조권을 지급하던 토지 제도입니다.'
      },
      {
        id: 50,
        question: '고려 시대의 국제 무역항으로 가장 활발했던 곳은?',
        options: [
          '벽란도', '울산항', '청해진', '당항성'
        ],
        answer: '벽란도',
        explanation: '벽란도는 고려 시대의 국제 무역항으로, 송, 아라비아 상인들이 왕래하며 활발한 무역 활동을 펼쳤습니다.'
      }
    ],
    '조선전기': [
      {
        id: 51,
        question: '다음은 조선전기의 정치 제도에 대한 설명이다.\n\n"조선에서는 유교 정치를 실시하여 문치주의를 추구하였다. 특히 성리학을 통치 이념으로 하여 관료를 양성하고 정치를 운영하였다."\n\n이 자료를 통해 알 수 있는 조선전기의 정치적 특징으로 가장 적절한 것은?',
        options: [
          '무인 정치가 주도하였다',
          '유교 정치가 실시되었다',
          '불교 정치가 주도하였다',
          '도교 정치가 실시되었다'
        ],
        answer: '유교 정치가 실시되었다',
        explanation: '문치주의와 성리학을 통치 이념으로 한 점은 조선전기의 유교 정치를 보여줍니다.'
      },
      {
        id: 52,
        question: '다음은 조선전기의 경제 제도에 대한 설명이다.\n\n"조선에서는 과전법을 실시하여 관료에게 토지를 지급하였다. 이 제도는 관료의 생계를 보장하고 국가의 재정을 확보하는 목적이었다."\n\n이 자료를 통해 알 수 있는 조선전기의 경제적 특징으로 가장 적절한 것은?',
        options: [
          '사유 재산제가 완전히 확립되었다',
          '국가가 토지를 관리하였다',
          '상업이 크게 발달하였다',
          '농업이 쇠퇴하였다'
        ],
        answer: '국가가 토지를 관리하였다',
        explanation: '과전법은 조선전기의 국가 토지 관리 체제를 보여줍니다.'
      },
      {
        id: 53,
        question: '다음은 조선전기의 문화에 대한 설명이다.\n\n"조선은 유교 문화가 크게 발달하였다. 특히 성리학을 중심으로 한 학문이 발달하였으며, 한글 창제와 같은 문화적 성취도 이루어졌다."\n\n이 자료를 통해 알 수 있는 조선전기의 문화적 특징으로 가장 적절한 것은?',
        options: [
          '불교 문화가 주도하였다',
          '유교 문화가 크게 발달하였다',
          '도교 문화가 주도하였다',
          '문화가 쇠퇴하였다'
        ],
        answer: '유교 문화가 크게 발달하였다',
        explanation: '성리학의 발달과 한글 창제는 조선전기의 유교 문화 발달을 보여줍니다.'
      },
      {
        id: 54,
        question: '다음은 조선전기의 대외 관계에 대한 설명이다.\n\n"조선은 명나라와 사대 관계를 유지하면서도 독립성을 지켰다. 특히 임진왜란과 병자호란을 겪으면서도 국가의 독립성을 유지하였다."\n\n이 자료를 통해 알 수 있는 조선전기의 대외적 특징으로 가장 적절한 것은?',
        options: [
          '완전히 독립하였다',
          '사대 관계를 유지하면서도 독립성을 지켰다',
          '외국에 완전히 복속되었다',
          '군사력이 약화되었다'
        ],
        answer: '사대 관계를 유지하면서도 독립성을 지켰다',
        explanation: '명나라와의 사대 관계와 독립성 유지는 조선전기의 대외 관계 특징을 보여줍니다.'
      },
      {
        id: 55,
        question: '다음은 조선전기의 사회 제도에 대한 설명이다.\n\n"조선에서는 양반, 중인, 상민, 천민으로 구분되는 신분 제도가 엄격하게 유지되었다. 특히 양반은 정치와 문화를 주도하는 계층이었다."\n\n이 자료를 통해 알 수 있는 조선전기의 사회적 특징으로 가장 적절한 것은?',
        options: [
          '평등한 사회가 실현되었다',
          '신분 제도가 엄격하게 유지되었다',
          '계급 사회가 해체되었다',
          '평민의 권리가 확대되었다'
        ],
        answer: '신분 제도가 엄격하게 유지되었다',
        explanation: '4단계 신분 제도와 양반의 주도적 역할은 조선전기의 신분 제도를 보여줍니다.'
      },
      {
        id: 56,
        question: '조선전기의 중앙 정치 조직 중, 의정부의 기능으로 가장 적절한 것은?',
        options: [
          '왕명 출납 및 행정 실무 총괄',
          '군사 문제 담당',
          '국정 최고 심의 기관',
          '재정 담당'
        ],
        answer: '국정 최고 심의 기관',
        explanation: '의정부는 조선전기에 영의정, 좌의정, 우의정 등 3정승이 국정을 총괄하고 중요한 정책을 심의하던 최고 의결 기관이었습니다.'
      },
      {
        id: 57,
        question: '조선전기의 과거제도에서 문과 시험의 과목으로 옳지 않은 것은?',
        options: [
          '경서',
          '사서',
          '시부',
          '무예'
        ],
        answer: '무예',
        explanation: '조선전기의 문과 시험은 경서, 사서, 시부 등을 시험했으며, 무예는 무과 시험의 과목이었습니다.'
      },
      {
        id: 58,
        question: '조선전기의 지방 행정 조직 중, 감사가 담당한 업무는?',
        options: [
          '군사 업무',
          '행정과 사법 업무',
          '재정 업무',
          '교육 업무'
        ],
        answer: '행정과 사법 업무',
        explanation: '감사는 조선전기에 각 도의 행정과 사법을 담당하던 지방관이었습니다.'
      },
      {
        id: 59,
        question: '조선전기의 토지 제도 중, 공신전은 무엇을 위한 제도인가?',
        options: [
          '관료의 생계 보장',
          '공신에게 내린 토지',
          '군인의 토지 지급',
          '백성의 토지 분배'
        ],
        answer: '공신에게 내린 토지',
        explanation: '공신전은 조선전기에 공신에게 내린 토지로, 국가에 공을 세운 신하에게 지급되었습니다.'
      },
      {
        id: 60,
        question: '조선전기의 문화적 특징 중, 한글 창제의 의의로 가장 적절한 것은?',
        options: [
          '불교 문화의 발전',
          '민족 문화의 자주성 확립',
          '상업의 발달',
          '군사력 강화'
        ],
        answer: '민족 문화의 자주성 확립',
        explanation: '한글 창제는 우리 민족만의 독자적인 문자를 만들어 민족 문화의 자주성을 확립한 중요한 문화적 성취입니다.'
      }
    ],
    '조선후기': [
      {
        id: 61,
        question: '조선후기의 정치적 특징으로 가장 적절한 것은?',
        options: [
          '왕권이 절대적으로 강화되었다',
          '붕당 정치가 발달하였다',
          '무인 정치가 주도하였다',
          '중앙 집권이 약화되었다'
        ],
        answer: '붕당 정치가 발달하였다',
        explanation: '조선후기에는 서인, 남인, 노론, 소론 등의 붕당이 형성되어 붕당 정치가 발달했습니다.'
      },
      {
        id: 62,
        question: '조선후기의 경제적 특징으로 가장 적절한 것은?',
        options: [
          '상업이 크게 발달하였다',
          '농업이 쇠퇴하였다',
          '화폐 경제가 완전히 정착되었다',
          '국가가 모든 경제를 통제하였다'
        ],
        answer: '상업이 크게 발달하였다',
        explanation: '조선후기에는 상업이 크게 발달하여 상인들의 세력이 강화되고 시장 경제가 활성화되었습니다.'
      },
      {
        id: 63,
        question: '조선후기의 사회적 특징으로 가장 적절한 것은?',
        options: [
          '신분 제도가 완전히 해체되었다',
          '평민의 권리가 확대되었다',
          '양반의 세력이 약화되었다',
          '천민의 신분이 상승하였다'
        ],
        answer: '평민의 권리가 확대되었다',
        explanation: '조선후기에는 평민의 경제적 지위가 향상되고 권리가 확대되는 변화가 있었습니다.'
      },
      {
        id: 64,
        question: '조선후기의 문화적 특징으로 가장 적절한 것은?',
        options: [
          '실학이 발달하였다',
          '불교 문화가 부활하였다',
          '도교 문화가 주도하였다',
          '문화가 쇠퇴하였다'
        ],
        answer: '실학이 발달하였다',
        explanation: '조선후기에는 현실 문제 해결을 중시하는 실학이 발달하여 학문과 문화에 큰 영향을 미쳤습니다.'
      },
      {
        id: 65,
        question: '조선후기의 대외 관계에서 청나라와의 관계로 가장 적절한 것은?',
        options: [
          '완전히 독립하였다',
          '사대 관계를 유지하였다',
          '적대 관계가 되었다',
          '동맹 관계를 맺었다'
        ],
        answer: '사대 관계를 유지하였다',
        explanation: '조선후기에는 청나라와 사대 관계를 유지하면서도 독립성을 지켰습니다.'
      },
      {
        id: 66,
        question: '조선후기에 발달한 실학의 대표적 학자로 가장 적절한 것은?',
        options: [
          '이황',
          '이이',
          '박지원',
          '퇴계'
        ],
        answer: '박지원',
        explanation: '박지원은 조선후기 실학의 대표적 학자로, 현실 문제 해결을 중시하는 학문을 발전시켰습니다.'
      },
      {
        id: 67,
        question: '조선후기의 경제 변화 중 상업 발달의 결과로 가장 적절한 것은?',
        options: [
          '농업이 쇠퇴하였다',
          '상인들의 세력이 강화되었다',
          '국가 재정이 악화되었다',
          '화폐가 폐지되었다'
        ],
        answer: '상인들의 세력이 강화되었다',
        explanation: '조선후기 상업 발달로 인해 상인들의 경제적 세력이 강화되고 사회적 지위도 향상되었습니다.'
      },
      {
        id: 68,
        question: '조선후기의 정치 변화 중 붕당 정치의 특징으로 가장 적절한 것은?',
        options: [
          '왕권이 절대화되었다',
          '정치적 경쟁이 심화되었다',
          '무인 세력이 정권을 잡았다',
          '지방 세력이 중앙을 압도하였다'
        ],
        answer: '정치적 경쟁이 심화되었다',
        explanation: '붕당 정치로 인해 서인, 남인, 노론, 소론 등 여러 붕당 간의 정치적 경쟁이 심화되었습니다.'
      },
      {
        id: 69,
        question: '조선후기의 사회 변화 중 신분 제도의 변화로 가장 적절한 것은?',
        options: [
          '신분 제도가 완전히 해체되었다',
          '양반의 특권이 강화되었다',
          '평민의 지위가 상승하였다',
          '천민의 신분이 고정되었다'
        ],
        answer: '평민의 지위가 상승하였다',
        explanation: '조선후기에는 경제적 발전으로 인해 평민의 지위가 상승하고 권리가 확대되는 변화가 있었습니다.'
      },
      {
        id: 70,
        question: '조선후기의 문화 발전 중 민간 문화의 특징으로 가장 적절한 것은?',
        options: [
          '민간 문화가 쇠퇴하였다',
          '민간 문화가 크게 발달하였다',
          '양반 문화만이 발달하였다',
          '문화가 완전히 정체되었다'
        ],
        answer: '민간 문화가 크게 발달하였다',
        explanation: '조선후기에는 평민들의 경제적 지위 향상으로 인해 민간 문화가 크게 발달했습니다.'
      }
    ],
    '근현대': [
      {
        id: 81,
        question: '갑오개혁(1894)에서 실시된 내용이 아닌 것은?',
        options: [
          '신분제 폐지', '과거제 폐지', '은본위제 실시', '홍범 14조 반포'
        ],
        answer: '은본위제 실시',
        explanation: '은본위제는 실시되지 않았으며, 갑오개혁에서는 신분제와 과거제 폐지, 홍범 14조 반포 등이 이루어졌습니다.'
      },
      {
        id: 82,
        question: '3·1운동의 결과로 설립된 임시정부는?',
        options: [
          '상하이 임시정부', '대한민국 임시정부', '한성 임시정부', '연해주 임시정부'
        ],
        answer: '대한민국 임시정부',
        explanation: '3·1운동의 결과로 상하이에 대한민국 임시정부가 수립되었습니다.'
      },
      {
        id: 83,
        question: '다음은 근현대 시기 한 독립운동가의 활동에 대한 설명이다.\n\n"러시아의 내정 간섭이 심화되자, 이에 저항하여 독립 협회가 설립되었다. 독립 협회는 만민 공동회를 개최하고, 중추원 개편 운동을 통해 의회 설립을 추진하였다."\n\n이 자료를 통해 알 수 있는 독립 협회의 활동으로 가장 적절한 것은?',
        options: [
          '무장 투쟁을 통해 일본 세력 축출',
          '서구 열강의 지원을 받아 외세 배척',
          '자주 독립과 민주주의 수립을 위한 정치 개혁 운동',
          '농민들의 권익 보호를 위한 농민 운동 전개'
        ],
        answer: '자주 독립과 민주주의 수립을 위한 정치 개혁 운동',
        explanation: '독립 협회는 러시아 등 외세의 침략에 저항하며 자주 독립을 수호하고, 만민 공동회와 중추원 개편 운동을 통해 민주적인 의회 설립을 추진했습니다.'
      },
      {
        id: 84,
        question: '일제 강점기 1910년대 일제의 통치 방식은?',
        options: [
          '문화통치',
          '무단통치',
          '민족 말살 통치',
          '내선일체'
        ],
        answer: '무단통치',
        explanation: '1910년대 일제는 무단통치를 통해 한국인을 강압적으로 통치했습니다.'
      },
      {
        id: 85,
        question: '대한민국 임시정부의 활동 내용으로 옳지 않은 것은?',
        options: [
          '삼권 분립을 바탕으로 한 민주 공화제 채택',
          '연통제와 교통국을 통해 국내와 연락',
          '광복군 창설 및 대일 항전 전개',
          '만주 지역으로 독립운동 기지 건설'
        ],
        answer: '만주 지역으로 독립운동 기지 건설',
        explanation: '만주 지역으로 독립운동 기지 건설은 주로 의병 활동과 계몽 운동 단체들이 추진한 것이며, 대한민국 임시정부의 주요 활동은 아닙니다.'
      },
      {
        id: 86,
        question: '다음은 근현대 시기 한 독립운동가의 활동에 대한 설명이다.\n\n"이 인물은 대한민국 임시정부의 주석으로 활동하며 독립운동을 이끌었다. 특히 미국에서 외교 활동을 활발히 전개하여 한국의 독립을 국제 사회에 알리고자 노력했다. 광복 후 귀국하여 통일 정부 수립에 힘썼다."\n\n이 인물은 누구인가?',
        options: [
          '안중근',
          '윤봉길',
          '김구',
          '이승만'
        ],
        answer: '이승만',
        explanation: '이승만은 대한민국 임시정부의 초대 대통령이자 외교 활동을 통해 독립운동을 전개했습니다.'
      },
      {
        id: 87,
        question: '광복 이후 대한민국 정부 수립 과정에서 UN 감시하의 총선거가 치러지게 된 배경은?',
        options: [
          '미국과 소련의 한반도 분할 통치 합의',
          '남한 단독 정부 수립의 필요성 증대',
          '좌우 합작 위원회 해체와 통일 정부 수립 좌절',
          '일본의 패망과 한반도 정세 변화'
        ],
        answer: '좌우 합작 위원회 해체와 통일 정부 수립 좌절',
        explanation: '광복 이후 한반도에 통일 정부를 수립하려는 노력이 실패로 돌아가고, 좌우 합작 위원회가 해체되면서 UN 감시하의 남한 단독 총선거가 치러지게 되었습니다.'
      },
      {
        id: 88,
        question: '6·25 전쟁의 결과로 나타난 사회적 변화로 옳지 않은 것은?',
        options: [
          '이산가족 발생',
          '남북 분단 고착화',
          '국가 안보 의식 강화',
          '민주화 운동 활발'
        ],
        answer: '민주화 운동 활발',
        explanation: '6·25 전쟁 직후에는 전후 복구와 국가 안보가 최우선 과제였으며, 민주화 운동은 1960년대 이후부터 본격적으로 활발해지기 시작했습니다.'
      },
      {
        id: 89,
        question: '다음은 1980년대 대한민국의 사회적 변화를 설명하는 내용이다.\n\n"전두환 정부의 군사 독재에 저항하여 민주화를 요구하는 시위가 전국적으로 확산되었다. 특히 대학생들을 중심으로 한 시위가 거세게 일어났으며, 이에 정부는 강경하게 진압했다."\n\n이 설명과 관련된 사건으로 가장 적절한 것은?',
        options: [
          '4·19 혁명',
          '부마 민주 항쟁',
          '5·18 민주화 운동',
          '6월 민주 항쟁'
        ],
        answer: '6월 민주 항쟁',
        explanation: '6월 민주 항쟁은 전두환 정권의 호헌 조치에 반대하여 1987년 6월에 전국적으로 일어난 민주화 운동입니다.'
      },
      {
        id: 90,
        question: '근현대 한국의 경제 발전 과정에서 1960년대 이후 본격적으로 추진된 정책은?',
        options: [
          '토지 개혁',
          '경제 개발 5개년 계획',
          '농업 중심 경제 정책',
          '자유 무역 정책'
        ],
        answer: '경제 개발 5개년 계획',
        explanation: '1960년대 이후 한국은 경제 개발 5개년 계획을 통해 본격적인 산업화를 추진했습니다.'
      }
    ]
  });

  const startExam = (era) => {
    setCurrentExam({
      era,
      questions: examQuestions[era],
      startTime: Date.now()
    });
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setExamTime(0);
    setCurrentScreen('exam');
  };

  const selectAnswer = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentExam.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishExam = () => {
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - currentExam.startTime) / 1000);
    
    let correctCount = 0;
    currentExam.questions.forEach(question => {
      if (userAnswers[question.id] === question.answer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / currentExam.questions.length) * 100);
    
    const result = {
      era: currentExam.era,
      score,
      correctCount,
      totalQuestions: currentExam.questions.length,
      timeSpent,
      answers: userAnswers,
      date: new Date()
    };

    setExamResult(result);
    setExamHistory(prev => [result, ...prev]);
    
    // 통계 업데이트
    setUserStats(prev => ({
      ...prev,
      totalAnswers: prev.totalAnswers + currentExam.questions.length,
      correctAnswers: prev.correctAnswers + correctCount,
      studyDays: prev.studyDays + 1
    }));

    setCurrentScreen('examResult');
  };

  const HomeScreen = () => (
    <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 pt-16 pb-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="/1713750970271.jpg" 
              alt="한국사 시험" 
              className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-white border-opacity-30"
            />
            <div>
              <h1 className="text-3xl font-bold mb-1">김현정 한국사시험</h1>
              <p className="text-blue-100 text-sm">고난도 문제로 실력 향상 • by 머슴이</p>
            </div>
          </div>
          
          {/* 통계 카드 */}
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-4 mt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">{userStats.totalAnswers}</div>
                <div className="text-xs text-blue-100">총 문제</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{userStats.correctAnswers}</div>
                <div className="text-xs text-blue-100">정답</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{userStats.studyDays}</div>
                <div className="text-xs text-blue-100">학습일</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="px-6 py-8">
        {/* 환영 메시지 */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
              <Star size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">"공부를하자"   뿌직 <span role="img" aria-label="똥">💩</span></h2>
              <p className="text-gray-600 text-sm">한국사의 모든 시대를 마스터해보세요</p>
            </div>
          </div>
        </div>

        {/* 시대별 시험 카드 */}
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(examQuestions).map((era, index) => {
            const emojis = ['🏛️', '👑', '⚔️', '🏰', '📜', '🎭', '⚡', '🌅', '🎨', '🚀'];
            const colors = [
              'from-purple-500 to-purple-600',
              'from-blue-500 to-blue-600', 
              'from-green-500 to-green-600',
              'from-orange-500 to-orange-600',
              'from-red-500 to-red-600',
              'from-pink-500 to-pink-600',
              'from-indigo-500 to-indigo-600',
              'from-teal-500 to-teal-600',
              'from-yellow-500 to-yellow-600',
              'from-gray-500 to-gray-600'
            ];
            
            return (
              <button
                key={era}
                onClick={() => startExam(era)}
                className={`bg-gradient-to-r ${colors[index % colors.length]} text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{emojis[index % emojis.length]}</div>
                  <div className="text-sm font-bold mb-1">{era}</div>
                  <div className="text-xs opacity-80">{examQuestions[era].length}문제</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 추가 기능 카드 */}
        <div className="mt-8 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4">
                  <BarChart3 size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">학습 통계</h3>
                  <p className="text-gray-600 text-sm">진도 현황 확인</p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentScreen('stats')}
                className="text-blue-600 hover:text-blue-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-500 rounded-full flex items-center justify-center mr-4">
                  <Trophy size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">시험 기록</h3>
                  <p className="text-gray-600 text-sm">과거 결과 확인</p>
                </div>
              </div>
              <button 
                onClick={() => setCurrentScreen('history')}
                className="text-blue-600 hover:text-blue-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 하단 안내 */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            매일 꾸준한 학습으로 한국사 마스터가 되어보세요! 📚
          </p>
        </div>
      </div>
    </div>
  );

  const ExamScreen = () => {
    const currentQuestion = currentExam.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === currentExam.questions.length - 1;

    return (
      <div className="bg-white min-h-screen">
        <div className="bg-gradient-to-r from-green-600 to-green-500 px-6 pt-12 pb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => setCurrentScreen('home')} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">{currentExam.era}</h1>
            <div className="text-sm">
              {currentQuestionIndex + 1} / {currentExam.questions.length}
            </div>
          </div>
          <div className="w-full bg-green-400 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / currentExam.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 text-gray-800">문제 {currentQuestionIndex + 1}</h2>
            <p className="text-gray-700 whitespace-pre-line mb-6">{currentQuestion.question}</p>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(currentQuestion.id, option)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    userAnswers[currentQuestion.id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-left block">{option}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl disabled:opacity-50"
            >
              이전
            </button>
            
            {isLastQuestion ? (
              <button
                onClick={finishExam}
                className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
              >
                시험 완료
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                다음
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ExamResultScreen = () => (
    <div className="bg-white min-h-screen">
      <div className="bg-gradient-to-r from-purple-600 to-purple-500 px-6 pt-12 pb-6 text-white">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentScreen('home')} className="mr-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">시험 결과</h1>
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-2">{examResult.era} 시험</h2>
            <div className="text-6xl font-bold text-purple-600 mb-2">{examResult.score}점</div>
            <p className="text-gray-600">
              {examResult.correctCount} / {examResult.totalQuestions} 정답
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setCurrentScreen('home')}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold"
          >
            홈으로 돌아가기
          </button>
          <button
            onClick={() => startExam(examResult.era)}
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold"
          >
            다시 시험보기
          </button>
        </div>
      </div>
    </div>
  );

  const StatsScreen = () => {
    const accuracy = userStats.totalAnswers > 0 ? Math.round((userStats.correctAnswers / userStats.totalAnswers) * 100) : 0;
    
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-6 pt-12 pb-6 text-white">
          <div className="flex items-center mb-4">
            <button onClick={() => setCurrentScreen('home')} className="mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">학습 통계</h1>
          </div>
        </div>

        <div className="px-6 py-6">
          {/* 전체 통계 */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800">전체 학습 현황</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-600">{userStats.totalAnswers}</div>
                <div className="text-sm text-gray-600">총 문제 수</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-green-600">{userStats.correctAnswers}</div>
                <div className="text-sm text-gray-600">정답 수</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-600">{accuracy}%</div>
                <div className="text-sm text-gray-600">정답률</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-orange-600">{userStats.studyDays}</div>
                <div className="text-sm text-gray-600">학습일</div>
              </div>
            </div>
          </div>

          {/* 시대별 통계 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-800">시대별 학습 현황</h2>
            <div className="space-y-3">
              {Object.keys(examQuestions).map((era) => {
                const eraHistory = examHistory.filter(h => h.era === era);
                const totalAttempts = eraHistory.length;
                const bestScore = totalAttempts > 0 ? Math.max(...eraHistory.map(h => h.score)) : 0;
                
                return (
                  <div key={era} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-bold text-gray-800">{era}</div>
                      <div className="text-sm text-gray-600">{totalAttempts}회 시험</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">{bestScore}점</div>
                      <div className="text-sm text-gray-600">최고점수</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const HistoryScreen = () => {
    return (
      <div className="bg-white min-h-screen">
        <div className="bg-gradient-to-r from-pink-500 to-red-500 px-6 pt-12 pb-6 text-white">
          <div className="flex items-center mb-4">
            <button onClick={() => setCurrentScreen('home')} className="mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">시험 기록</h1>
          </div>
        </div>

        <div className="px-6 py-6">
          {examHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">아직 시험 기록이 없습니다</h2>
              <p className="text-gray-600">첫 번째 시험을 시작해보세요!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {examHistory.map((record, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800">{record.era}</h3>
                      <p className="text-sm text-gray-600">
                        {new Date(record.date).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600">{record.score}점</div>
                      <div className="text-sm text-gray-600">
                        {record.correctCount}/{record.totalQuestions}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>소요시간: {Math.floor(record.timeSpent / 60)}분 {record.timeSpent % 60}초</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      record.score >= 80 ? 'bg-green-100 text-green-700' :
                      record.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {record.score >= 80 ? '우수' : record.score >= 60 ? '보통' : '미흡'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const Navigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
      <div className="max-w-md mx-auto flex justify-around">
        <button 
          onClick={() => setCurrentScreen('home')}
          className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all ${
            currentScreen === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'
          }`}
        >
          <Home size={20} />
          <span className="text-xs font-medium">홈</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('stats')}
          className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all ${
            currentScreen === 'stats' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'
          }`}
        >
          <BarChart3 size={20} />
          <span className="text-xs font-medium">통계</span>
        </button>
        <button 
          onClick={() => setCurrentScreen('history')}
          className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-all ${
            currentScreen === 'history' ? 'bg-blue-50 text-blue-600' : 'text-gray-400'
          }`}
        >
          <Trophy size={20} />
          <span className="text-xs font-medium">기록</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen relative pb-20">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'exam' && <ExamScreen />}
      {currentScreen === 'examResult' && <ExamResultScreen />}
      {currentScreen === 'stats' && <StatsScreen />}
      {currentScreen === 'history' && <HistoryScreen />}
      <Navigation />
    </div>
  );
};

export default App; 