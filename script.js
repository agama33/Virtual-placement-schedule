const scheduleData = {
  1: [
    {
      date: 'Monday 7 September',
      label: 'Day 1',
      sessions: [
        { id:'welcome', start:'09:15', end:'10:00', title:'Welcome and Orientation', type:'live', speaker:'Placement Team', location:'Microsoft Teams', description:'Meet the team, understand how the placement works and get ready for the fortnight ahead.', preparation:'Have Teams open and your learner workbook ready.', outcomes:['Understand the structure of the placement','Know where to find support','Meet your learner group'] },
        { id:'family-consultation', start:'10:15', end:'11:30', title:'Family Consultation Activity', type:'activity', speaker:'Facilitated activity', location:'Interactive web activity', description:'Explore a virtual consultation and identify factors affecting health and wellbeing.', preparation:'No preparation required.', outcomes:['Gather relevant information','Recognise wider determinants of health','Discuss findings with your group'] },
        { id:'lunch-1', start:'12:30', end:'13:30', title:'Lunch', type:'break', speaker:'', location:'', description:'', preparation:'', outcomes:[] },
        { id:'reflection-1', start:'15:45', end:'16:15', title:'Daily Reflection', type:'reflection', speaker:'Learner-led', location:'Workbook activity', description:'Capture your key learning and questions from the day.', preparation:'Bring your learner workbook.', outcomes:['Identify key learning','Record follow-up questions'] },
      ]
    },
    {
      date: 'Tuesday 8 September',
      label: 'Day 2',
      sessions: [
        { id:'population-health', start:'10:00', end:'11:00', title:'Population Health', type:'live', speaker:'Dr Aisha Khan', location:'Microsoft Teams', description:'An introduction to population health and how local data shapes priorities in primary care.', preparation:'Review the short pre-reading in your learner pack.', outcomes:['Explain population health in practice','Recognise how inequalities affect outcomes','Connect population data to service planning'] },
        { id:'health-check', start:'11:15', end:'12:30', title:'NHS Health Check Activity', type:'activity', speaker:'Facilitated activity', location:'Interactive web activity', description:'Decide which patients should be invited for an NHS Health Check and explain your reasoning.', preparation:'No preparation required.', outcomes:['Apply eligibility criteria','Identify common exclusions','Discuss borderline cases'] },
        { id:'lunch-2', start:'12:30', end:'13:30', title:'Lunch', type:'break', speaker:'', location:'', description:'', preparation:'', outcomes:[] },
        { id:'roles', start:'14:00', end:'15:00', title:'Primary Care Roles', type:'live', speaker:'Guest panel', location:'Microsoft Teams', description:'Meet professionals from across primary care and explore how multidisciplinary teams work together.', preparation:'Bring one question for the panel.', outcomes:['Describe key primary care roles','Understand multidisciplinary working'] },
      ]
    },
    {
      date: 'Wednesday 9 September', label: 'Day 3', sessions: [
        { id:'emis', start:'09:30', end:'10:30', title:'EMIS Web', type:'live', speaker:'Chris Brown', location:'Microsoft Teams', description:'A practical introduction to common EMIS workflows used in general practice.', preparation:'Have access to the demonstration environment if provided.', outcomes:['Navigate core EMIS functions','Recognise common workflows'] },
        { id:'sdoh', start:'11:00', end:'12:15', title:'Social Determinants Investigation', type:'activity', speaker:'Facilitated activity', location:'Interactive web activity', description:'Investigate a family scenario and uncover the wider factors influencing health.', preparation:'No preparation required.', outcomes:['Identify social determinants','Connect evidence to potential support'] },
        { id:'lunch-3', start:'12:30', end:'13:30', title:'Lunch', type:'break', speaker:'', location:'', description:'', preparation:'', outcomes:[] },
      ]
    },
    {
      date: 'Thursday 10 September', label: 'Day 4', sessions: [
        { id:'children-mh', start:'10:00', end:'11:15', title:"Children's Mental Health", type:'live', speaker:'Guest speaker', location:'Microsoft Teams', description:'Explore early identification, signposting and the role of primary care.', preparation:'Read the learner scenario.', outcomes:['Recognise common presentations','Identify appropriate support routes'] },
        { id:'lunch-4', start:'12:30', end:'13:30', title:'Lunch', type:'break', speaker:'', location:'', description:'', preparation:'', outcomes:[] },
      ]
    },
    {
      date: 'Friday 11 September', label: 'Day 5', sessions: [
        { id:'heart-failure', start:'10:00', end:'11:30', title:'Heart Failure', type:'live', speaker:'Dr Ravi Patel', location:'Microsoft Teams', description:'Recognise key signs, symptoms and management considerations in heart failure.', preparation:'Review the patient case in advance.', outcomes:['Recognise common symptoms','Understand the primary care pathway','Apply learning to a patient scenario'] },
        { id:'lunch-5', start:'12:30', end:'13:30', title:'Lunch', type:'break', speaker:'', location:'', description:'', preparation:'', outcomes:[] },
        { id:'week-one-reflection', start:'15:00', end:'16:00', title:'Week One Reflection', type:'reflection', speaker:'Facilitated discussion', location:'Microsoft Teams', description:'Consolidate the first week and prepare for week two.', preparation:'Review your notes from the week.', outcomes:['Identify progress','Set goals for week two'] },
      ]
    }
  ],
  2: [
    { date:'Monday 14 September', label:'Day 6', sessions:[
      { id:'safeguarding', start:'10:00', end:'11:30', title:'Safeguarding', type:'live', speaker:'Dr Helen Moore', location:'Microsoft Teams', description:'Work through safeguarding scenarios and consider professional responsibilities.', preparation:'Read the short scenario pack.', outcomes:['Recognise safeguarding concerns','Understand escalation routes'] },
      { id:'lunch-6', start:'12:30', end:'13:30', title:'Lunch', type:'break', speaker:'', location:'', description:'', preparation:'', outcomes:[] },
    ]},
    { date:'Tuesday 15 September', label:'Day 7', sessions:[
      { id:'diabetes', start:'10:00', end:'11:15', title:'Diabetes', type:'live', speaker:'Dr Ravi Patel', location:'Microsoft Teams', description:'Explore diabetes management and person-centred support in primary care.', preparation:'Review the patient case.', outcomes:['Understand key monitoring','Recognise person-centred priorities'] },
      { id:'cv-risk', start:'11:30', end:'12:15', title:'Cardiovascular Risk Factors', type:'activity', speaker:'Interactive activity', location:'Web activity', description:'Sort modifiable and non-modifiable risk factors.', preparation:'No preparation required.', outcomes:['Categorise risk factors','Explain opportunities for prevention'] },
      { id:'lunch-7', start:'12:30', end:'13:30', title:'Lunch', type:'break', speaker:'', location:'', description:'', preparation:'', outcomes:[] },
    ]},
    { date:'Wednesday 16 September', label:'Day 8', sessions:[
      { id:'respiratory', start:'09:30', end:'10:45', title:'Respiratory and Lung Cancer', type:'live', speaker:'Guest speaker', location:'Microsoft Teams', description:'Recognise respiratory red flags and understand primary care pathways.', preparation:'Review the red-flag guide.', outcomes:['Identify red flags','Understand referral pathways'] },
      { id:'lunch-8', start:'12:30', end:'13:30', title:'Lunch', type:'break', speaker:'', location:'', description:'', preparation:'', outcomes:[] },
    ]},
    { date:'Thursday 17 September', label:'Day 9', sessions:[
      { id:'immunisations', start:'10:00', end:'11:15', title:'Immunisations and Vaccinations', type:'live', speaker:'Guest speaker', location:'Microsoft Teams', description:'Explore routine programmes, confidence and communication.', preparation:'Bring one question about vaccine conversations.', outcomes:['Understand programme principles','Discuss vaccine confidence'] },
      { id:'lunch-9', start:'12:30', end:'13:30', title:'Lunch', type:'break', speaker:'', location:'', description:'', preparation:'', outcomes:[] },
    ]},
    { date:'Friday 18 September', label:'Day 10', sessions:[
      { id:'final-reflection', start:'10:00', end:'11:00', title:'Final Reflection', type:'reflection', speaker:'Placement Team', location:'Microsoft Teams', description:'Review your learning, share insights and identify next steps.', preparation:'Complete your final learner reflection.', outcomes:['Summarise learning','Identify next steps','Share feedback'] },
      { id:'celebration', start:'11:15', end:'12:00', title:'Placement Close', type:'live', speaker:'Placement Team', location:'Microsoft Teams', description:'Celebrate completion and explain what happens next.', preparation:'No preparation required.', outcomes:['Understand next steps','Celebrate completion'] },
    ]}
  ]
};

const scheduleEl = document.getElementById('schedule');
const weekButtons = [...document.querySelectorAll('.segment')];
const filterEl = document.getElementById('sessionFilter');
const dialog = document.getElementById('sessionDialog');
const dialogContent = document.getElementById('dialogContent');
let currentWeek = 1;

function typeLabel(type) {
  return { live:'Live session', activity:'Interactive activity', reflection:'Reflection', break:'Break' }[type] || type;
}

function renderSchedule() {
  const filter = filterEl.value;
  scheduleEl.innerHTML = '';
  const days = scheduleData[currentWeek];
  let shown = 0;

  days.forEach(day => {
    const sessions = day.sessions.filter(session => filter === 'all' || session.type === filter);
    if (!sessions.length) return;
    shown += sessions.length;

    const group = document.createElement('article');
    group.className = 'day-group';
    group.innerHTML = `
      <div class="day-heading">
        <h3>${day.date}</h3>
        <span>${day.label}</span>
      </div>
      <div class="timeline"></div>`;

    const timeline = group.querySelector('.timeline');
    sessions.forEach(session => {
      const card = document.createElement('div');
      card.className = 'session-card';
      card.dataset.type = session.type;
      card.innerHTML = `
        <div class="time-block"><strong>${session.start}</strong><span>${session.end}</span></div>
        <div class="accent"></div>
        <div class="session-info">
          <h4>${session.title}</h4>
          <p>${session.speaker || typeLabel(session.type)}</p>
          ${session.type !== 'break' ? `<div class="session-meta"><span class="badge ${session.type === 'live' ? 'live' : ''}">${typeLabel(session.type)}</span><span class="badge">${session.location}</span></div>` : ''}
        </div>
        ${session.type !== 'break' ? `<button class="details-button" data-session-id="${session.id}" aria-label="View ${session.title}">›</button>` : ''}`;
      timeline.appendChild(card);
    });

    scheduleEl.appendChild(group);
  });

  if (!shown) scheduleEl.innerHTML = '<div class="empty-state">No sessions match this filter.</div>';
  attachDetailButtons();
}

function findSession(id) {
  for (const week of Object.values(scheduleData)) {
    for (const day of week) {
      const session = day.sessions.find(item => item.id === id);
      if (session) return { ...session, date: day.date };
    }
  }
}

function openSession(id) {
  const session = findSession(id);
  if (!session) return;
  dialogContent.innerHTML = `
    <p class="eyebrow">${typeLabel(session.type)}</p>
    <h2>${session.title}</h2>
    <div class="dialog-grid">
      <div class="dialog-stat"><span>Date</span><strong>${session.date}</strong></div>
      <div class="dialog-stat"><span>Time</span><strong>${session.start}–${session.end}</strong></div>
      <div class="dialog-stat"><span>Delivered by</span><strong>${session.speaker}</strong></div>
      <div class="dialog-stat"><span>Location</span><strong>${session.location}</strong></div>
    </div>
    <div class="dialog-section"><h3>About this session</h3><p>${session.description}</p></div>
    <div class="dialog-section"><h3>Before you join</h3><p>${session.preparation}</p></div>
    <div class="dialog-section"><h3>Learning outcomes</h3><ul>${session.outcomes.map(item => `<li>${item}</li>`).join('')}</ul></div>
    <button class="primary-button">Open joining instructions</button>`;
  dialog.showModal();
}

function attachDetailButtons() {
  document.querySelectorAll('[data-session-id]').forEach(button => {
    button.addEventListener('click', () => openSession(button.dataset.sessionId));
  });
}

weekButtons.forEach(button => button.addEventListener('click', () => {
  currentWeek = Number(button.dataset.week);
  weekButtons.forEach(btn => {
    btn.classList.toggle('active', btn === button);
    btn.setAttribute('aria-selected', btn === button ? 'true' : 'false');
  });
  renderSchedule();
}));

filterEl.addEventListener('change', renderSchedule);
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
document.getElementById('helpButton').addEventListener('click', () => document.getElementById('helpDialog').showModal());
document.getElementById('closeHelp').addEventListener('click', () => document.getElementById('helpDialog').close());

renderSchedule();
